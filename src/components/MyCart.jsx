import React,{useState} from 'react'
import { useAuth } from '../Context/authContext'


function UnitSetter({val,setCount}){
    return (
        <div className="row counter">
            <button onClick={()=>setCount(val-1)} disabled={val<=1}>-</button>
            <input type="number" value={val} readOnly/>
            <button onClick={()=>setCount(val+1)}>+</button>
        </div>
    )
}

function CartItem({product}){
    const user = useAuth();

    const setCount =(x) =>{
        let newcart = user.userInfo.cart.map((item)=>{
            if(item.id == product.id){
                item.unit = x;
            }
            return item
        })

        user.setUserInfo({
            ...user.userInfo,
            cart:[...newcart]
        })
    }

    const removeItem = () =>{
        user.setUserInfo({
            ...user.userInfo,
            cart: user.userInfo.cart.filter((prod)=>{
                return prod.id != product.id
            })
        })
    }

    return(
        <div className="cart_item row" >
                <img src={product.image} alt="" />
                <div className="info col">
                    <h5>{product.title}</h5>
                    <span className='unitprice'>Unit Price: {product.price}</span>
                    <span>Total Price: {(product.price * product.unit).toFixed(2)}</span>
                    <UnitSetter val={product.unit} setCount={setCount} />
                </div>
                <button className="remove_btn btn1" onClick={removeItem}>Remove</button>
        </div>
    )
}


function MyCart() {

    const user = useAuth();

    const getTotalPrice = () =>{
        let sum = 0;
        user.userInfo.cart.forEach((item)=>{
            sum += (item.unit * item.price)
        })
        return sum.toFixed(2);
    }

    const makeOrder = ()=>{
        user.setUserInfo({
            ...user.userInfo,
            cart:[],
            order:[...user.userInfo.order, ...user.userInfo.cart]
        })
    }

    return (
        <>
            <div className="col mycart">
                <div className="cartscroll">
                    <div className='cartList'>
                        {user.userInfo.cart.map((product,index)=>(
                            <CartItem key={index} product={product} />
                        ))}

                        {!user.userInfo.cart.length 
                            &&
                        <div className="empty_cart col">Your cart is empty...</div>  
                        }
                    </div>
                </div>
                <button className="btn1 order_btn row" 
                disabled={user.userInfo.cart.length <= 0}
                onClick={makeOrder}
                >
                Place Order
                <span>Total Price: {getTotalPrice()}</span>
                </button>
            </div>            
        </>
    
  )
}

export default MyCart