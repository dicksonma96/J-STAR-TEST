import {useState} from 'react'
import Modal from './Modal'
import { useAuth } from '../Context/authContext'

function Product({product}) {
    
    const [openModal, setOpenModal] = useState(false);
    const auth = useAuth();
    
    const addToCart = () =>{
        if(auth.userInfo != null){
            auth.setUserInfo({
                ...auth.userInfo,
                cart:[...auth.userInfo.cart, {...product,unit:1}]
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