import { Link } from "react-router-dom"
import SearchOrder from "../features/order/SearchOrder"
import UserName from "../features/user/UserName"

function Header() {

    return (
        <header className="bg-yellow-400 flex gap-4 justify-center sm:justify-between items-center px-4 py-3 sm:px-6 sm:py-4 border-b border-stone-200 flex-wrap ">
            <Link to="/" className="tracking-widest">FAST REACT PIAZZA CO.</Link>
            <SearchOrder/>
            <UserName/>
        </header>
    )
}

export default Header
