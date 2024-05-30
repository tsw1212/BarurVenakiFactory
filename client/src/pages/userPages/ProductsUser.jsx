import React from 'react'
import { useState, useEffect } from 'react';
import '../../css/products.css';
import ProductShort from '../../components/product/ProductShort'
import WorngRequest from '../WorngRequest';
import { getRequest } from '../../modules/requests/server_requests'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddProduct from '../../components/product/AddProduct'


import Tooltip from '@mui/material/Tooltip';

function Products({ token, status , products,setProducts}) {
  const [worngRequest, setWorngRequest] = useState(false);


  useEffect(() => {
    async function fatchData() {

      let dataRequest = await getRequest(`http://localhost:3000/products/shortList`, token);
      if (dataRequest.ok) {
        setProducts(dataRequest.body);
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
          {products.length > 0 && products.map((productData) => {
            return <ProductShort status={status} className="productShort" productData={productData} key={productData.id} />;
          })}

        </div>
      </div>



  )
}

export default Products
