import { ConfirmModalProps } from "../../types/modal";
import { Button } from "./button";

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message = "Are you sure you want to delete this?",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="mb-4 text-lg">{message}</p>
        <div className="flex justify-end space-x-4">
          <Button text={"Cancel"} onClick={onClose} variant="submit" />
          <Button text={"Delete"} onClick={onConfirm} variant="delete" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
