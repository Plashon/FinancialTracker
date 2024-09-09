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
        console.log(response.data);
        
        setFinancials(response.data);

      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRecord();
  }, [user]);

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
      if (response.status === 2000) {
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
      value={{ financials, addFinancial, editFinancial, deleteFinancial }}
    >
      {children}
    </FinancialRecordContext.Provider>
  );
};

export const useFinancialRecord = () => useContext(FinancialRecordContext);
