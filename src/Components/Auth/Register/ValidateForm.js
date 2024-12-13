export const validateForm = (formValues, setErrors) => {
  const newErrors = {};

  // Name validation
  if (!formValues.name || formValues.name.trim() === "") {
    newErrors.name = "Nombre es requerido";
  } else if (formValues.name.length < 2) {
    newErrors.name = "Nombre debe tener al menos 2 caracteres";
  }

  // Last name validation
  if (!formValues.lastName || formValues.lastName.trim() === "") {
    newErrors.lastName = "Apellido es requerido";
  } else if (formValues.lastName.length < 2) {
    newErrors.lastName = "Apellido debe tener al menos 2 caracteres";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formValues.email) {
    newErrors.email = "Email es requerido";
  } else if (!emailRegex.test(formValues.email)) {
    newErrors.email = "Email no es válido";
  }

  // Password validation
  if (!formValues.password) {
    newErrors.password = "Contraseña es requerida";
  } else if (formValues.password.length < 6) {
    newErrors.password = "Contraseña debe tener al menos 6 caracteres";
  }

  // Confirm password validation
  if (!formValues.confirmPassword) {
    newErrors.confirmPassword = "Confirmar contraseña es requerido";
  } else if (formValues.password !== formValues.confirmPassword) {
    newErrors.confirmPassword = "Las contraseñas no coinciden";
  }

  // Role validation
  if (!formValues.role) {
    newErrors.role = "Tipo de usuario es requerido";
  }

  // Gender validation
  if (!formValues.gender) {
    newErrors.gender = "Género es requerido";
  }

  // Professional-specific validations
  if (formValues.role === "professional") {
    // Profession validation
    if (!formValues.profession) {
      newErrors.profession = "Profesión es requerida";
    }

    // Phone validation (optional)
    const phoneRegex = /^[0-9]{10}$/;
    if (formValues.phone && !phoneRegex.test(formValues.phone)) {
      newErrors.phone = "Número de teléfono no es válido";
    }
  }

  // Set errors
  setErrors(newErrors);

  // Return true if no errors, false otherwise
  return Object.keys(newErrors).length === 0;
};
