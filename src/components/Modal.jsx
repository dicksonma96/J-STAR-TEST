import React from 'react'

function Modal({children, closeModal, window_width}) {
  return (
    <div className='modal_overlay' onClick={()=>closeModal()}>
        <div className="modal" onClick={(e)=>e.stopPropagation()} style={{maxWidth:window_width}}>
            {children}
        </div>
    </div>
  )
}

export default Modal