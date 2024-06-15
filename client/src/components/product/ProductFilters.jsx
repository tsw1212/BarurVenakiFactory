import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box, Slider, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/products.css';

function ProductFilters({ searchQuery, onSearchChange, selectedPackage, onPackageChange, priceRange, onPriceRangeChange }) {
    const valuetext = (value) => {
        return `${value}`;
    };

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
            {/* <FormControl component="fieldset">
        <FormLabel component="legend">סוג אריזה</FormLabel>
        <RadioGroup
          aria-label="package"
          name="package"
          value={selectedPackage}
          onChange={onPackageChange}
        >
          <FormControlLabel value="box" control={<Radio />} label="קופסה" />
          <FormControlLabel value="bag" control={<Radio />} label="שקית" />
          <FormControlLabel value="" control={<Radio />} label="הכל" />
        </RadioGroup>
      </FormControl> */}
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
                    step={20}
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
    );
}

export default ProductFilters;
