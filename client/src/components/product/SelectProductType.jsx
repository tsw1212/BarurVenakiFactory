import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const predefinedOptions = [
  { value: 'ואקוום 1 ק"ג', label: 'וואקום 1 ק"ג' },
  { value: 'תפזורת מנופה', label: 'תפזורת מנופה' },
  { value: 'וואקום 6 ק"ג', label: 'וואקום 6 ק"ג' },
  { value: 'תפזורת מנופה בקרור', label: 'תפזורת מנופה בקרור' },
];

export default function SelectProductType({handleChangeType}) {
  const [type, setType] = React.useState('');
  const [customOption, setCustomOption] = React.useState('');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setType(newValue);
    if (newValue !== 'custom') {
      handleChangeType(newValue);
      setCustomOption(''); 
    }
  };

  const handleCustomChange = (event) => {
    const newValue = event.target.value;
    setType('custom'); 
    handleChangeType(newValue);
    setCustomOption(newValue);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 190 }}>
        <InputLabel id="demo-simple-select-autowidth-label">בחר סוג אריזה</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={type}
          onChange={handleChange}
          autoWidth
          label="סוג אריזה"
        >
          {predefinedOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          <MenuItem value="custom">מותאם אישית</MenuItem>
        </Select>
        {type === 'custom' && (
          <TextField
            sx={{ mt: 2 }}
            label="סוג אריזה מותאם אישית"
            variant="outlined"
            value={customOption}
            onChange={handleCustomChange}
          />
        )}
      </FormControl>
    </div>
  );
}
