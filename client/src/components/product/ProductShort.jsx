import * as React from 'react';
import { NavLink } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {  CardActionArea, CardActions } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/productShort.css'

import {  useSelector } from 'react-redux';


export default function ProductShort({ productData}) {
  const token = useSelector((state) => state.app.token);

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
                    <p>מחיר {productData.minPrice}</p> :
                    <p>טווח מחירים {productData.minPrice}-{productData.maxPrice}₪</p>
                  }
                </Typography>
              </CardContent>
            </CardActionArea>
          </NavLink>
          <CardActions>
            <NavLink to={`${productData.name}`}>
              <Tooltip describeChild title='מידע נוסף'>
                <FontAwesomeIcon style={{color:"#1d7822"}}  icon="fas fa-ellipsis-v" />
              </Tooltip>
            </NavLink>

          </CardActions>
        </Card>

      </div>

    </>
  );
}
