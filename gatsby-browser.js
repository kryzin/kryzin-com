/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */
import React from 'react';
import {AnimatePresence} from 'framer-motion';
import "@popperjs/core/dist/umd/popper.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";


export const wrapPageElement = ({element}) => (
  <AnimatePresence mode='wait'>{element}</AnimatePresence>
);

require("prismjs/themes/prism-tomorrow.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

