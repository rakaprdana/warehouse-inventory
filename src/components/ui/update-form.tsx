import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "./button";
import { FormInput } from "./input";
import axios from "axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateForm: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    category: "",
    stack: "",
    quantity: 0,
    in: "",
    out: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const API = import.meta.env.VITE_API_BASE_URL;

  const fetchDataById = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API}/items/${id}`);
      setFormData({
        code: response.data.code || "",
        name: response.data.name || "",
        category: response.data.category || "",
        stack: response.data.stack || "",
        quantity: response.data.quantity || 0,
        in: response.data.date_in || "",
        out: response.data.date_out || "",
      });
    } catch (err) {
      setError("Gagal mengambil data. Coba lagi nanti.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [API, id]);

  useEffect(() => {
    if (isOpen) {
      fetchDataById();
    }
  }, [fetchDataById, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.name || !formData.category) {
      setError("Semua field wajib diisi!");
      return;
    }
    setLoading(true);
    try {
      await axios.put(`${API}/items/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Form Data Updated:", formData);
      onClose();
    } catch (err) {
      setError("Gagal mengupdate data. Coba lagi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = [
    { value: "Elektronik", label: "Elektronik" },
    { value: "Peralatan Rumah Tangga", label: "Peralatan Rumah Tangga" },
    { value: "Alat Tulis", label: "Alat Tulis" },
    { value: "Lainnya", label: "Lainnya" },
  ];
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4">
          {id ? "Edit Barang" : "Tambah Barang Baru"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {loading && <p className="text-gray-500 text-sm mb-4">Memuat...</p>}

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
            <Button text={loading ? "Menyimpan..." : "Save"} variant="submit" />
            <Button text={"Cancel"} variant="delete" onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};
