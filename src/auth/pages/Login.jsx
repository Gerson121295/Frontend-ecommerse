import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { LoginForm } from "../../ecommerse/components/forms";


//Formulario de Login
const loginFormFields = {
  loginUsername: '',
  loginPassword: '',
}


export const Login = () => {

  const navigate = useNavigate(); //obtener la navegacion

  //hook useAuthStore se extrae propiedades del estado y acciones(funciones) del store de autenticacion
  const {startLogin, errorMessage} = useAuthStore(); //extraemos la funcion startLogin del store de autenticacion

  //Se llama al customHook useForm el cual se envia loginFormFields como estado inicial y se extrae propiedades y func.
  const { loginUsername, loginPassword, onInputChange:onLoginInputChange} = useForm(loginFormFields); //el onInputChange se renombra a onLoginInputChange, debido a que el hook useForm se usara para registerForm tambien


  const loginSubmit = (event) => {
    event.preventDefault(); //evita el comportamiento por defecto del formulario. evita que al enviar el form se recargue la pagina

     /* if( registerPassword !==  registerPassword2 ){
            Swal.fire('Error en registro', 'Contraseña no son iguales', 'error');
            return;
      }
 */

      startLogin({
        username: loginUsername, 
        password: loginPassword
      })

    //navigate("/"); //redirigir a la ruta principal Home 

  }

  
  useEffect(() => {
    if(errorMessage !== undefined) {
      //Si hay un mensaje de error, muestra una alerta
      Swal.fire('Error en la autenticacion', errorMessage, 'error');
    }

  }, [errorMessage]) //se dispara el useEffect cuando cambie el errorMessage -falle el login


  //Renderiza el formulario de login
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-5 col-lg-4">
          <div className="border p-4 rounded shadow-sm">
            <h2 className="text-center fw-bold mb-3" style={{ color: '#6c3483' }}>
              Iniciar Sesión
            </h2>
            <p className="text-center mb-4 fw-medium" style={{ color: '#6c3483' }}>
              Inicia Sesión en tu cuenta
            </p>

            <LoginForm
            //Se pasa las propiedades y funciones necesarias al componente LoginForm
              loginUsername={loginUsername}
              loginPassword={loginPassword}
              onLoginInputChange={onLoginInputChange}
              loginSubmit={loginSubmit}
            />
           
          </div>
        </div>
      </div>
    </div>
  );
};


