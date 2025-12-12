import ecommerseApi from "../../api/ecommerseApi"

export const userService = {

    //Listar Usuarios paginados
    listarUsuarios: async (page, size ) => {
        return await ecommerseApi.get(`/usuarios/page?page=${page}&size=${size}`);
    },

    eliminarUsuario: async (id) => {
        return await ecommerseApi.delete(`/usuarios/${id}`);
    }
    
}