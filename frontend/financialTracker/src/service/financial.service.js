import api from "./api";
const Financial_API = import.meta.env.VITE_Financial_API;

const getAllFinancial = async () => {
  return await api.get(Financial_API);
};

const getFinancialById = async (id) => {
  return await api.get(Financial_API +`${id}`);
};

const getFinancialByUserId = async (userId) => {
    return await api.get(Financial_API +"/user"+`${userId}`);
  };
  
const editFinancial = async (id,financial)=>{
  return await api.put(Financial_API +`${id}`,financial);
}

const deleteFinancial = async(id) =>{
  return await api.delete(Financial_API +`${id}`);
}

const addFinancial = async (financial) =>{
  return await api.post(Financial_API , financial);
}

const FinancialService = {
    getAllFinancial,
    getFinancialById,
    editFinancial,
    deleteFinancial,
    addFinancial,
    getFinancialByUserId,
};

export default FinancialService;
