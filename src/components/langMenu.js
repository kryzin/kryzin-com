import React, { useState } from "react"
import Select from '@mui/material'
import MenuItem from '@mui/material'
import { useTranslation } from "react-i18next"

const LanguageMenu = () => {
  const { t, i18n } = useTranslation()
  
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
      <button value={'pl'} onClick={handleChange}>Polski</button>
      <button value={'en'} onClick={handleChange}>English</button>
    </div>
  );
}

export default LanguageMenu;