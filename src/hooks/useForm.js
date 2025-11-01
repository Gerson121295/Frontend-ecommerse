import { useEffect, useMemo, useState } from "react";

//Hook para cualquier tipo de formulario
export const useForm = (initialForm = {}, formValidations = {}) => { //recibe el initialForm y el formValidation

    //useState para manejar el estado: formState tiene el estado con setFormState modificamos formState y useState({initialForm}) inicializamos formState
    const [formState, setFormState] = useState(initialForm);

    const [formValidation, setFormValidation] = useState({});

    //valida que el campo no haya sido tocado
    const [touched, setTouched] = useState({});

    useEffect(() => {
      createValidators();
    }, [formState]) //se ejecuta createValidator cada vez que cambie formState(cualquier campo del form, botones, etc.)
    

    useEffect( () => {
        setFormState(initialForm); //cada vez que cambie el initialForm, se establece el nuevo initialForm
    }, [initialForm]) //useEffect se dispara cada vez que cambia el initialForm


    //isFormValid se va a volver a recalcular si cambia el formValidation
    const isFormValid = useMemo(() => {

        //valida los campos del formulario si alguno tiene null(esta vacio) no cumple
        for(const formValue of Object.keys(formValidation)){
            if(formValidation[formValue] !== null) return false; //si es diferente de null los campos, return salir del for 
        } 

        return true; //formulario es valido, cumple las validaciones.
    }, [formValidation])

    //Funcion que permite hacer el cambio de cualquier input
    const onInputChange = ({target}) => { //del event se desestructura para obtener el target //const onInputChange = (event) => {
        //console.log(event.target.value);
        //const {name, value} = target; //del target se desestructura para obtener name y value del campo
         const { name, value, type, checked } = target; //version maneja checked para checkboxes
        //console.log({name, value});
        
        //Establecemos a formState los valores escritos en el imput
        setFormState({
            ...formState, //desestructurar el formState para mantener los valores anteriores del formulario
            //[name]:value, //establecemos el nuevo valor para name obtenido del value del input del form
            [name]: type === 'checkbox' ? checked : value, //establecemos el nuevo valor para name obtenido del value del input del form //version maneja checked para checkboxes
        });
    }

    const onBlurField = ({ target }) => {
        setTouched({
        ...touched,
        [target.name]: true,
        });
    };

    //Funcion para Reset o limpiar el form
    const onResetForm = () => { 
        /*setFormState ({ //forma 2 cuando queremos modificar algun campo del form.
                ...initialForm, //desestructuramos los datos que tenia antes el form
                initialForm : {} //luego establecemos el objeto initalForm como vacio
        })*/
        setFormState(initialForm); //Forma 2: pasarle los valores iniciales initialForm que se recibe que son vacios al setFormState(que modifica el formState)
        setTouched({}); //resetea los campos tocados
     }

     //Funcion de validacion de los campos
     const createValidators = () => {

        const formCheckedValues = {};

        for (const formField of Object.keys(formValidations)){
            const [fn, errorMessage] = formValidations[formField];

            //fn ejecuta la funcion si la funcion se cumple ejecuta null pero si no : muestra erroMessage
        formCheckedValues[`${formField}Valid`] = fn(formState[formField], formState)
            ? null
            : errorMessage;
        }
        //cambia el valor de formValidation con setFormValidation estableciendo los valores de formCheckedValues
        setFormValidation(formCheckedValues);
     } 


    //El Hook retorna- funcionalidades para ser usadas en otros componentes.
    return{
        ...formState, //retorna desestructurado el formState, retorna los campos del form 
        ...formValidation, //esparce el objeto que tiene todas las propiedades de validacion
        isFormValid,
        formState,
        touched,
        onInputChange,
        onResetForm,
        onBlurField,
    }

}

