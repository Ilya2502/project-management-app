import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';

const SelectLang = () => {
  const [lang, setLang] = React.useState('EN');

  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value as string);
    changeLanguage(event.target.value.toLowerCase());
  };

  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <FormControl size="small" sx={{ mr: 2 }}>
      <InputLabel id="select-lang">{t('lang')}</InputLabel>
      <Select
        labelId="select-lang"
        id="demo-simple-select"
        value={lang}
        label="Lang"
        onChange={handleChange}
      >
        <MenuItem value={'EN'}>EN</MenuItem>
        <MenuItem value={'RU'}>RU</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectLang;
