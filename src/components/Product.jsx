import {useState} from 'react'
import Modal from './Modal'

function Product({product}) {
    
    const [openModal, setOpenModal] = useState(false)
    
    return (
    <>
    <div className="product col" onClick={()=>setOpenModal(!openModal)} >
        <img src={product.image} alt="" />
        <div className="info col">
            <h5>{product.title}</h5>
            <p>{product.description}</p>
            <span>RM {product.price}</span>
        </div>
    </div>
    {openModal && <Modal closeModal={()=>setOpenModal(false)} window_width={"500px"}>
        <div className="modal_product product col">
            <img src={product.image} alt="" />
            <div className="info col">
                <h5>{product.title}</h5>
                <p>{product.description}</p>
                <span>RM {product.price}</span>
            </div>        
            
            { product.rating.rate > 3 ? <button className="btn1">Add to Cart</button> : <button className="btn1" disabled>Out of Stock</button>}
        </div>
    </Modal> }
    </>
  )
}

export default Product