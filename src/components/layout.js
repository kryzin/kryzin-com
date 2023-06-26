import React from 'react';
import Header from './header';
import Footer from "./footer";
import "../styles/style.scss";
import * as layoutStyles from "../styles/layout.module.scss";
import { motion } from 'framer-motion';

const Layout = props => {
  return (
    <div className={layoutStyles.container}>
      <div className={layoutStyles.content}>
        <Header />
        <div className={layoutStyles.mainContent}>
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
            {props.children}
          </motion.main>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout;
