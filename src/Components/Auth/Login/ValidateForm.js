export const validateLoginForm = (formValues) => {
  const errors = {};

  // Validar email
  if (!formValues.email.trim()) {
    errors.email = "El email es obligatorio";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formValues.email)
  ) {
    errors.email = "Por favor, ingresa un email válido";
  }

  // Validar contraseña
  if (!formValues.password) {
    errors.password = "La contraseña es obligatoria";
  } else if (formValues.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  } else if (!/[A-Za-z]/.test(formValues.password)) {
    errors.password = "La contraseña debe contener al menos una letra";
  } else if (!/[0-9]/.test(formValues.password)) {
    errors.password = "La contraseña debe contener al menos un número";
  }

  return errors;
};
