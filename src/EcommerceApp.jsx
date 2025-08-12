
//import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from "react-redux"
import { AppRouter } from "./router"
import { store } from "./store/store"

export const EcommerceApp = () => {
  return (
    <>
    <Provider store = {store}> {/* Se agrega el store en el punto mas alto de la App */}
      <AppRouter />
    </Provider>
    </>
  )
}

