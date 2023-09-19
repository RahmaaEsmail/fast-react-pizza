import { useDispatch, useSelector } from "react-redux"
import Button from "../../ui/Button"
import LinkButton from "../../ui/LinkButton"
import { clearCart, getCart } from "./CartSlice"
import CartItem from "./CartItem"
import { getUserName } from "../user/UserSlice"
import EmptyCart from "./EmptyCart"

function Cart() {
    const dispatch = useDispatch()
    const cart = useSelector(getCart)
    const userName = useSelector(getUserName)


    if(cart.length === 0) {
      return <EmptyCart/>
    }

    return (
        <div className='px-4 py-3'>
        <LinkButton to="/menu"
        
         >&larr; Back to menu</LinkButton>
  
        <h2 className='mt-7 font-semibold text-xl'>Your cart, {userName} </h2>
  
        <ul className='divide-y divide-stone-200 border-b mt-3'>
          {cart.map(item=><CartItem item={item} key={item.pizzaId}/>)}
        </ul>
  
        <div className='mt-6 space-x-2'>
          <Button to="/order/new" type="primary">Order pizzas</Button>
          <Button type="secondary" onClick={()=>dispatch(clearCart())}>Clear cart</Button>
        </div>
      </div>
    )
}

export default Cart
