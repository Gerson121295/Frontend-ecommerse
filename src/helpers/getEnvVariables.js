

export const getEnvVariables = () => {

    //importa todas las variables de entorno
    import.meta.env;

    //retorna las variables de entorno que empiezan con VITE_

    return {
        ...import.meta.env //esparse y exporta las variables de entorno
        //VITE_MODE: import.meta.env.VITE_MODE,
        //VITE_API_URL: import.meta.env.VITE_API_URL,
    }

}