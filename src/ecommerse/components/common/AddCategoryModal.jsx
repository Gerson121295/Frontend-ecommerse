

import ReactModal from "react-modal";
import "./AddCategoryModal.css"; // Assuming you have a CSS file for styling
import { useCategoryModal } from "../../../hooks/useCategoryModal";
import { useCategory } from "../../../hooks/useCategory";
import { useEffect, useMemo, useState } from "react";


  //Si es diferente del ambiente de 'test' se puede ejecutar la linea Modal.setAppElement esto xq en test no lo reconoce. 
  //if(getEnvVariables().VITE_MODE !== 'test'){
//Para que el modal se sobreponga ante todo
//Modal.setAppElement('#root'); //recibe el id root del body del index.html
  ReactModal.setAppElement('#root');

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const AddCategoryModal = () => {    //= ({ show, onClose }) => { //version anterior que recibia props
  //if (!show) return null; // Do not render the modal if 'show' is false

  //se extrae propiedades y funciones desestructurando el hook useCategoryModal
  const { isCategoryModalOpen, closeCategoryModal } = useCategoryModal();

  //se extrae propiedades y funciones desestructurando el hook useCategoryStore
  const { categorySelected, startSavingCategory } = useCategory();

  //Estado de validacion del Form cuando el usuario ha intentado enviar el form(false aun no se ha hecho el envio del form)
  const [formSubmitted, setFormSubmitted] = useState(false); //Se inicia en false

  //Estado del CalendarForm
  const [formValues, setFormValues] = useState(
    {
      nombreCategoria:  '',
    }
  );

  //UseMemo memoriza el valor de formValues.nombreCategoria y formSubmited ejecuta la funcion si cambia estos valores
  const titleClass = useMemo(() => {
    //si es diferente formSubmitted el form no se ha disparado retorna un string vacio en la clase(no se muestra el estilo).
    if (!formSubmitted) return ''; //Si el form no ha sido enviado, no aplica ninguna clase de validacion

    return ( formValues.nombreCategoria.length > 0 ) ? ''  //no muestra nada, vacio  //'is-valid' //el nombreCategoria no esta vacio muestra check ok verde
                                  : 'is-invalid'; //el nombreCategoria esta vacio muestra check alerta roja
  }, [formValues.nombreCategoria, formSubmitted])                       
  
  //Func. Para establecer los nuevos valores que el User agrega al Form
  const onInputChanged = ({ target }) => { //se recibe el (event) pero se desestructura {} el event para obtener el {target} el valor del campo
    setFormValues({
                ...formValues, //se esparce todos los valores del Form(formValues) anteriores, para no sobreescribir(titulo, notes, start, end), solo sobreescribir el que tenga el valor del target.name
                [target.name] : target.value   //a target.name se le agrega el nuevo valor target.value
            })
    }


    //Se dispara cuando cambie categoria seleccionada
    useEffect(() => {
      if( categorySelected !== null ){ //si hay una categoria seleccionada
        setFormValues({ //establece los valores del form con los datos de la categoria seleccionada
          //nombreCategoria: categorySelected.nombreCategoria,
          ...categorySelected //los valores del form se carga con los dato de categoria seleccionada
        });
      }
    }, [categorySelected]); //cuando cambie categorySelected se dispara el useEffect

    //Función que se ejecuta al cerrar el modal
    const onCloseModal = () => {
      document.activeElement?.blur(); // Evita el warning de accesibilidad
      closeCategoryModal(); //cierra el modal
    };

    //Función que se ejecuta al enviar el form
    const onSubmit = async( event ) => {
      event.preventDefault(); //evita que se recargue la pagina al enviar el form
      setFormSubmitted(true); //se hizo el intento de enviar el form

      //Validación del Form
      if( formValues.nombreCategoria.length === 0 ) return; //si el nombreCategoria esta vacio no hace nada

      //si el formulario esta lleno sus campos
      //console.log(formValues);
      await startSavingCategory(formValues); //llama a la funcion para guardar la categoria
      
      document.activeElement?.blur(); //Evita el warning de accesibilidad
      closeCategoryModal(); //cierra el modal

      //Reset Validacion si el usuario ha intentado enviar el form es false
      setFormSubmitted(false);
    };
    
  return (
    <ReactModal
      isOpen={ isCategoryModalOpen } //abrir el modal
      onRequestClose={ onCloseModal } //para cerrar el modal
      style={ customStyles } //agrega estilos personalizados al modal
      
      //shouldFocusAfterRender={false} // opcional
      //Estilo Personalizado del modal - si se usa estas 2 propiedades entonces no se debe utilizar la clase CustomStyles
      //className= "modal-content"  //"modal"  
      //overlayClassName= "modal-backdrop-custom"  //"modal-fondo"
      closeTimeoutMS={ 200 } //tiempo de cierre del modal en ms
      //parentSelector={() => document.querySelector('#root') } //para que el modal se renderice dentro del div con id root
    >

    {/* Contenido a mostrar en el modal */}
        <h1> Nueva categoria </h1>
        <hr />

            <form
              className="container"
              onSubmit={ onSubmit } //funcion que se ejecuta al enviar el form
            >
            <div className="form-group mb-2">
            <label>Nombre Categoria</label>
            <input
              type="text"
              className= {`form-control ${titleClass}`}  
              placeholder="Bebidas"
              name="nombreCategoria"
              autoComplete="off"

              //Agrega valor del formulario - formValues
              value={formValues.nombreCategoria}
              onChange={onInputChanged} //Para establecer los nuevos valores que el User agregue al Form

            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          {/* Footer */}
          <div className="modal-footer px-0 border-0 d-flex justify-content-end gap-2 mt-2">
            <button 
                type="submit" 
                className="btn btn-outline-primary btn-block">
              <i className="far fa-save"></i>
              <span> Guardar</span>
            </button>
            <button 
                className="btn btn-outline-danger" 
                onClick={onCloseModal}>
              <i className="fa-solid fa-trash-list"></i>
              <span>Cancelar</span>
            </button>
          </div>
              </form>
          </ReactModal>
    );
}
export default AddCategoryModal;


