
import { useState } from "react";
import { FaLink, FaUpload } from "react-icons/fa";
import { useImageUpload } from "../../../../hooks/useImageUpload";
import { getEnvVariables } from "../../../../helpers/getEnvVariables";
import { useEffect } from "react";
import "../../common/product/ImagePicker.css";

/**
 * ImagePicker para productos.
 *
 * @param {string} value - URL actual del formulario
 * @param {(url: string) => void} onImageChange - Notifica la nueva URL
 */

//extrae la ruta principal para las peticions desde .env  variables de entorno
const { VITE_API_URL } = getEnvVariables();

export const ImagePicker = ({ value, onImageChange, onBlur, touched, imageUrlValid }) => {
  const [preview, setPreview] = useState(value || "");
  const [manualUrl, setManualUrl] = useState(value || "");

  //Llama al hook useImageUpload y extrae los metodos uploadImage, isUploading para poder utilizarlos
  const { uploadImage, isUploading } = useImageUpload();

   // Sincroniza componente cuando cambie value externo
  useEffect(() => {
    setPreview(value || "");
    setManualUrl(value || "");
  }, [value]);

  // Maneja archivo local
  const handleFile = async (file) => {
    const url = await uploadImage(file);
    if (!url) return;

    setPreview(url);
    setManualUrl(url);
    onImageChange(url);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  // Maneja la URL pegada manualmente
  const handleManualUrl = (url) => {
    setManualUrl(url);
    setPreview(url);
    onImageChange(url);
  };

  // Drag & drop
  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="form-group mb-3" >
      <label 
      className="form-label d-flex align-items-center gap-2"
      /* className={`form-label d-flex align-items-center gap-2 ${
        touched.imageUrl && imageUrlValid ? "text-danger" : ""
      }`} */
      >
        <FaUpload/> Imagen del producto
      </label>

      {/* Input de URL */}
      <div
       //className="input-group mb-3"
       className={`input-group mb-3 input-icon-container ${touched.imageUrl && imageUrlValid ? "dropzone-invalid" : ""}`} 
      >
         {/* CHIP del icono */}
        <span 
          className={`input-group-text input-icon-chip ${
          touched.imageUrl && imageUrlValid ? "invalid" : ""
        }`}
/*            className={`input-group-text ${
            touched.imageUrl && imageUrlValid ? "dropzone-invalid text-danger" : ""
          }`} */
        >

          <FaLink
            className={`icon-link ${touched.imageUrl && imageUrlValid ? "is-invalid" : ""}`}
            //className={`${touched.imageUrl && imageUrlValid ? "dropzone-invalid text-danger" : ""}`} 
           />
        </span>
        <input
          type="text"
          className={`form-control ${touched.imageUrl && imageUrlValid ? "is-invalid" : ""}`}
          placeholder="Pega una URL o selecciona archivo"
          value={manualUrl}
          onChange={(e) => handleManualUrl(e.target.value)}
          onBlur={onBlur}
        />
      </div>
      {touched.imageUrl && imageUrlValid && (
          <small className="text-danger">{imageUrlValid}</small>
      )}


      {/* Drag & drop box */}
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        //className="mb-3 p-3 border rounded text-center"
        className={`dropzone mt-2 ${touched.imageUrl && imageUrlValid ? 'dropzone-invalid' : ''}`}
        style={{ 
          cursor: "pointer", 
          background: "#fafafa" 
        }}
        onClick={() => document.getElementById("filePicker").click()}
      >
        Arrastra o selecciona una imagen aqui
      </div>

      {/* File hidden input */}
      <input
        id="filePicker"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="d-none"
      />

      {/* Vista previa */}
      {preview && (
        <div className="text-center mt-3">
          <img
            src={VITE_API_URL + preview}
            alt="Vista previa"
            style={{
              width: "100%",
              maxHeight: "200px", 
              objectFit: "contain",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />
        </div>
      )}

      {isUploading && (
        <small className="text-muted d-block mt-1">Subiendo imagen...</small>
      )}
    </div>
  );
};


