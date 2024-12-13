import PropTypes from "prop-types";
import { useState } from "react";
import statesData from "../../../Utils/venezuela.json";

export const LocationSelect = ({ formValues, setFormValues, error }) => {
  const [municipalityOptions, setMunicipalityOptions] = useState([]);
  const [localityOptions, setLocalityOptions] = useState([]);

  // Maneja el cambio de Estado
  const handleStateChange = (e) => {
    const selectedState = statesData.find(
      (state) => state.estado === e.target.value
    );
    setFormValues((prev) => ({
      ...prev,
      state: e.target.value, // Ahora envía el nombre del estado
      municipality: "",
      locality: "",
    }));
    setMunicipalityOptions(selectedState?.municipios || []);
    setLocalityOptions([]);
  };

  // Maneja el cambio de Municipio
  const handleMunicipalityChange = (e) => {
    const selectedMunicipality = municipalityOptions.find(
      (mun) => mun.municipio === e.target.value
    );
    setFormValues((prev) => ({
      ...prev,
      municipality: e.target.value,
      locality: "",
    }));
    setLocalityOptions(selectedMunicipality?.parroquias || []);
  };

  // Maneja el cambio de Parroquia
  const handleLocalityChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      locality: e.target.value,
    }));
  };

  return (
    <div>
      {/* Select para Estado */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Estado
        </label>
        <select
          name="state"
          value={formValues.state}
          onChange={handleStateChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            error.state
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        >
          <option value="">Selecciona un estado</option>
          {statesData.map((state) => (
            <option key={state.id_estado} value={state.estado}>
              {state.estado}
            </option>
          ))}
        </select>
        {error.state && (
          <p className="text-red-500 text-xs mt-1">{error.state}</p>
        )}
      </div>

      {/* Select para Municipio */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Municipio
        </label>
        <select
          name="municipality"
          value={formValues.municipality}
          onChange={handleMunicipalityChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            error.municipality
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          disabled={municipalityOptions.length === 0}
        >
          <option value="">Selecciona un municipio</option>
          {municipalityOptions.map((mun) => (
            <option key={mun.municipio} value={mun.municipio}>
              {mun.municipio}
            </option>
          ))}
        </select>
        {error.municipality && (
          <p className="text-red-500 text-xs mt-1">{error.municipality}</p>
        )}
      </div>

      {/* Select para Parroquia */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Parroquia
        </label>
        <select
          name="locality"
          value={formValues.locality}
          onChange={handleLocalityChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            error.locality
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          disabled={localityOptions.length === 0}
        >
          <option value="">Selecciona una parroquia</option>
          {localityOptions.map((parr) => (
            <option key={parr} value={parr}>
              {parr}
            </option>
          ))}
        </select>
        {error.locality && (
          <p className="text-red-500 text-xs mt-1">{error.locality}</p>
        )}
      </div>
    </div>
  );
};

LocationSelect.propTypes = {
  formValues: PropTypes.object.isRequired,
  setFormValues: PropTypes.func.isRequired,
  error: PropTypes.object,
};
