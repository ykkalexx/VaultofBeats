const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  required = false,
}) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <p className="font-light text-sm">{label}</p>
      <input
        type={type}
        value={value}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-4 font-light py-2 rounded-xl w-[350px] border-[1px] border-gray-300 ${className}`}
      />
    </div>
  );
};

export default Input;
