import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {  CardActionArea, CardActions } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/productShort.css';
import { useState } from 'react';
import DeleteProduct from './DeleteProduct';
import EditProduct from './EditProduct';
import { useSelector } from 'react-redux';

export default function FullProduct({ productData, setProductsHandler }) {
  const token = useSelector((state) => state.app.token);

  const [editOn, setEditOn] = useState(false);
  const [deleteOn, setdeleteOn] = useState(false);

  function handleEdit(event) {
    event.stopPropagation();
    setEditOn(true);
  }

  function handleDelete(event) {
    event.stopPropagation();
    setdeleteOn(true);
  }

  return (
    <>
      <div>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={`data:'image/png';base64,${productData.img}`}
              alt={productData.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {productData.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <h4>מחיר: {productData.price}</h4>
                <h4>כמות במלאי: {productData.inventory}</h4>
                <h4>משקל: {productData.weight}</h4>
                <h4>סוג אריזה: {productData.package}</h4>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <div>
              <Tooltip describeChild title='מחק'>
                <FontAwesomeIcon className="icon delete-icon" icon="fas fa-trash" onClick={handleDelete} />
              </Tooltip>
              <Tooltip describeChild title='ערוך'>
                <FontAwesomeIcon className="icon edit-icon" icon="fas fa-pencil-alt" onClick={handleEdit} />
              </Tooltip>
            </div>
          </CardActions>
        </Card>
      </div>
      {editOn && (
        <EditProduct setProductsHandler={setProductsHandler} setEditOn={setEditOn} productData={productData} />
      )}
      {deleteOn && (
        <DeleteProduct  setProductsHandler={setProductsHandler} setdeleteOn={setdeleteOn} productData={productData} />
      )}
    </>
  );
}
