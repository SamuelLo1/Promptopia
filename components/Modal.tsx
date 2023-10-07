import React from 'react'
import ReactDom from 'react-dom'
import { motion } from 'framer-motion';


const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 111,
}

const OVERLAY = {
    position: 'fixed',
    top: 0,
    left: 0, 
    right: 0, 
    bottom: 0, 
    backgroundColor: 'rgba(0,0,0, .7)', 
    zIndex: 100
}

export default function Modal({ open, children, onClose}) {
    //using portals allows the modal to process event delegation
    // Ex) can console.log(when clicked inside) 
    if (!open) return null
    return ReactDom.createPortal(
      <div style = {OVERLAY} onClick={onClose}>
        {open && (
            <motion.div Layout className ='card'>
                <div style={MODAL_STYLES}>

                    
                {children} 
                </div>
            </motion.div>
        )}
    
      </div>, 
      document.getElementById('portal')
    )
}