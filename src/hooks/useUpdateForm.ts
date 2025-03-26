import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchItemById } from "../axios/api";
import { ItemTypes } from "../types/items";

export const useUpdateForm = (isOpen: boolean) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [formData, setFormData] = useState<ItemTypes>({
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

  const fetchDataById = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetchItemById(id);
      setFormData({
        code: response.code || "",
        name: response.name || "",
        category: response.category || "",
        stack: response.stack || "",
        quantity: response.quantity || 0,
        in: response.date_in || "",
        out: response.date_out || "",
      });
    } catch (err) {
      setError("Gagal mengambil data. Coba lagi nanti.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

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

  return {
    id,
    formData,
    loading,
    error,
    handleChange,
    setError,
    setLoading,
  };
};
