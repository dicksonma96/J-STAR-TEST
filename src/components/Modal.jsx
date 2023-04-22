import React from 'react'

function Modal({children, closeModal, window_width}) {
  return (
    <div className='modal_overlay' onClick={()=>closeModal()}>
        <div className="modal" onClick={(e)=>e.stopPropagation()} style={{maxWidth:window_width}}>
            <div className="close_btn" onClick={()=>closeModal()}>Close &#10006;</div>
            {children}
        </div>
    </div>
  )
}

export default Modal