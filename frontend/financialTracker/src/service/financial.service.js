import api from "./api";
const Financial_API = import.meta.env.VITE_Financial_API;
console.log(Financial_API);


const getAllFinancial = async () => {
  return await api.get(Financial_API);
};

const getFinancialById = async (id) => {
  return await api.get(Financial_API + `/${id}`);
};

const getAllFinancialByUserId = async (userId) => {
  return await api.get(`${Financial_API}/user/${userId}`);
};

const addFinancial = async (financial) => {
  return await api.post(Financial_API, financial);
};

const editFinancial = async (id, financial) => {
  return await api.put(Financial_API + `/${id}`, financial);
};

const deleteFinancial = async (id) => {
  return await api.delete(Financial_API + `/${id}`);
};

const FinancialService = {
  getAllFinancial,
  getFinancialById,
  editFinancial,
  deleteFinancial,
  addFinancial,
  getAllFinancialByUserId,
};
console.log(FinancialService);

export default FinancialService;
