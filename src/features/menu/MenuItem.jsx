import { useDispatch, useSelector } from "react-redux";
import { formatCurreny } from "../../utils/Helper"
import Button from './../../ui/Button';
import { addItem, getQuantityById } from "../cart/CartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateQuantityItem from "../cart/UpdateQuantityItem";


/* eslint-disable react/prop-types */
function MenuItem({item}) {
    const {
        id,
        imageUrl,
        ingredients,
        name,
        soldOut,
        unitPrice
    } = item;

    const dispatch = useDispatch()
    const currentQuantity = useSelector(getQuantityById(id))
    const isInCart = currentQuantity >0;

    function handleAddItem() {
        const newItem  = {
            pizzaId : id, 
            quantity:1,
            unitPrice,
            name,
            totalPrice : unitPrice * 1
        }
        dispatch(addItem(newItem))
        
    }
     
    return (
        <li className="flex flex-col sm:flex-row gap-4 py-2">
            <img src={imageUrl} alt={name} className={`h-52 sm:h-28 ${soldOut ? 'opacity-70 grayscale':''}`}/>

            <div className="flex flex-col grow pt-0.5">
                <p className="font-medium">{name}</p>
                <p className="italic text-slate-500 text-sm  capitalize">{ingredients.join(', ')}</p>

            <div className="mt-7 flex justify-between items-center">
                    {soldOut ? 'Sold Out' : <p className="text-sm font-medium uppercase text-stone-500">{formatCurreny(unitPrice)}</p>}
                    {!soldOut && !isInCart  && <Button type="small" onClick={handleAddItem}>Add To Cart</Button>}
                 
                    {isInCart && 
                    <div className="flex gap-4">
                       <UpdateQuantityItem  pizzaId={id} currentQuantity={currentQuantity}/>
                       <DeleteItem pizzaId={id}/>
                    </div> 
                     }
            </div>

            </div>
        </li>
    )
}

export default MenuItem
