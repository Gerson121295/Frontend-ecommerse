import { Link } from "react-router-dom";

import { PasswordInput } from "../../../../helpers/PasswordInput";

export const LoginForm = ({ 
  loginUsername, loginPassword, onLoginInputChange, loginSubmit,
  onBlurField, loginUsernameValid, loginPasswordValid, isFormValid, touched
  }) => {

     //const [showPassword, setShowPassword] = useState(false);

  //Renderiza el formulario de login
  return (
            <form 
                onSubmit={loginSubmit}
            >
              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-semibold text-morado">
                  Usuario 
                </label>
                <input
                  type="text"
                  className={`form-control contorno-campo-morado ${
                  touched.loginUsername && !!loginUsernameValid ? "is-invalid" : ""
                }`}
                  placeholder="Usuario"

                  //Agregar data - Custom Hook useForm
                  name='loginUsername'
                  value={loginUsername}
                  onChange={onLoginInputChange} //llama a la funcion onInputChange del hook useForm
                  onBlur={onBlurField} //llama a la funcion onBlurField del hook useForm
                />
                <div className="invalid-feedback">
                  {touched.loginUsername && !!loginUsernameValid ? loginUsernameValid : ""}
                </div>
              </div>

{/*               <div className="mb-4 position-relative">
                <label className="form-label fw-semibold text-morado">
                 Contraseña
                </label>
   
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control contorno-campo-morado ${
                  touched.loginPassword && !!loginPasswordValid ? "is-invalid" : ""
                  }`}
                  placeholder="***********"

                  //Agregar data - Custom Hook useForm
                  name='loginPassword'
                  value={loginPassword}
                  onChange={onLoginInputChange} //llama a la funcion onInputChange del hook useForm
                  onBlur={onBlurField}
                />
                
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
               
                <div className="invalid-feedback">
                  {touched.loginPassword && !!loginPasswordValid ? loginPasswordValid : ""}
                </div>
              </div> */}
     
                <PasswordInput
                  label="Contraseña"
                  name="loginPassword"
                  value={loginPassword}
                  onChange={onLoginInputChange}
                  onBlur={onBlurField}
                  error={loginPasswordValid}
                  touched={touched.loginPassword}
                />

              <div className="d-grid mb-3">
                <input
                  value="Iniciar Sesión"
                  type="submit"
                  className="btn fw-bold"
                  style={{ borderColor: '#6c3483', color: '#6c3483' }}
                  disabled={!isFormValid} //deshabilita el boton si el formulario no es valido
                />
                
              </div>

              <p className="text-center fw-semibold text-morado">
                Aún no tienes una cuenta?{' '}
                <Link to="/auth/register" className="link-morado">
                  <b>Crear Cuenta</b> 
                </Link>
              </p>
            </form>
  );
}
