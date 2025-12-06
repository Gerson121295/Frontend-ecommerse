

import { useState, useRef } from "react";
import ecommerseApi from "../../api/ecommerseApi";
import { showNotification } from "../helpers/showNotification";

/**
 * Hook reutilizable para subir imágenes al backend.
 * Backend puede usar S3, Cloudinary, guardar en carpeta local u otro proveedor.
 *
 * @returns {{
 *   uploadImage: (file: File) => Promise<string|null>,
 *   isUploading: boolean,
 *   error: string|null
 * }}
 */
export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const abortController = useRef(null);

  /**
   * Valida formato de imagen
   */
  const validateImage = (file) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];

    if (!allowed.includes(file.type)) {
      showNotification("error", "Archivo no válido", "Solo se aceptan JPG, PNG y WEBP");
      return false;
    }

    if (file.size > 4 * 1024 * 1024) {
      showNotification("error", "Archivo demasiado grande", "Máximo permitido: 4MB");
      return false;
    }

    return true;
  };

  /**
   * Sube una imagen al backend y obtiene la URL final (S3 o Cloudinary).
   */
  const uploadImage = async (file) => {
    if (!file) return null;
    if (!validateImage(file)) return null;

    setIsUploading(true);
    setError(null);

    abortController.current = new AbortController();

    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await ecommerseApi.post("/imagenes/upload", formData, 
    //No es necesario enviar losheaders ya que se utiliza un interceptor que lo incluye
        {
        //headers: { "Content-Type": "multipart/form-data" }, //no es necesario porque Axios detecta automáticamente que se está enviando un FormData
        signal: abortController.current.signal, //opcional - Si NO se tiene un botón Cancelar, entonces es innecesario
        } 
    );

      showNotification("success", "Imagen subida correctamente", "");

      return data.imageUrl;
    } catch (err) {
      let msg = "Error al subir la imagen.";

      if (err.name === "CanceledError") {
        msg = "Subida cancelada.";
      } else {
        msg = err.response?.data?.message || err.message;
      }

      setError(msg);
      showNotification("error", "Error", msg);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  //propiedades y funciones que retorna el hook
  return { 
    isUploading, 
    error,
    uploadImage, 
    };
};


