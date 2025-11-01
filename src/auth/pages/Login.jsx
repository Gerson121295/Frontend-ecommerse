import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { LoginForm } from "../../ecommerse/components/forms";
import { useSelector } from "react-redux";


//Formulario de Login
const loginFormFields = {
  loginUsername: '',
  loginPassword: '',
}

const loginFormValidations = {
   loginUsername: [
    (value) => value.trim().length >= 2,
    'Usuario invalido'
  ],
  loginPassword: [
    //(value) => /^(?=(?:.*\d){3,})(?=(?:.*[A-Z]){1,})(?=(?:.*[!@#$%^&*()_+\[\]{}|;:,.<>?]){2,}).{8,}$/.test(value),
    (value) => value.trim().length >= 7,
    'Contraseña no segura'
  ]
};

export const Login = () => {

  const navigate = useNavigate(); //obtener la navegacion

  //hook useAuthStore se extrae propiedades del estado y acciones(funciones) del store de autenticacion
  const {startLogin, errorMessage} = useAuthStore(); //extraemos la funcion startLogin del store de autenticacion

  const {user, status} = useSelector(state => state.auth); //extraemos el user del estado auth

  //Se llama al customHook useForm el cual se envia loginFormFields como estado inicial y se extrae propiedades y func.
  const { loginUsername, loginPassword, 
    onInputChange:onLoginInputChange, 
    onBlurField, loginUsernameValid, loginPasswordValid, isFormValid, touched
  } = useForm(loginFormFields, loginFormValidations); //el onInputChange se renombra a onLoginInputChange, debido a que el hook useForm se usara para registerForm tambien

  const loginSubmit = async (event) => {
    event.preventDefault(); //evita el comportamiento por defecto del formulario. evita que al enviar el form se recargue la pagina

     /* if( registerPassword !==  registerPassword2 ){
            Swal.fire('Error en registro', 'Contraseña no son iguales', 'error');
            return;
      }
 */
    if (!isFormValid) return; // corta si no cumple validaciones

     const res = await startLogin(
      { username: loginUsername, password: loginPassword }
    );
  
    if (res.success) {
      // mostrar notificación y navegar
      console.log(status, user.username);
      Swal.fire({
        icon: 'success',
        title: `Hola ${res.user.username || loginUsername}`,
        text: '¡Buenas compras!',
        showConfirmButton: false,
        timer: 4000,
        toast: true,
        position: 'top-end',
      });

      //navigate('/');
    } else {
      // Si quieres, aquí podrías mostrar el error, pero ya lo maneja el useEffect que escucha errorMessage
      console.log('Login fallido:', res.error);
    }
  }; 

   
  useEffect(() => {
    if (errorMessage) {
      Swal.fire({
        icon: 'error',
        title: 'Error en la autenticación',
        text: errorMessage,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        position: 'top-end',
      });
    }
  }, [errorMessage]);
  


  //Renderiza el formulario de login
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-5 col-lg-4">
          <div className="border p-4 rounded shadow-sm">
            <h2 className="text-center fw-bold mb-3" style={{ color: '#6c3483' }}>
              Iniciar Sesión
            </h2>
            {/* <p className="text-center mb-4 fw-medium" style={{ color: '#6c3483' }}>
              Inicia Sesión en tu cuenta
            </p> */}

            <LoginForm
            //Se pasa las propiedades y funciones necesarias al componente LoginForm
              loginUsername={loginUsername}
              loginPassword={loginPassword}
              onLoginInputChange={onLoginInputChange}
              loginSubmit={loginSubmit}

              //Validaciones de los campos
              loginUsernameValid={loginUsernameValid}
              loginPasswordValid={loginPasswordValid}
              isFormValid={isFormValid}
              touched={touched}
              onBlurField={onBlurField}
            />           
          </div>
        </div>
      </div>
    </div>
  );
};


