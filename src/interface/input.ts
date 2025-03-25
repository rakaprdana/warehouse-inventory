export type FormSelectProps = {
  label?: string;
  type: string;
  name?: string;
  value: string | number | undefined;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
