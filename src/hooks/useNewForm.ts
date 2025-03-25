import { useState } from "react";

import { createNewItem } from "../axios/api";
import { ItemTypes } from "../interface/items";
import { Item } from "../components/ui/table/table-ui";

export const useNewForm = () => {
  const [items, setItems] = useState<Item[]>([]);
  const token = localStorage.getItem("token");

  const handleSubmit = async (formData: ItemTypes, resetForm: () => void) => {
    try {
      const response = await createNewItem(formData, token || "");
      setItems((prevItems) => [...prevItems, response.data]);
      resetForm();
    } catch (err) {
      console.error("Error adding item:", err);
      throw err;
    }
  };

  return {
    items,
    handleSubmit,
  };
};
