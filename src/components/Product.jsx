import {useState} from 'react'
import Modal from './Modal'
import { useAuth } from '../Context/authContext'

function Product({product}) {
    
    const [openModal, setOpenModal] = useState(false);
    const auth = useAuth();
    
    const addToCart = () =>{
        if(auth.userInfo != null){
            let new_cart = auth.userInfo.cart.map(item=>{
                if(product.id == item.id){
                   item.unit += 1
                }
                return  item
            })

            if(!new_cart.some(item=> item.id == product.id)){
                new_cart.push({...product, unit:1})
            }

            auth.setUserInfo({
                ...auth.userInfo,
                cart:[...new_cart]
            })
        }
        else{
            auth.setShowLogin(true)
        }
        setOpenModal(false);
    }
  

    return (
    <>
    <div className="product col" onClick={()=>setOpenModal(!openModal)} >
        <em>{product.category}</em>
        <img src={product.image} alt="" />
        <div className="info col">
            <h5>{product.title}</h5>
            <p>{product.description}</p>
            <span>RM {product.price}</span>
        </div>
    </div>
    {openModal && <Modal closeModal={()=>setOpenModal(false)} window_width={"500px"}>
        <div className="modal_product product col">
            <em>{product.category}</em>
            <img src={product.image} alt="" />
            <div className="info col">
                <h5>{product.title}</h5>
                <p>{product.description}</p>
                <span>RM {product.price}</span>
            </div>        
            
            { product.rating.rate > 3 ? <button onClick={addToCart} className="btn1" >Add to Cart</button> : <button className="btn1" disabled>Out of Stock</button>}
        </div>
    </Modal> }
    </>
  )
}

export default Product