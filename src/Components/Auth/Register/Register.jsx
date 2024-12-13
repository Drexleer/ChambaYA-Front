import { useEffect, useState } from "react";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { Button } from "./Button";
import { validateForm } from "./ValidateForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfessions } from "../../../Redux/Slices/ProfessionSlice";
import { LocationSelect } from "./LocationSelect";
import {
  registerProfessional,
  registerClient,
  clearRegistrationState,
} from "../../../Redux/Slices/RegisterSlice";
import { useNavigate } from "react-router-dom";
import NotificationSuccess from "./NotificationSuccess";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    professions,
    loading: professionsLoading,
    error: professionsError,
  } = useSelector((state) => state.professions);
  const { loading, error, success } = useSelector((state) => state.register);
  const [showNotification, setShowNotification] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profession: "",
    remoteWork: false,
    userName: "",
    role: "",
    address: "",
    phone: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});

  const generateUserName = (email) => {
    if (!email.includes("@")) return "";
    return email.split("@")[0];
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "email" &&
        value.includes("@") && {
          userName: generateUserName(value),
        }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(clearRegistrationState());

    if (validateForm(formValues, setErrors)) {
      try {
        let result;
        if (formValues.role === "professional") {
          result = await dispatch(registerProfessional(formValues)).unwrap();
          console.log("Registro exitoso:", result);
        } else {
          result = await dispatch(registerClient(formValues)).unwrap();
          console.log("Registro exitoso:", result);
        }
      } catch (error) {
        console.error("Fallo en el registro:", error);
      }
    } else {
      console.log("Formulario inválido, errores:", errors);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  useEffect(() => {
    dispatch(fetchProfessions());
  }, [dispatch]);

  const handleSuccess = () => {
    setShowNotification(true);
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  useEffect(() => {
    if (success) {
      handleSuccess();
    }
  }, [success, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg flex overflow-hidden">
        <div className="w-1/2 bg-gray-500 relative">
          <img
            src="https://cdn-ajfbi.nitrocdn.com/GuYcnotRkcKfJXshTEEKnCZTOtUwxDnm/assets/images/optimized/rev-2b78b4c/dataladder.com/wp-content/uploads/2021/09/data-profiling-2.jpg"
            alt="Registration"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gray-500  bg-opacity-60 flex flex-col justify-center items-center text-white p-8 text-center">
            <h2 className="text-4xl font-bold mb-4">¡Bienvenido!</h2>
            <p className="text-xl">
              Regístrate y comienza tu experiencia profesional hoy mismo
            </p>
          </div>
        </div>
        <div className="w-1/2 p-8 overflow-y-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Crear Cuenta
          </h2>

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {showNotification && (
            <NotificationSuccess
              message="Registro exitoso!\"
              onClose={() => setShowNotification(false)}
            />
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Nombres"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Luis Jose"
              />
              <InputField
                label="Apellidos"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
                error={errors.lastName}
                placeholder="Alvarez Rodriguez"
              />
            </div>

            <InputField
              label="Email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="tu@email.com"
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Contraseña"
                name="password"
                type="password"
                value={formValues.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="••••••••"
              />
              <InputField
                label="Confirmar contraseña"
                name="confirmPassword"
                type="password"
                value={formValues.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="••••••••"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <SelectField
                label="Tipo de usuario"
                name="role"
                value={formValues.role}
                onChange={handleChange}
                error={errors.role}
                options={[
                  {
                    value: "",
                    label: "Selecciona un tipo de usuario",
                    disabled: true,
                  },
                  { value: "client", label: "Busco profesionales" },
                  { value: "professional", label: "Soy profesional" },
                ]}
              />
              <SelectField
                label="Genero"
                name="gender"
                value={formValues.gender}
                onChange={handleChange}
                error={errors.gender}
                options={[
                  {
                    value: "",
                    label: "Selecciona un genero",
                    disabled: true,
                  },
                  { value: "Masculino", label: "Masculino" },
                  { value: "Femenino", label: "Femenino" },
                  { value: "Otro", label: "Otro" },
                ]}
              />
            </div>

            {formValues.role === "professional" && (
              <>
                {professionsLoading && <p>Cargando profesiones...</p>}
                {professionsError && <p>Error: {professionsError}</p>}
                {professions.length > 0 && (
                  <SelectField
                    label="Profesión"
                    name="profession"
                    value={formValues.profession}
                    onChange={handleChange}
                    error={errors.profession}
                    options={[
                      {
                        value: "",
                        label: "Selecciona una profesión",
                        disabled: true,
                      },
                      ...professions.map((profession) => ({
                        value: profession.id,
                        label: profession.name,
                      })),
                    ]}
                  />
                )}
                <LocationSelect
                  formValues={formValues}
                  setFormValues={setFormValues}
                  error={errors}
                />
                <div className="flex items-center">
                  <input
                    id="remoteWork"
                    name="remoteWork"
                    type="checkbox"
                    checked={formValues.remoteWork}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remoteWork"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Trabajo remoto
                  </label>
                </div>
              </>
            )}

            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </Button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                ¿Ya tienes una cuenta?{" "}
                <button
                  type="button"
                  onClick={handleLoginRedirect}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Inicia sesión
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
