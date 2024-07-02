import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName === name
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

const SelectType = ({ products, handleTypeChange }) => {
  const theme = useTheme();
  const [personName, setPersonName] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setPersonName(value);
    handleTypeChange(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, borderBottomColor: 'green' }}>
        <InputLabel style={{ direction: "rtl" }} id="demo-multiple-name-label">סוג</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          sx={{ color: 'green' }}
        >
          {products.map((p, index) => (
            <MenuItem
              key={index}
              value={p.package}
              style={getStyles(p.package, personName, theme)}
            >
              {p.package}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectType;
