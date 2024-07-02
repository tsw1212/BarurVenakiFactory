import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box, Slider, Typography, Select, MenuItem } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@mui/system';
import '../../css/products.css';

const GreenRadio = styled(Radio)({
    '&.Mui-checked': {
        color: '#4caf50',
    },
});

function ProductFilters({ searchQuery, onSearchChange, selectedPackage, onPackageChange, priceRange, onPriceRangeChange, sortOption, onSortChange }) {
    const valuetext = (value) => {
        return `${value}`;
    };

    const predefinedOptions = [
        { value: 'ואקוום 1 ק"ג', label: 'וואקום 1 ק"ג' },
        { value: 'תפזורת מנופה', label: 'תפזורת מנופה' },
        { value: 'וואקום 6 ק"ג', label: 'וואקום 6 ק"ג' },
        { value: 'תפזורת מנופה בקרור', label: 'תפזורת מנופה בקרור' },
    ];

    return (
        <div className="filtersContainer">
            <div className="searchContainer">
                <FontAwesomeIcon icon="fas fa-search" />
                <input
                    type="text"
                    placeholder="חפש מוצר..."
                    value={searchQuery}
                    onChange={onSearchChange}
                    className="searchInput"
                />
            </div>
            <FormControl component="fieldset" className="packageFilter">
                <RadioGroup
                    aria-label="package"
                    name="package"
                    value={selectedPackage}
                    onChange={onPackageChange}
                >
                    {predefinedOptions.map(option => (
                        <FormControlLabel key={option.value} value={option.value} control={<GreenRadio />} label={option.label} />
                    ))}
                    <FormControlLabel value="" control={<GreenRadio />} label="הכל" />
                </RadioGroup>
            </FormControl>
            <br ></br>
            <br ></br>

            <div className='priceFilter'>
                <Box sx={{ width: 200 }}>
                    <Typography id="range-slider" gutterBottom>
                        טווח מחירים
                    </Typography>
                    <Slider
                        value={priceRange}
                        onChange={onPriceRangeChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={valuetext}
                        step={5}
                        marks
                        min={0}
                        max={300}
                        sx={{
                            color: '#388e3c', 
                            '& .MuiSlider-thumb': {
                                color: '#388e3c',
                            },
                            '& .MuiSlider-track': {
                                color: '#388e3c', 
                            },
                            '& .MuiSlider-rail': {
                                color: '#bdbdbd',
                            },
                        }}
                    />
                </Box>
            </div>
            <br ></br>
            <FormControl className="sortFilter" style={{ width: '90%', marginTop: '20px',marginLeft:'20px' }}>
                <FormLabel component="legend">מיין לפי מחיר</FormLabel>
                <Select
                    value={sortOption}
                    onChange={onSortChange}
                >
                    <MenuItem value="">בחר</MenuItem>
                    <MenuItem value="asc">מהנמוך לגבוה</MenuItem>
                    <MenuItem value="desc">מהגבוה לנמוך</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default ProductFilters;
