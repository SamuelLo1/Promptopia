import React from 'react'
import ReactDom from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 111,
    width: '70%', // Set the width to 80% of the viewport width
    maxHeight: '80%', // Set the maximum height to 80% of the viewport height
    overflow: 'auto'
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

export default function Modal({ open, children, onClose }) {
    if (!open) return null;
  
    return ReactDom.createPortal(
      <AnimatePresence>
        {open && (
         
        <div style={OVERLAY}>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
             >
              <motion.div layout style={MODAL_STYLES} className="font-medium leading-6 text-base font-inter rounded-md  shadow-2xl">
                <div className="flex image-hover group justify-end relative" onClick={onClose}>
                    <Image
                        src="/assets 2/icons/exitFilled.svg"
                        width={40}
                        height={40}
                        alt="exit"
                        className="default-image"
                    />
                    <Image
                        src="/assets 2/icons/exit.svg" // Change this to the hover image source
                        width={40}
                        height={40}
                        alt="exit"
                        className="hover-image"
                    />       
                    
                </div>
                {children}
              </motion.div>
            </motion.div>
        </div>
         
        )}
      </AnimatePresence>,
      document.getElementById('portal')
    );
  }

