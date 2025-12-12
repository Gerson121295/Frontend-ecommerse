

import ReactModal from 'react-modal';
import Swal from 'sweetalert2';
import './BaseModal.css'

ReactModal.setAppElement('#root');


/* const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    padding: '0',  //'0',  //'5px 5px', 
    minWidth: '330px',
    maxWidth: '520px',  // tamaño  ancho
    maxHeight: '100vh',   // <-- limitar altura para que no ocupe toda la pantalla
    overflow: 'hidden',  // ← oculta scrollbar dentro. Puede ser: 'auto'
    boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    zIndex: 1050
  }
}; */

const customStyles = {
  content: {
    position: 'relative',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '0', //'5px 5px', 
    border: 'none',
    borderRadius: '10px',
    width: '90vw',
    maxWidth: '480px', //'550px', // tamaño  ancho
    maxHeight: '100vh',  //'85vh',  // <-- limitar altura para que no ocupe toda la pantalla
    overflow: 'hidden',  // ← oculta scrollbar dentro. Puede ser: 'auto'
    background: '#ffffff',
    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
    animation: 'fadeIn 0.25s ease-out',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.55)',
    zIndex: 1350,
    backdropFilter: 'blur(3px)', //Funcion de opacar la pantalla para que resalte el modal
  }
};


/*
BaseModal maneja todo lo común (diseño, cierre, confirmación si hay cambios).
AddProductModal u otros solo se enfoca en los campos específicos del producto(o su campos).
*/

export const BaseModal = ({
  isOpen,
  onClose,
  title,
  children,
  hasChanges = false,
  onReset,
}) => {

  const handleClose = async () => {
    if (hasChanges) {
      const result = await Swal.fire({
        title: '¿Descartar cambios?',
        text: 'Tienes cambios sin guardar, ¿deseas salir sin guardar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'No, continuar editando',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      });
      if (!result.isConfirmed) return;
      
      // si el modal hijo definió cómo restaurar los datos, se ejecuta
      if (onReset) onReset();
    }

    onClose(); 
  };

  // Permite que el hijo (AddProductModal) use handleClose
 /*  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={customStyles}
      closeTimeoutMS={200}
    >
  
      <div  //Titulo Header fijo 
        style={{
          position: 'sticky',
          top: 0,
          background: '#fff',
          padding: '10px 10px', //'15px 20px',
          borderBottom: '1px solid #e5e5e5',
          zIndex: 10
        }}
      >
        <h4 className="m-0">{title}</h4>
      </div>

      <div  //Contenido Scrolleable 
        style={{
          overflowY: 'auto',
          padding: '10px',
          //maxHeight: 'calc(80vh - 70px)' // header fijo resta altura
          maxHeight: 'calc(95vh - 10px)' 
        }}
      >
        {
        children(handleClose) //{children} ← pasamos handleClose como función al hijo
        } 
      </div>
    </ReactModal>
  ); */

  //Version modal usa estilos CSS Responsive
 return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={customStyles}
      closeTimeoutMS={200}
    >

      {/* Titulo Header fijo  */}
      <div className="modal-header-modern">
        <h4 className="modal-title-modern">{title}</h4>
        <button className="close-btn-modern" onClick={handleClose}>
          ✕
        </button>
      </div>

      {/* Contenido Scrolleable  */}
      <div className="modal-body-modern">
        {children(handleClose)}
      </div>

    </ReactModal>
  );




};

