

import Swal from 'sweetalert2';

/**
 * Muestra una notificación reutilizable con SweetAlert2
 *
 * @param {'success' | 'error' | 'warning' | 'info'} type - Tipo de notificación
 * @param {string} title - Título del mensaje
 * @param {string} message - Contenido o descripción
 * @param {Object} [options] - Configuración adicional
 * @param {Function} [options.onClose] - Callback al cerrar la notificación
 * @param {string} [options.customClass='toast-corporate'] - Clase de estilo (ver tu CSS)
 * @param {number} [options.timer=2000] - Duración en ms
 */

export const showNotification = (
  type,
  title,
  message,
  {
    onClose = null,
    customClass = 'toast-corporate',
    timer = 2000
  } = {}
) => {

  return Swal.fire({
    icon: type,
    title,
    text: message,
    toast: true,
    position: 'top-end', //'top-end',
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    background:
      type === 'error' ? '#f8d7da' :
      type === 'success' ? '#f0f0f0' :
      '#f0f0f0',
    color:
      type === 'error' ? '#721c24' :
      type === 'success' ? '#333' :
      '#333',
    customClass: { popup: customClass }
  }).then(() => {
    if (onClose) onClose();
  });
};
