
import axios from "axios";
import { getEnvVariables } from "../src/helpers/getEnvVariables";


//extrae la ruta principal para las peticions desde .env  variables de entorno
const { VITE_API_URL } = getEnvVariables();

const ecommerseApi = axios.create({
    baseURL: VITE_API_URL
});


// Configurar interceptores: interceptan las peticiones que van al backend o las que regresan

//interceptor de peticiones
ecommerseApi.interceptors.request.use(config => { //config es el objeto de la peticion que se va a enviar al backend

    //Configura el header para cualquier peticion(GET,PUT,POST,DELETE) definida como: 'x-token' y se le envia de value: el token guardado en el localStorage
    //esto para validar que el usuario esta autenticado
    
    /* -- Config para backends Node.js/Express 
     config.headers = {
        ...config.headers, // esparce todos los headers que viene en la config
        'x-token': localStorage.getItem('token') // obtiene el token del localStorage
    } 
    */
    //Config para Backend Java Spring Boot Spring Security
    const token = localStorage.getItem('token');
        if (token) {
            config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
        } 
}

    return config; //retorna la config para que se envie al backend

    //interceptor de respuestas si hay un error en la peticion
}, (error) => {
    return Promise.reject(error); //retorna el error si no se puede enviar la peticion

})

//exporta la funcion
export default ecommerseApi;