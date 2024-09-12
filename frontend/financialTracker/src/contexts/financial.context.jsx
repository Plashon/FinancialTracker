import {
  children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUser } from "@clerk/clerk-react";
import FinancialService from "./../service/financial.service";
export const FinancialRecordContext = createContext();
export const FinancialRecordProvider = ({ children }) => {
    
  const [financials, setFinancials] = useState([]);
  const { user } = useUser();
 
  const fetchRecord = async () => {
    if (!user) return;
    try {
      const response = await FinancialService.getAllFinancialByUserId(user.id);
      if (response.status === 200) {
        setFinancials(response.data);

      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRecord();
  }, [user]);

  const getRecordById = async (id) => {
    // Try to find the record in the current state
    const existingRecord = financials.find((financial) => financial.id === id);
    if (existingRecord) return existingRecord;

    // If not found, fetch from API
    try {
      const response = await FinancialService.getFinancialById(id);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
    return null; // Return null if not found
  };

  const addFinancial = async (financial) => {
    try {
      const response = await FinancialService.addFinancial(financial);
      if (response.status === 200) {
        setFinancials((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editFinancial = async (id, newFinancial) => {
    try {
      const response = await FinancialService.editFinancial(id, newFinancial);
      if (response.status === 200) {
        setFinancials((prev) =>
          prev.map((financial) => {
            if (financial.id === id) {
              return newFinancial;
            } else {
              return financial;
            }
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFinancial = async (id) => {
    try {
      const response = await FinancialService.deleteFinancial(id);
      if (response.status === 200) {
        setFinancials((prev) =>
          prev.filter((financial) => financial.id !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FinancialRecordContext.Provider
      value={{ financials, addFinancial, editFinancial, deleteFinancial,getRecordById }}
    >
      {children}
    </FinancialRecordContext.Provider>
  );
};

export const useFinancialRecord = () => useContext(FinancialRecordContext);
