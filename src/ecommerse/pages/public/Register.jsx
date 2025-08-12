import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useForm } from "../../../hooks/useForm";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { RegisterForm } from "../../components/forms";


/*
{
  "nombre": "Luis",
  "apellido": "Reyes",
  "username": "luis",
  "email": "luis@gmail.com",
  "password":"123ABc$$",
  "telefono": 12345678,
  "admin":false,
  "assistant": false,
  "user":true
}


 {
        "id": 1,
        "nombre": "Gerson",
        "apellido": "Ep",
        "username": "gema",
        "email": "gema@gmail.com",
        "telefono": 12345678,
        "roles": [
            "ROLE_USER",
            "ROLE_ADMIN",
            "ROLE_ASSISTANT"
        ]
    },

    {
    "id": 19,
    "nombre": "lucia",
    "apellido": "Reyes",
    "username": "lucia",
    "email": "lucia@gmail.com",
    "telefono": 12345678,
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcIlJPTEVfVVNFUlwifSx7XCJhdXRob3JpdHlcIjpcIlJPTEVfQURNSU5cIn0se1wiYXV0aG9yaXR5XCI6XCJST0xFX0FTU0lTVEFOVFwifV0iLCJ1c2VybmFtZSI6Imx1Y2lhIiwiaXNBZG1pbiI6dHJ1ZSwiaXNBc3Npc3RhbnQiOnRydWUsImlzVXNlciI6dHJ1ZSwic3ViIjoibHVjaWEiLCJpYXQiOjE3NTQ3NTM1ODcsImV4cCI6MTc1NDc1NTI2Nn0.DTfnUyTuIdQSSztZci0SHdTNyRdImkDuQICrm7EhigY",
    "roles": [
        "ROLE_USER",
        "ROLE_ADMIN",
        "ROLE_ASSISTANT"
    ]
}
    

    
*/

//Formulario Register
const registerFormFields = {
    registerName: '',
    registerLastName: '',
    registerUsername: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
    registerPhone: '',
    registerAdmin: false,
    registerAssistant: false,
    registerUser: true,
}

export const Register = () => {

  const navigate = useNavigate(); //obtener la navegacion

  //hook useAuthStore se extrae propiedades del estado y acciones(funciones) del store de autenticacion
  const {startRegister, errorMessage} = useAuthStore(); //extraemos la funcion startRegister del store de autenticacion

  //se llama al customHook useForm el cual se envia registerFormFields como estado inicial y se extrae propiedades y func.
  const { 
    //data que se extrae del useForm(envida el estado inicial registerFormFields)
    registerName, 
    registerLastName, 
    registerUsername, 
    registerEmail, 
    registerPassword, 
    registerPassword2, 
    registerPhone,
    registerAdmin,
    registerAssistant,
    registerUser,
    onInputChange: onRegisterInputChange
  } = useForm(registerFormFields); //el onInputChange se renombra a onRegisterInputChange, debido a que el hook useForm se usara para loginForm tambien


  const registerSubmit = (event) => {
    event.preventDefault(); //evita el comportamiento por defecto del formulario. evita que al enviar
    startRegister({
      nombre: registerName, 
      apellido: registerLastName,
      username: registerUsername,
      email: registerEmail,     
      password: registerPassword,
      telefono: registerPhone,
      admin: registerAdmin,
      assistant: registerAssistant,
      user: registerUser,
    });
     navigate("/"); // Redirigir a la página principal después del register
  }

  useEffect(() => {
    if(errorMessage !== undefined) {
      //Si hay un mensaje de error, muestra una alerta
      Swal.fire('Error en registro', errorMessage, 'error');
    }

  }, [errorMessage]) //se dispara el useEffect cuando cambie el errorMessage -falle el registro


  //Renderiza el formulario de registro
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="border p-4 rounded shadow-sm">
            <h2 className="text-center mb-4 fw-bold" style={{ color: '#6c3483' }}>
              Crear Cuenta
            </h2>

            <RegisterForm
              registerName={registerName} 
              registerLastName={registerLastName}
              registerUsername={registerUsername}
              registerEmail={registerEmail}
              registerPassword={registerPassword}
              registerPassword2={registerPassword2}
              registerPhone={registerPhone}
              registerAdmin={registerAdmin}
              registerAssistant={registerAssistant}
              registerUser={registerUser}
              onRegisterInputChange={onRegisterInputChange}
              registerSubmit={registerSubmit}
            />

          </div>
        </div>
      </div>
    </div>
  );
};


