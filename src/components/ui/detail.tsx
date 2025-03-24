import React, { useState } from "react";
import { Button } from "./button";
import { UpdateForm } from "./update-form";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ViewModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg  w-96">
        <h1 className="text-xl font-semibold">{title}</h1>
        <div className="flex items-center space-x-8 mt-4">{children}</div>
        <div className="mt-6 flex justify-end space-x-2">
          <Button
            text={"Update"}
            variant="submit"
            onClick={() => setIsFormOpen(true)}
          />
          <Button text={"Close"} variant="delete" onClick={onClose} />
        </div>
        <UpdateForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      </div>
    </div>
  );
};

export default ViewModal;
