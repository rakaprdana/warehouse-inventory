import React from "react";
import { Button } from "./button";
import { FormInput } from "./input";
import { useForm } from "../../hooks/useForm";
import { useNewForm } from "../../hooks/useNewForm";
import { ModalProps } from "../../interface/input";
import { categoryOptions } from "../constants/category-option";
import { AxiosError } from "axios";
import { initialFormData } from "../constants/form-const";

export const NewForm: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { formData, handleChange, resetForm } = useForm(initialFormData);
  const { handleSubmit } = useNewForm();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSubmit(formData, resetForm);
      onClose();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.errors) {
        alert(error.response?.data?.message || "SignUp failed");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6">Tambah Barang Baru</h2>
        <form onSubmit={onSubmit}>
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
            <Button text="Save" variant="submit" />
            <Button text="Cancel" variant="delete" onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};
