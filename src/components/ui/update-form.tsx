import React from "react";
import { updateItem } from "../../axios/api";
import { Button } from "./button";
import { FormInput } from "./input";
import { useUpdateForm } from "../../hooks/useUpdateForm";
import { categoryOptions } from "../constants/category-option";
import { ModalProps } from "../../types/modal";

export const UpdateForm: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { id, formData, loading, error, handleChange, setError, setLoading } =
    useUpdateForm(isOpen);
  const token = localStorage.getItem("token");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.name || !formData.category) {
      setError("Semua field wajib diisi!");
      return;
    }
    setLoading(true);
    try {
      await updateItem(id || "", formData, token || "");
      console.log("Form Data Updated:", formData);
      onClose();
    } catch (err) {
      setError("Gagal mengupdate data. Coba lagi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-background rounded-lg shadow-lg w-3/4 p-6">
        <h2 className="text-2xl font-bold mb-4">
          {id ? "Edit Barang" : "Tambah Barang Baru"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {loading && <p className="text-gray-500 text-sm mb-4">Memuat...</p>}

        <form onSubmit={onSubmit}>
          <div className="flex justify-between space-y-4 space-x-8  ">
            <section className="w-1/2">
              <FormInput
                label="Name Item"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <FormInput
                label="Stack Item"
                type="text"
                name="stack"
                value={formData.stack}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Quantity Item"
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </section>
            <section className="w-1/2">
              <FormInput
                label="Category Item"
                type="select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={categoryOptions}
                required
              />
              <FormInput
                label="In Date"
                type="date"
                name="in"
                value={formData.in}
                onChange={handleChange}
              />
              <FormInput
                label="Out Date"
                type="date"
                name="out"
                value={formData.out}
                onChange={handleChange}
              />
            </section>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <Button text={loading ? "Menyimpan..." : "Save"} variant="submit" />
            <Button text={"Cancel"} variant="delete" onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};
