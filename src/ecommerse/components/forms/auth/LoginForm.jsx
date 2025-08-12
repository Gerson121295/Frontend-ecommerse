import { Link } from "react-router-dom";


export const LoginForm = ({ loginUsername, loginPassword, onLoginInputChange, loginSubmit }) => {


  //Renderiza el formulario de login
  return (
            <form 
                onSubmit={loginSubmit}
            >
              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                  Usuario
                </label>
                <input
                  type="text"
                  className="form-control contorno-campo-morado"
                  placeholder="Usuario"

                  //Agregar data - Custom Hook useForm
                  name='loginUsername'
                  value={loginUsername}
                  onChange={onLoginInputChange} //llama a la funcion onInputChange del hook useForm
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
                  name='loginPassword'
                  value={loginPassword}
                  onChange={onLoginInputChange} //llama a la funcion onInputChange del hook useForm
                />
              </div>

              <div className="d-grid mb-3">
                <input
                  value="Iniciar Sesión"
                  type="submit"
                  className="btn fw-bold"
                  style={{ borderColor: '#6c3483', color: '#6c3483' }}
                />
                
              </div>

              {/* <div className="d-grid mb-3">
                <button
                  type="submit"
                  className="btn fw-bold"
                  style={{ borderColor: '#6c3483', color: '#6c3483' }}
                >
                  Iniciar Sesion
                </button>
              </div> */}

              <p className="text-center fw-semibold" style={{ color: '#6c3483' }}>
                Aún no tienes una cuenta?{' '}
                <Link to="/auth/register" style={{ color: '#6c3483', textDecoration: 'none' }}>
                  <b>Crear Cuenta</b> 
                </Link>
              </p>
            </form>
  );
}
