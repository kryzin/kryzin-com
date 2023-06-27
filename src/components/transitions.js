import React from 'react';
import "../styles/style.scss";
import { motion } from 'framer-motion';

const Transition = ({ children }) => {
  return (
    <div>
        <motion.main
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{
                type: "spring",
                mass: 0.35,
                stiffness: 75,
                duration: 0.5
            }}
        >
        {children}
        </motion.main>
    </div>
  )
}

export default Transition;
