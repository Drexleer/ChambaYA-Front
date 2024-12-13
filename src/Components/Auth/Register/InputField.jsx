import PropTypes from "prop-types";

export const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-md ${
        error ? "border-red-500" : "border-gray-300"
      } focus:outline-none focus:ring-2 ${
        error ? "focus:ring-red-500" : "focus:ring-blue-500"
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
};
