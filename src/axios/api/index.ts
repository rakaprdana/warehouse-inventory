import axios from "axios";
import { ItemTypes } from "../../types/items";

const API = import.meta.env.VITE_API_BASE_URL;

export const getAllItems = async () => {
  const response = await axios.get(`${API}/items`);
  return response.data;
};

export const fetchItemById = async (id: string) => {
  const response = await axios.get(`${API}/items/${id}`);
  return response.data;
};
export const createNewItem = async (formData: ItemTypes, token: string) => {
  return await axios.post(`${API}/items`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateItem = async (id: string, data: unknown, token: string) => {
  return await axios.put(`${API}/items/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteItem = async (id: string, token: string) => {
  return await axios.delete(`${API}/items/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
