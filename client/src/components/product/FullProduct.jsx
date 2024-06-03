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
import EditProduct from './EditProduct';

export default function FullProduct({ productData, status, token, setProductsHandler }) {
  const [editOn, setEditOn] = useState(false);
  const [deleteOn, setdeleteOn] = useState(false);

  function handleEdit(event) {
    event.stopPropagation()
    setEditOn(true);
  }
  function handleDelete(event) {
    event.stopPropagation()
    setdeleteOn(true);

  }

  return (
    <>
      <div>

        <Card sx={{ maxWidth: 345 }} >
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
                <FontAwesomeIcon icon="fas fa-trash" onClick={(e) => handleDelete(e)} />
              </Tooltip>
              <Tooltip describeChild title='ערוך'>
                <FontAwesomeIcon icon="fas fa-pencil-alt" onClick={(e) => handleEdit(e)} />
              </Tooltip>
            </div>
          </CardActions>
        </Card>

      </div>
      {editOn && <EditProduct token={token} setProductsHandler={setProductsHandler} setEditOn={setEditOn} productData={productData}  token={token} />}
      {deleteOn && <DeleteProduct token={token} setProductsHandler={setProductsHandler} setdeleteOn={setdeleteOn} productData={productData} token={token} />}
    </>
  );
}
