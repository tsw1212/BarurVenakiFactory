import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box, Slider, Typography, Select, MenuItem } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/products.css';

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
                <FormLabel component="legend">סוג אריזה</FormLabel>
                <RadioGroup
                    aria-label="package"
                    name="package"
                    value={selectedPackage}
                    onChange={onPackageChange}
                >
                    {predefinedOptions.map(option => (
                        <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
                    ))}
                    <FormControlLabel value="" control={<Radio />} label="הכל" />
                </RadioGroup>
            </FormControl>
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
                            color: '#4caf50',
                            '& .MuiSlider-thumb': {
                                color: '#4caf50',
                            },
                            '& .MuiSlider-track': {
                                color: '#4caf50',
                            },
                            '& .MuiSlider-rail': {
                                color: '#bdbdbd',
                            },
                        }}
                    />
                </Box>
            </div>
            <FormControl className="sortFilter">
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
