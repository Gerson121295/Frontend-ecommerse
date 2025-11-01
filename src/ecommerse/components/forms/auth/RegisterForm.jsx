import { Link } from "react-router-dom"
import { PasswordInput } from "../../../../helpers/PasswordInput"

export const RegisterForm = (
    //Desestructuracion de las props que se reciben del componente Register.jsx
    {
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
  onRegisterInputChange,
  registerSubmit,
  //recibe las props de validacion del useForm
  onBlurField,
  registerNameValid, registerLastNameValid, registerUsernameValid,
  registerEmailValid, registerPasswordValid, registerPassword2Valid,
  registerPhoneValid, isFormValid, touched, roles
}
) => {

  const isAdmin = roles.includes('ROLE_ADMIN');
  const isUser = roles.includes('ROLE_USER');

    return(
            <form
                onSubmit={registerSubmit}
            >
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                  Nombre
                </label>
                <input 
                      type="text" 
                      className={`form-control contorno-campo-morado ${
                        touched.registerName && !!registerNameValid ? "is-invalid" : ""
                      }`}
                      placeholder="Nombre"
                      
                      //Agregar data - Custom Hook useForm
                      name='registerName'
                      value={registerName}
                      onChange={onRegisterInputChange} //llama a la funcion onInputChange del hook useForm
                      onBlur={onBlurField} //llama a la funcion onBlurField del hook useForm
                />
                    <div className="invalid-feedback">
                      {touched.registerName && registerNameValid}
                    </div>
              </div>

              <div className="mb-3">
                <label htmlFor="apellido" className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                  Apellido
                </label>
                <input 
                      type="text"  
                       className={`form-control contorno-campo-morado ${
                        touched.registerLastName && !!registerLastNameValid ? "is-invalid" : ""
                      }`}
                      placeholder="Ingrese su apellido" 
                
                      //Agregar data - Custom Hook useForm
                      name='registerLastName' 
                      value={registerLastName}
                      onChange={onRegisterInputChange} //llama a la funcion onInputChange del
                       onBlur={onBlurField}
                />
                 <div className="invalid-feedback">
                  {touched.registerLastName && registerLastNameValid}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                  Username
                </label>
                <input 
                      type="text" 
                      className={`form-control contorno-campo-morado ${
                        touched.registerUsername && !!registerUsernameValid ? "is-invalid" : ""
                      }`}
                      placeholder="Nombre de usuario" 
                
                      //Agregar data - Custom Hook useForm
                      name='registerUsername'
                      value={registerUsername}  
                      onChange={onRegisterInputChange} //llama a la funcion onInputChange del hook useForm
                      onBlur={onBlurField}
                />
                  <div className="invalid-feedback">
                    {touched.registerUsername && registerUsernameValid}
                  </div>
              </div>

               <div className="mb-3">
                <label htmlFor="telefono" className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                  Telefono
                </label>
                <input 
                      type="number" 
                      className={`form-control contorno-campo-morado ${
                        touched.registerPhone && !!registerPhoneValid ? "is-invalid" : ""
                      }`}
                      placeholder="42521268" 
                
                      //Agregar data - Custom Hook useForm
                      name='registerPhone'
                      value={registerPhone}  
                      onChange={onRegisterInputChange} //llama a la funcion onInputChange del hook useForm
                      onBlur={onBlurField}
                />
                  <div className="invalid-feedback">
                    {touched.registerPhone && registerPhoneValid}
                  </div>
              </div>

              <div className="mb-3">
                <label htmlFor="correo" className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                  Correo
                </label>
                <input 
                      type="email"
                      className={`form-control contorno-campo-morado ${
                        touched.registerEmail && !!registerEmailValid ? "is-invalid" : ""
                      }`}
                      placeholder="correo@ejemplo.com" 
                
                      //Agregar data - Custom Hook useForm
                      name='registerEmail'  
                      value={registerEmail}
                      onChange={onRegisterInputChange} //llama a la funcion onInputChange del
                      onBlur={onBlurField}
                />
                  <div className="invalid-feedback">
                    {touched.registerEmail && registerEmailValid}
                  </div>
              </div>

              {/* Password */}
                <PasswordInput
                  label="Contraseña"
                  name="registerPassword"
                  value={registerPassword}
                  onChange={onRegisterInputChange}
                  onBlur={onBlurField}
                  error={registerPasswordValid}
                  touched={touched.registerPassword}
                />

                {/* Confirmar password */}
                <PasswordInput
                  label="Repita la contraseña"
                  name="registerPassword2"
                  value={registerPassword2}
                  onChange={onRegisterInputChange}
                  onBlur={onBlurField}
                  error={registerPassword2Valid}
                  touched={touched.registerPassword2}
                />

        <div className="mb-4">
          {isUser && (
            <label className="form-label fw-semibold text-morado">Role: </label>
          )}
        
          {isAdmin && (
            <label className="form-label fw-semibold text-morado">Asignar Roles</label>
          )}
          
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="checkbox"
            name="registerUser" 
            /* checked={registerUser}  
            /* onChange={onRegisterInputChange}  */
            checked={true} //Siempre true por defecto
            readOnly
          />
          <label className="form-check-label">Usuario</label>
        </div>

        {isAdmin && (
          <>
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="checkbox"
            name="registerAdmin" 
            checked={registerAdmin} 
            onChange={onRegisterInputChange} 
          />
          <label className="form-check-label">Administrador</label>
        </div>

        <div className="form-check">
          <input 
            className="form-check-input" 
            type="checkbox"
            name="registerAssistant" 
            checked={registerAssistant} 
            onChange={onRegisterInputChange} 
          />
          <label className="form-check-label">Asistente</label>
        </div>
          </>
        )}
      </div>

          {/* Boton Submit */}
      <div className="d-grid mb-3">
        <input 
          type="submit" 
          className="btn btn-morado"
          value="Crear Cuenta"
          disabled={!isFormValid}
        />
      </div>

              <p className="text-center fw-semibold" style={{ color: '#6c3483' }}>
                ¿Ya tienes una cuenta? 
                <Link to="/auth/login" style={{ color: '#6c3483', textDecoration: 'none' }}>
                  <b>  Iniciar Sesion</b> 
                </Link>
              </p>
            </form>
    )
}

