import { useDispatch, useSelector } from "react-redux"

import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import ecommerseApi from "../../api/ecommerseApi";
import { decodeToken } from "../helpers/decodeToken";



export const useAuthStore = () => {

    //useSelector extrae data del store. (estados del auth)
    const {status, user, errorMessage, isAdmin, isAssistant, isUser} = useSelector(state => state.auth);

    //dispatch es una funcion que permite enviar acciones al store para que se actualice el estado. 
    const dispatch = useDispatch(); //Despachará las funciones del store -> Slice

    //Realiza el proceso de login del usuario
    const startLogin = async ({username, password}) => { //usando destructuring para extraer username y password que se envian al hacer login
        
        //verificando autenticación
        dispatch(onChecking()); //Cambia el estado a checking

        try {
 
            //const resp = await ecommerseApi.post('/auth', { username, password });
            const { data } = await ecommerseApi.post('/auth', { username, password }); //extrae data de resp

            const token = data?.token;
            if (!token) {
                dispatch(onLogout('Token no recibido'));
                return { success: false, error: 'Token no recibido' };
            }

            //Guarda el token en el localStorage, usa la palabra 'token' para identificarlo
            localStorage.setItem('token', token);

            //guarda en el local storage la hora en que inicio el token del User la palabra clave es: 'token-init-date'
            localStorage.setItem('token-init-date', new Date().getTime());
           
            //Decodifica el token para extraer la info del usuario
            const decoded = decodeToken(token) || {};

            //hace el login(cambia state a 'authenticated') despacha por medio del store la funcion onLogin de authSlice 
            //dispatch(onLogin({name: data.name, uid: data.uid}));
    
            const payload = {
                username: decoded.username || data.username || username,
                roles: Array.isArray(data.roles) && data.roles.length ? data.roles : (decoded.roles || []),
                token,
                nombre: data.nombre || decoded.nombre || undefined,
                apellido: data.apellido || decoded.apellido || undefined,
                email: data.email || decoded.email || undefined,
                telefono: data.telefono || decoded.telefono || undefined,
            };

         /*    dispatch(onLogin({
                //data que se guarda en el store
                username: decoded.username || data.username || username,
                roles: decoded.roles || [],
                token,
                //isAdmin: isAdmin,
                //isAssistant: isAssistant,
                //isUser: isUser, 
            })); */

            dispatch(onLogin(payload));
            return { success: true, user: payload };
            
        }catch(err) {
            //Si hay un error en la peticion, despacha la funcion onLogout del authSlice
            // console.error('startRegister error:', err);
             const message = err.response?.data?.msg || err.response?.data?.message || err.message || 'Login fallido';
            dispatch(onLogout(message));
            //dispatch(onLogout('Credenciales incorrectas'));
           
            //Se ejecuta en 10miliseg Limpia el error si falla el login se hace el logout y procede a eliminar el mensaje de error
            setTimeout(() => {
                dispatch(clearErrorMessage()); //func. clearErrorMessage borra el mensaje de error
            }, 10)
            
            //throw new Error(err.response.data?.msg || 'Login fallido'); //lanza un error con el mensaje de error del backend o un mensaje por defecto
            return { success: false, error: message };
        }
}

    //Empieza proceso de registro del usuario
    const startRegister = async({
        nombre,
        apellido,
        username,
        email,
        password,
        telefono,
        admin,
        assistant,
        user:isUserFlag,
    }) => {

        //verificando autenticación
        dispatch(onChecking()); //Cambia el estado a checking

        try {
            //const resp = await ecommerseApi.post('/auth', { email, password });
            const { data } = await ecommerseApi.post('/usuarios', {  //extrae data de resp
                nombre,
                apellido,
                username,
                email,
                password,
                telefono,
                admin,
                assistant,
                user:isUserFlag,               
            }); //Con {} extrae data de resp

            const token = data?.token;
            if (!token) {
                dispatch(onLogout('Token no recibido al registrar'));
                return { success: false, error: 'Token no recibido al registrar' };
            }

            //Guarda el token en el localStorage, usa la palabra 'token' para identificarlo
            localStorage.setItem('token', token);
     
            //guarda en el local storage la hora en que inicio el token del User la palabra clave es: 'token-init-date'
            localStorage.setItem('token-init-date', new Date().getTime());

             // Preferimos roles que venga del backend, si no, lo sacamos del token:
            //Decodifica el token para extraer la info del usuario
            const decoded = decodeToken(token) || {};
            const roles = Array.isArray(data.roles) && data.roles.length ? data.roles : (decoded.roles || []);

            //hace el login(cambia state a 'authenticated') despacha por medio del store la funcion onLogin de authSlice 
            //dispatch(onLogin({ name: data.username }));
           /*  dispatch(onLogin({
                //data que se guarda en el store
                username: data.username || decoded.username || username,
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email,
                telefono: data.telefono,
                roles,
                token,
                //isAdmin: isAdmin,
                //isAssistant: isAssistant,
                //isUser: isUser, 
            })); */

            const payload = {
                username: data.username || decoded.username || username,
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email,
                telefono: data.telefono,
                roles,
                token,
                };

                dispatch(onLogin(payload));
                return { success: true, user: payload };

        } catch (error) {
            console.error('startRegister error:', error);
            const message = error.response?.data?.msg || error.message || 'Registro fallido';
            dispatch(onLogout(message));
            setTimeout(() => dispatch(clearErrorMessage()), 3000);
            return { success: false, error: message };
            
            //dispatch(onLogout('Error al registrar usuario'));
            /* dispatch(onLogout(error.response?.data?.msg || 'Error al registrar usuario'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10)
            throw new Error(error.response.data?.msg || 'Registro fallido'); */
            
        }
    }



    //Verificar la autenticacion del token del User
    const checkAuthToken = async() => {

        //recupero el token del usuario guardado en el localStorage palabra clave 'token'
        const token = localStorage.getItem('token');

        //si es diferente de token(no existe token o ya vencio) hace logout
        if( !token ) return dispatch(onLogout() ); 

        try {

            //Si hay un token, hace peticion para renevoar el token y extrae data de resp que almacena el nuevo token
            const { data } = await ecommerseApi.get('/auth/renew');
            //console.log({data})

            const newToken = data?.token;
            if (!newToken) {
                dispatch(onLogout());
                return false;
            }

            //Establece el nuevo token renovado al localStorage la palabra clave es: 'token'
            localStorage.setItem('token', newToken);
            //guarda en el local storage la fecha en que inicio el token del User la palabra clave es: 'token-init-date'
            localStorage.setItem('token-init-date', new Date().getTime());
            
            //Decodifica el token para extraer la info del usuario
            const decoded = decodeToken(newToken);
            //console.log('Decoded Token: ', decoded);

            //Extrae los roles del usuario del token decodificado
            //const { isAdmin, isAssistant, isUser } = decoded;
                  
            if (!decoded) return dispatch(onLogout());

            //hace el login(cambia state a 'authenticated') despacha por medio del store la funcion onLogin de authSlice 
            //dispatch( onLogin({ name: data.name, uid: null }) ); 
             dispatch(onLogin({
                //data que se guarda en el store
                username: decoded.username || data.username,
                roles: decoded.roles || data.roles || [],
                token: newToken,
                //isAdmin: isAdmin,
                //isAssistant: isAssistant,
                //isUser: isUser, 
            }));

            return true;
        } catch (error) {
            //si sale mal la renovacion del token 
             console.error('checkAuthToken error:', error);
            //limpia el localStorage
            localStorage.clear();
            //No hace el login hace el logout
            dispatch( onLogout() ); 
            return false;
        }
    }

      //Empieza proceso de logout - Borrar data(token) guardada en el localStorage
    const startLogout = () => {
        localStorage.clear(); //limpia el localStorage
        dispatch(onLogout()); //despacha la funcion onLogout del authSlice. //limpia los estados de auth al hacer logout
        //dispatch(onLogoutEcommerse()); //limpia los estados de ecommerse al hacer logout
    }

//Funciones y propiedades que retorna el hook useAuthStore
    return{
        //*Propiedades
        status, //status del auth (checking, authenticated, not-authenticated)
        user, //user del auth (nombre y uid)
        errorMessage, //mensaje de error del auth
        /* isAdmin,
        isAssistant,
        isUser, */

        //*Metodos
        startLogin, //funcion que inicia el login del usuario
        startRegister,
        checkAuthToken, //funcion que verifica el token del usuario
        startLogout //funcion que inicia el logout del usuario
        
    }

}
