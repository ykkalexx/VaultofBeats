const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  loading = false,
}) => {
  const baseStyles =
    "px-2 py-3 w-full rounded-xl font-light transition-all duration-200";
  const defaultStyles = "bg-black text-white hover:bg-gray-800";
  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${!disabled ? defaultStyles : disabledStyles}
        ${className}
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
