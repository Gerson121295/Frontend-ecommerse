import { Link } from "react-router-dom"

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
  registerSubmit
}
) => {

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
                      className="form-control contorno-campo-morado" 
                      placeholder="Nombre"
                      
                      //Agregar data - Custom Hook useForm
                      name='registerName'
                      value={registerName}
                      onChange={onRegisterInputChange} //llama a la funcion onInputChange del hook useForm
                />
              </div>

              <div className="mb-3">
                <label htmlFor="apellido" className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                  Apellido
                </label>
                <input 
                      type="text"  
                      className="form-control contorno-campo-morado" 
                      placeholder="Ingrese su apellido" 
                
                      //Agregar data - Custom Hook useForm
                      name='registerLastName' 
                      value={registerLastName}
                      onChange={onRegisterInputChange} //llama a la funcion onInputChange del
                />
              </div>

              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                  Username
                </label>
                <input 
                      type="text" 
                      className="form-control contorno-campo-morado" 
                      placeholder="Nombre de usuario" 
                
                      //Agregar data - Custom Hook useForm
                      name='registerUsername'
                      value={registerUsername}  
                      onChange={onRegisterInputChange} //llama a la funcion onInputChange del hook useForm
                />
              </div>

               <div className="mb-3">
                <label htmlFor="telefono" className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                  Telefono
                </label>
                <input 
                      type="number" 
                      className="form-control contorno-campo-morado" 
                      placeholder="42521268" 
                
                      //Agregar data - Custom Hook useForm
                      name='registerPhone'
                      value={registerPhone}  
                      onChange={onRegisterInputChange} //llama a la funcion onInputChange del hook useForm
                />
              </div>

              <div className="mb-3">
                <label htmlFor="correo" className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                  Correo
                </label>
                <input 
                      type="email"
                      className="form-control contorno-campo-morado" 
                      placeholder="correo@ejemplo.com" 
                
                      //Agregar data - Custom Hook useForm
                      name='registerEmail'  
                      value={registerEmail}
                      onChange={onRegisterInputChange} //llama a la funcion onInputChange del
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                  Contraseña
                </label>
                <input 
                      type="password"
                      className="form-control contorno-campo-morado" 
                      placeholder="***********" 
                      
                      //Agregar data - Custom Hook useForm
                      name='registerPassword'
                      value={registerPassword}  
                      onChange={onRegisterInputChange} //llama a la funcion onInputChange del hook useForm      
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password2" className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                  Repita la Contraseña
                </label>
                <input 
                      type="password"
                      className="form-control contorno-campo-morado" 
                      placeholder="***********" 
                      
                      //Agregar data - Custom Hook useForm
                      name='registerPassword2'
                      value={registerPassword2}  
                      onChange={onRegisterInputChange} //llama a la funcion onInputChange del hook useForm      
                />
              </div>

                <div className="mb-4">
                <label className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                  Asignar Roles
                </label>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="registerAdmin"
                    checked={registerAdmin}
                    onChange={onRegisterInputChange}
                  />
                  <label className="form-check-label">
                    Administrador
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="registerAssistant"
                    checked={registerAssistant}
                    onChange={onRegisterInputChange}
                  />
                  <label className="form-check-label">
                    Asistente
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="registerUser"
                    checked={registerUser}
                    onChange={onRegisterInputChange}
                  />
                  <label className="form-check-label">
                    Usuario
                  </label>
                </div>
              </div>


              <div className="d-grid mb-3">
                <input 
                      type="submit" 
                      className="btn btn-morado"
                      value="Crear Cuenta"
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

