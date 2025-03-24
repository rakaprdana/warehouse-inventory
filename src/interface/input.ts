export interface FormSelectProps {
  label?: string;
  type: string;
  name?: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}
