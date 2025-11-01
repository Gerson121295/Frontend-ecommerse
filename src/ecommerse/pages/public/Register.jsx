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
    registerUser: true, //Siempre true por defecto
}

const registerFormValidations = {
  registerName: [
    (value) => value.trim().length >= 3 && value.trim().length <= 12,
    'El nombre debe tener entre 3 y 12 caracteres'
  ],
  registerLastName: [
    (value) => value.trim().length >= 3 && value.trim().length <= 12,
    'El apellido debe tener entre 3 y 12 caracteres'
  ],
  registerUsername: [
    (value) => value.trim().length >= 4 && value.trim().length <= 8,
    'El usuario debe tener entre 4 y 8 caracteres'
  ],
  registerEmail: [
    (value) => /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/.test(value),
    'El correo no tiene un formato válido'
  ],
  registerPhone: [
    (value) => /^\d{8}$/.test(value),
    'El teléfono debe tener 8 dígitos numéricos'
  ],
  registerPassword: [
    (value) => value.trim().length >= 7,
    'La contraseña debe tener al menos 7 caracteres'
  ],
  registerPassword2: [
    (value, formState) => value === formState.registerPassword,
    'Las contraseñas no coinciden'
  ]
};

export const Register = () => {

  const navigate = useNavigate(); //obtener la navegacion

  //hook useAuthStore se extrae propiedades del estado y acciones(funciones) del store de autenticacion
  const {startRegister, errorMessage, status, user:authUser} = useAuthStore(); //extraemos la funcion startRegister del store de autenticacion

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
    onInputChange: onRegisterInputChange,
    //extrae funciones y propiedades de validacion del useForm
    onBlurField, //funcion que se llama cuando un campo pierde el foco
    registerNameValid, registerLastNameValid, registerUsernameValid, 
    registerEmailValid, registerPasswordValid, registerPassword2Valid, 
    registerPhoneValid, isFormValid, touched
  } = useForm(registerFormFields, registerFormValidations); //el onInputChange se renombra a onRegisterInputChange, debido a que el hook useForm se usara para loginForm tambien


  const registerSubmit = async (event) => {
    event.preventDefault(); //evita el comportamiento por defecto del formulario. evita que al enviar
    
    if (!isFormValid) return; 

    const {success, user} = await startRegister({
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
     
    if (success) {
    Swal.fire({
      icon: "success",
      title: `¡Bienvenido ${user?.nombre || user?.username || ""}! 🎉`,
      text: "Tu cuenta ha sido creada exitosamente.",
      showConfirmButton: false,
      timer: 4000,
      toast: true,
      position: "top-end",
    });

    setTimeout(() => navigate("/"), 1500);
  }
  }


useEffect(() => {
  if(errorMessage !== undefined) {
    Swal.fire({
      icon: "error",
      title: "Error en el registro",
      text: errorMessage,
      showConfirmButton: false,
      timer: 3000,
      toast: true,
      position: "top-end",
    });
  }
}, [errorMessage]); //se dispara el useEffect cuando cambie el errorMessage -falle el registro


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

              //Funciones
              onRegisterInputChange={onRegisterInputChange}
              registerSubmit={registerSubmit}

              //Validaciones de los campos
              onBlurField={onBlurField}

              registerNameValid={registerNameValid}
              registerLastNameValid={registerLastNameValid}
              registerUsernameValid={registerUsernameValid}
              registerEmailValid={registerEmailValid}
              registerPasswordValid={registerPasswordValid}
              registerPassword2Valid={registerPassword2Valid}
              registerPhoneValid={registerPhoneValid}
              isFormValid={isFormValid}
              touched={touched}
              //registerPhoneValid, isFormValid, touched, roles: authUser?.roles || [] 
              roles={authUser?.roles || []} // pasamos roles al form
            />

            {/* //Pasar todas las Props de Register
            <RegisterForm {...formProps} /> 
            //pasar todas las props especificamente, no todas
              {...{
                registerName, registerLastName, registerUsername,
                registerNameValid,  registerPassword2Valid,
                registerPhoneValid, isFormValid, touched,
                roles: authUser?.roles || [] // pasamos roles al form
              }}
            */}

          </div>
        </div>
      </div>
    </div>
  );
};


