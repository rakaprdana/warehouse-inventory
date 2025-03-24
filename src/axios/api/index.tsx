import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5005/api",
});

export interface Item {
  _id?: string;
  code?: string;
  category: string;
  stack: string;
  in: string;
  out: string;
}

export const getItems = () => api.get<Item[]>("/items");

export const createItem = (item: Item) => api.post<Item>("/items", item);
