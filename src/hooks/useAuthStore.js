import { useDispatch, useSelector } from "react-redux"

import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import ecommerseApi from "../../api/ecommerseApi";


export const useAuthStore = () => {

    //useSelector extrae data del store. (estados del auth)
    const {status, user, errorMessage} = useSelector(state => state.auth);

    //dispatch es una funcion que permite enviar acciones al store para que se actualice el estado. 
    const dispatch = useDispatch(); //Despachará las funciones del store -> Slice

    //Realiza el proceso de login del usuario
    const startLogin = async ({username, password}) => { //usando destructuring para extraer username y password que se envian al hacer login
        
        //verificando autenticación
        dispatch(onChecking()); //Cambia el estado a checking

        try {
 
            //const resp = await ecommerseApi.post('/auth', { username, password });
            const { data } = await ecommerseApi.post('/auth', { username, password }); //extrae data de resp

            const token = data.token;
            if (!token) throw new Error('Token no recibido');

            //Guarda el token en el localStorage, usa la palabra 'token' para identificarlo
            localStorage.setItem('token', data.token);

            //guarda en el local storage la hora en que inicio el token del User la palabra clave es: 'token-init-date'
            localStorage.setItem('token-init-date', new Date().getTime());
           
            //hace el login(cambia state a 'authenticated') despacha por medio del store la funcion onLogin de authSlice 
            //dispatch(onLogin({name: data.name, uid: data.uid}));
            dispatch(onLogin({ name: data.username }));

            //Devuelve respuesta de éxito
            return { success: true, username: data.username };
        
        }catch(err) {
            //Si hay un error en la peticion, despacha la funcion onLogout del authSlice
            //console.log({err})
            dispatch(onLogout('Credenciales incorrectas'));
           
            //Se ejecuta en 10miliseg Limpia el error si falla el login se hace el logout y procede a eliminar el mensaje de error
            setTimeout(() => {
                dispatch(clearErrorMessage()); //func. clearErrorMessage borra el mensaje de error
            }, 10)
            
            throw new Error(err.response.data?.msg || 'Login fallido'); //lanza un error con el mensaje de error del backend o un mensaje por defecto
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
        user,
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
                user,               
            }); //Con {} extrae data de resp

            //Guarda el token en el localStorage, usa la palabra 'token' para identificarlo
            localStorage.setItem('token', data.token);
            console.log('Token guardado StartRegister:--> ', data.token);
            //console.log('Usuario registrado: ', data);

            //guarda en el local storage la hora en que inicio el token del User la palabra clave es: 'token-init-date'
            localStorage.setItem('token-init-date', new Date().getTime());

            //hace el login(cambia state a 'authenticated') despacha por medio del store la funcion onLogin de authSlice 
            //dispatch(onLogin({ name: data.username }));
            dispatch(onLogin({
                //data que se guarda en el store
                username: data.username,
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email,
                telefono: data.telefono,
                roles: data.roles, //roles del usuario
                token: data.token //token del usuario
            }));


            //return { success: true, username: data.username };

        } catch (error) {
            console.log(error);
            dispatch(onLogout('Error al registrar usuario'));
            
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10)

            throw new Error(error.response.data?.msg || 'Registro fallido');
        }
    }



    //Verificar la autenticacion del token del User
    const checkAuthToken = async() => {

        //recupero el token del usuario guardado en el localStorage palabra clave 'token'
        const token = localStorage.getItem('token');

        //si es diferente de token(no existe token o ya vencio) hace logout
        console.log('1ra. Verificacion de token en checkout-si no hay hace logout ...'+ token);
        if( !token ) return dispatch(onLogout() ); 

        try {

            //Si hay un token, hace peticion para renevoar el token y extrae data de resp que almacena el nuevo token
            const { data } = await ecommerseApi.get('/auth/renew');
            //console.log({data})

             console.log('2ra. Verificacion de token en checkout-si hay hace realiza peticion a renew y guarda en localstorage ...'+ token);

            //Establece el nuevo token renovado al localStorage la palabra clave es: 'token'
            localStorage.setItem('token', data.token);
            //guarda en el local storage la fecha en que inicio el token del User la palabra clave es: 'token-init-date'
            localStorage.setItem('token-init-date', new Date().getTime());
            
            //hace el login(cambia state a 'authenticated') despacha por medio del store la funcion onLogin de authSlice 
            //dispatch( onLogin({ name: data.name, uid: null }) ); 
             dispatch(onLogin({
                //data que se guarda en el store
                username: data.username,
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email,
                telefono: data.telefono,
                roles: data.roles, //roles del usuario
                token: data.token //token del usuario
            }));

            //localStorage.setItem('token', data.token)

        } catch (error) {
            //si sale mal la renovacion del token 
            //limpia el localStorage
            localStorage.clear();
            //No hace el login hace el logout
            dispatch( onLogout() ); 
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

        //*Metodos
        startLogin, //funcion que inicia el login del usuario
        startRegister,
        checkAuthToken, //funcion que verifica el token del usuario
        startLogout //funcion que inicia el logout del usuario
        
    }

}
