import React from 'react'
import { useState, useEffect } from 'react';
import '../css/products.css';
import ProductShort from '../components/product/ProductShort'
import WorngRequest from '../pages/WorngRequest';
import { getRequest } from '../modules/requests/server_requests'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddProduct from '../components/product/AddProduct'


import Tooltip from '@mui/material/Tooltip';

let products;
function Products({ token, status }) {
  const [showProducts, setShowProducts] = useState([]);
  const [worngRequest, setWorngRequest] = useState(false);
  const [addProduct, setAddProduct] = useState(false);


  useEffect(() => {
    async function fatchData() {

      let dataRequest = await getRequest(`http://localhost:3000/products/shortList`, token);
      if (dataRequest.ok) {
        products = dataRequest.body;
        setShowProducts(products);
      }
      else {
        setWorngRequest(true);
      }
    }
    fatchData();
  }, [worngRequest]);
  return (

    worngRequest ? <WorngRequest className='wrongRequest' setWorngRequest={setWorngRequest} /> :
      <div>
        <div className="allProducts">
          {showProducts.length > 0 && showProducts.map((productData) => {
            return <ProductShort status={status} className="productShort" productData={productData} key={productData.id} />;
          })}

        </div>
        <Tooltip onClick={() => setAddProduct(true)} describeChild title='הוסף מוצר'>
          <FontAwesomeIcon icon="fas fa-plus-square" />
        </Tooltip>
        {addProduct &&
          <AddProduct setAddProduct={setAddProduct} />
        }
      </div>



  )
}

export default Products
