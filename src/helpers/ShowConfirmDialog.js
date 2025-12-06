

/**
 * Cuadro de confirmación (por ejemplo para eliminar)
 * Retorna una promesa con true/false
 *
 * @param {string} title - Título del cuadro
 * @param {string} text - Texto descriptivo o nombre del elemento
 * @param {Object} [options]
 * @param {string} [options.confirmText='Sí, eliminar']
 * @param {string} [options.cancelText='Cancelar']
 * @param {string} [options.icon='warning']
 * @param {string} [options.confirmColor='#3085d6']
 * @param {string} [options.cancelColor='#d33']
 * @param {string} [options.customClass='small-toast']
 * @returns {Promise<boolean>} true si se confirmó
 */

import Swal from "sweetalert2";

export const ShowConfirmDialog = async ({
  title,
  text,
  icon = 'warning',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmColor = '#3085d6',
  cancelColor = '#d33',
  onConfirm,
  onCancel,
  customClass = 'small-toast'
}) => {
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: confirmColor,
    cancelButtonColor: cancelColor,
    customClass: { popup: customClass },
  }).then(result => {
    if (result.isConfirmed && onConfirm) onConfirm();
    else if (result.isDismissed && onCancel) onCancel();
  });
};
