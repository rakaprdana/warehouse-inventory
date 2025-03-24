import { FormSelectProps } from "../../interface/input";

export const FormInput: React.FC<FormSelectProps> = ({
  placeholder,
  label,
  type,
  name,
  value,
  onChange,
  required = false,
  options,
}) => {
  if (type === "select") {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full max-w-xl p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-foreBackground focus:border-transparent transition duration-200"
          required={required}
        >
          <option value="" disabled>
            Pilih {label}
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full max-w-xl p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-foreBackground focus:border-transparent transition duration-200"
        required={required}
      />
    </div>
  );
};
