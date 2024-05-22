import * as React from 'react';
import { NavLink } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ProductShort({ productData, status }) {
  return (
    <NavLink to={`products/${productData.name}`}>
      <Card sx={{ maxWidth: 345 }} >
        <CardActionArea>
          {/* <CardMedia
            component="img"
            height="140"
            image={productData.image}
            alt={productData.name}
          /> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {productData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {productData.minPrice == productData.maxPrice ?
                <h5>מחיר {productData.minPrice}</h5> :
                <p>טווח מחירים {productData.minPrice}-{productData.maxPrice}₪</p>
              }
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Tooltip describeChild title={status == "manager" ? "ערוך" : "הוסף לסל הקניות"}>
            <NavLink to={`products/${productData.name}`}><Button size="small" color="primary">
              {status == "manager" ?
                <FontAwesomeIcon icon="fa-regular fa-pen" /> :
                <FontAwesomeIcon icon="fas fa-shopping-cart" />
              }
            </Button>
            </NavLink>
          </Tooltip>
        </CardActions>
      </Card>
    </NavLink>
  );
}
