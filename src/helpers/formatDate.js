

/**
 * Formatea una fecha ISO (por ejemplo "2025-05-05T17:10:13.196+00:00")
 * al formato corto "7/11/2025 - 11:45"
 * 
 * @param {string | Date} dateInput - Fecha en formato ISO o Date
 * @returns {string} Fecha formateada en formato local
 */
export const formatDate = (dateInput) => {
  if (!dateInput) return ''; 

  try {
    const date = new Date(dateInput);

    // Obtiene fecha local
    const dia = date.getDate();
    const mes = date.getMonth() + 1; // Los meses empiezan desde 0
    const año = date.getFullYear();

    // Hora y minutos
    const horas = date.getHours();
    const minutos = date.getMinutes();

    // Formatear con ceros a la izquierda (ej. 07/09/2025 - 09:05)
    const diaFmt = String(dia).padStart(2, '0');
    const mesFmt = String(mes).padStart(2, '0');
    const horasFmt = String(horas).padStart(2, '0');
    const minutosFmt = String(minutos).padStart(2, '0');

    return `${diaFmt}/${mesFmt}/${año} - ${horasFmt}:${minutosFmt}`;
  } catch (error) {
    console.error('Error al formatear fecha:', error);
    return '';
  }
};

