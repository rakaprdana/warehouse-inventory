import React, { useState } from "react";
import { Button } from "./button";
import axios from "axios";
import { useForm } from "../../hooks/useForm";
import { FormInput } from "./input";
import { Item } from "../../axios/api";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFormData = {
  code: "",
  stack: "",
  name: "",
  quantity: 0,
  category: "",
  in: "",
};

export const NewForm: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [items, setItems] = useState<Item[]>([]);
  const { formData, handleChange, resetForm } = useForm(initialFormData);
  const API = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/items`, formData);
      setItems((prevItems) => [...prevItems, response.data]);
      resetForm();
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  if (!isOpen) return null;

  const categoryOptions = [
    { value: "Elektronik", label: "Elektronik" },
    { value: "Peralatan Rumah Tangga", label: "Peralatan Rumah Tangga" },
    { value: "Alat Tulis", label: "Alat Tulis" },
    { value: "Lainnya", label: "Lainnya" },
  ];

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6">Tambah Barang Baru</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <FormInput
              label="Nama Barang"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <FormInput
              label="Lokasi Rak Barang"
              type="text"
              name="stack"
              value={formData.stack}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Kuantitas Barang"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Kategori"
              type="select"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={categoryOptions}
              required
            />
            <FormInput
              label="Tanggal Masuk"
              type="date"
              name="in"
              value={formData.in}
              onChange={handleChange}
            />
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <Button text={"Save"} variant="submit" />
            <Button text={"Cancel"} variant="delete" onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};
