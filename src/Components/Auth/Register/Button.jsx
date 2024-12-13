import PropTypes from "prop-types";

export const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit"]),
  disabled: PropTypes.bool,
};
