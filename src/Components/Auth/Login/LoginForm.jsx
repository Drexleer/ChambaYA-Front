import { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserLogin } from "../../../Redux/Slices/LoginSlice";

// Formulario de Login
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userLogin.user);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.email) newErrors.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formValues.email))
      newErrors.email = "Email inválido";

    if (!formValues.password) newErrors.password = "La contraseña es requerida";
    else if (formValues.password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Simular llamada asíncrona para login
      const result = await dispatch(fetchUserLogin(formValues));
      if (result.access) {
        console.log("Login exitoso");
        console.log("Aqui el user", user);
        navigate("/");
      }
    } else {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    console.log("Redirigiendo a recuperación de contraseña");
  };

  const handleRegisterRedirect = () => {
    console.log("Redirigiendo a registro");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Iniciar Sesión
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="tu@email.com"
            />

            <InputField
              label="Contraseña"
              name="password"
              type="password"
              value={formValues.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  checked={formValues.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Recordarme
                </label>
              </div>
              <div className="text-sm">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-blue-600 hover:text-blue-500"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </div>

            <Button type="submit" isLoading={isSubmitting} className="w-full">
              Iniciar Sesión
            </Button>

            <p className="text-center text-sm text-gray-600">
              ¿No tienes una cuenta?{" "}
              <button
                type="button"
                onClick={handleRegisterRedirect}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Regístrate aquí
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;