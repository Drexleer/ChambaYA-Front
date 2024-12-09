import PropTypes from "prop-types";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  isLoading = false,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || isLoading}
    className={`
      w-full py-2 px-4 
      bg-blue-600 text-white 
      rounded-md hover:bg-blue-700 
      transition duration-300
      ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}
      ${className}
    `}
  >
    {isLoading ? "Iniciando sesión..." : children}
  </button>
);

// Validaciones
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Button;
