import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import * as headerStyles from '../styles/header.module.scss'

const LanguageMenu = () => {
  const { i18n } = useTranslation()
  
  const [values, setValues] = useState({
    language: 'en'
  });

  function handleChange(event) {
    i18n.changeLanguage(event.target.value)

    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div>
      <button value={'pl'} onClick={handleChange} className={headerStyles.langmen}>Polski</button>
      <button value={'en'} onClick={handleChange}>English</button>
    </div>
  );
}

export default LanguageMenu;