import { Outlet, useNavigation } from "react-router-dom"
import Header from "./Header"
import CartOverview from "../features/cart/CartOverview"
import Loader from "./Loader"

function AppLayout() {
  const navigation = useNavigation()
  const isLoading = navigation.state == 'loading';

  return (
    <div  className="grid grid-rows-[auto_1fr_auto] h-screen relative">
      {isLoading && <Loader/>}
        <Header/>
        <div  className="overflow-auto">
        <main>
          <Outlet/>
        </main>
        </div>
        <CartOverview/>
    </div>
  )
}

export default AppLayout
