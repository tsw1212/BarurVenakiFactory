import * as React from 'react';
import { NavLink } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/productShort.css'
import { getRequest } from '../../modules/requests/server_requests';
import { useState } from 'react';
import DeleteProduct from './DeleteProduct';

export default function ProductShort({ productData, showProducts, setShowProducts, token }) {

  console.log(productData);

  return (
    <>
      <div>

        <Card sx={{ maxWidth: 345 }} >
          <NavLink to={`${productData.name}`}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={`data:'image/png';base64,${productData.img}`}
                alt={productData.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{  color: "#2d5a02"}}>
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
          </NavLink>
          <CardActions>
            <NavLink to={`${productData.name}`}>
              <Tooltip describeChild title='מידע נוסף'>
                <FontAwesomeIcon icon="fas fa-shopping-cart" />
              </Tooltip>
            </NavLink>

          </CardActions>
        </Card>

      </div>

    </>
  );
}
