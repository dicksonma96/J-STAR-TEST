import React from 'react'
import { useAuth } from '../Context/authContext'


function MyOrder() {
    const user = useAuth();
    return(
       <div className="mycart">
         <div className="cartscroll">
            <div className="cartList">
                {user.userInfo.order.map((order,index)=>(
                     <div className="cart_item row" key={index} >
                        <img src={order.image} alt="" />
                        <div className="info col">
                            <h5>{order.title}</h5>
                            <span className='unitprice'>Unit Price: {order.price}</span>
                            <span>Ordered Units: {order.unit}</span>
                            <span>Total Price: {(order.price * order.unit).toFixed(2)}</span>
                            <div className="status">Order Status: Received</div>
                         </div>
                    </div>
                ))}

                        {!user.userInfo.order.length 
                            &&
                        <div className="empty_cart col">You have 0 order...</div>  
                        }
            </div>
        </div>
       </div>
    )
}

export default MyOrder