import { createSlice } from "@reduxjs/toolkit";

    //Estado Inicial - Cargar carrito desde localStorage, Si no existe nada en localStorage (es null), entonces usas este objeto vacio por defecto
    //Para leer objetos de LocalStorage se debe usar JSON.parse() cartData es la clave, Si cartData no existe, devuelve null
    const storedCart = JSON.parse(localStorage.getItem("cartData")) //JSON.parse() Convierte ese texto a un objeto JS
    || { 
    cart: [],
    totalItems: 0,
    totalAmount: 0,
    };

    //Función para calcular totales del carrito
    const calculateTotals = (cart) => {
        return {
            //reduce() sirve para "reducir" un array(cart) a un solo valor. 
            // cart es el array, sum es el acumulador (valor actual(inicia en 0)), 
            // item(cada producto del carrito) es el elemento actual del array, (Si hay 3 productos: sum = cantidad1 + cantidad2 + cantidad3)) 
            // el 0 es el valor inicial del acumulador(opcional)
            totalItems: cart.reduce((sum, item) => sum + item.cantidad, 0),
            totalAmount: cart.reduce((sum, item) => sum + item.precioUnitario * item.cantidad, 0),
        };
    };

    //hook controla el estado local (counter), pero Redux maneja el estado global del carrito.

export const cartSlice = createSlice({
    name: "cart", //Nombre del slice
    initialState: storedCart, //Estado inicial del slice
    
    reducers: {

        //Agregar producto al carrito
        addToCart: (state, { payload }) => {

            //Busca un producto con el mismo id que el que se está agregando.
            const exists = state.cart.find((product) => product.id === payload.id);

            //Si ya existe, incrementa la cantidad
            if(exists) {
                //Asegura que no se pase de maxCount si existe
                if (payload.maxCount !== undefined) {// Si hay un maxCount definido
                    // Asegura que no se pase del maxCount, Math.min devuelve el menor de los dos valores
                    exists.cantidad = Math.min(exists.cantidad + 1, payload.maxCount);
                } else {
                    exists.cantidad += 1; //exists.cantidad++;  Incrementa la cantidad en 1
                }
            }
            else {
                //Si no existe aun el producto en el carrito, lo agrega con cantidad 1
                state.cart.push({ ...payload, cantidad: 1});
            }
            //Recalcula totales y con Object.assign: Copia los valores devueltos por calculateTotals dentro del state
            Object.assign(state, calculateTotals(state.cart)); //Object.assign(destino, origen)

            //Guardar el objeto en LocalSorage con la clave cartData, usa JSON.stringify() para convertir el objeto a texto(string)
            localStorage.setItem("cartData", JSON.stringify(state));
        },

        //remover producto del carrito por id
        removeItem: (state, {payload}) => {

            //filter() crea un nuevo array sin el item que tenga ese id, por lo tanto lo elimina ya no estara en el carrito y asigna el nuevo array al carrito con state.cart   
            state.cart = state.cart.filter((item) => item.id !== payload);

            //Recalcula totales y con Object.assign: Copia los valores devueltos por calculateTotals dentro del state
            Object.assign(state, calculateTotals(state.cart));  //Object.assign(destino, origen)

            //Guardar el objeto en LocalSorage con la clave cartData, usa JSON.stringify() para convertir el objeto a texto(string)
            localStorage.setItem("cartData", JSON.stringify(state));    
        },

        //Incrementar cantidad de un producto en el carrito por id
        increase: (state, { payload }) => {
            //Con find() busca el producto en el carrito por id si es igual al payload (id del producto). find devuelve la referencia al objeto encontrado
            const item = state.cart.find((product) => product.id === payload);
            //if(item) item.cantidad++;  //Si existe → aumenta su cantidad en 1.
            if (item){ //Si existe → aumenta su cantidad en 1.
                item.cantidad += 1;
            }else {  //otra forma era llamar a addToCart antes de increase para que si no existe lo cree
                //si no existe el item se crea con cantidad 1
                state.cart.push({ id: payload, cantidad: 1});
            }

            Object.assign(state, calculateTotals(state.cart)); //Recalcula totales y guarda en el state
            localStorage.setItem("cartData", JSON.stringify(state)); //Guarda en localStorage
        },

        //Decrementar cantidad de un producto en el carrito por id
        decrease: (state, { payload }) => {
            //Con find() busca el producto en el carrito por id si es igual al payload (id del producto). find devuelve la referencia al objeto encontrado
            const item = state.cart.find((product) => product.id === payload);
            if (item){ //Si existe → disminuye su cantidad en 1, pero no menor a 1
                item.cantidad = Math.max( 1, item.cantidad -1 ); //Math.max recibe dos valores y devuelve el mayor por lo tanto no baja de 1
            }
            Object.assign(state, calculateTotals(state.cart)); //Recalcula totales y guarda en el state
            localStorage.setItem("cartData", JSON.stringify(state)); //Guarda en localStorage
        },

        //Vaciar el carrito
        clearCart: (state) => {
            state.cart = []; //Vacía el array del carrito
            state.totalItems = 0; //Resetea totalItems
            state.totalAmount = 0; //Resetea totalAmount
            localStorage.removeItem("cartData"); //Elimina el item del LocalStorage
        },
    }
}
);

export const { addToCart, removeItem, increase, decrease, clearCart } =
  cartSlice.actions;
