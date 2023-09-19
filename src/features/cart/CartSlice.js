import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart :[]
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addItem(state,action) {
            state.cart.push(action.payload)
        },
        deleteItem(state,action) {
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload)
        },
        increaseQuantity(state,action) {
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity ++;
            item.totalPrice = item.unitPrice * item.quantity
        },
        decreaseQuantity(state,action) {
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity --;
            item.totalPrice = item.unitPrice * item.quantity;

            if(item.quantity == 0) {
                cartSlice.caseReducers.deleteItem(state,action)
            }
        },
        clearCart(state) {
            state.cart = []
        }
    }
})

export const {addItem,deleteItem,increaseQuantity,decreaseQuantity,clearCart} = cartSlice.actions

export const getCart = state => state.cart.cart;

export const getTotalPrice  = state => state.cart.cart.reduce((sum,cur) => sum+cur.totalPrice ,0)

export const getTotalQuantity = state => state.cart.cart.reduce((sum,cur) => sum+cur.quantity ,0)

export const getQuantityById = (id) => state=>state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0

export default cartSlice.reducer;