import React from 'react'
import { useState, useEffect } from 'react';
import '../css/home.css';
import ProductShort from '../components/product/ProductShort'
import WorngRequest from '../pages/WorngRequest';
import { getRequest } from '../modules/requests/server_requests'
let products;
function Products({  token }) {
  const [showProducts, setShowProducts] = useState([]);
  const [worngRequest, setWorngRequest] = useState(false);
  
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
      <div className="allProducts">
        {showProducts.length > 0 && showProducts.map((productData) => {
          return <ProductShort className="productShort" productData={productData} key={productData.id}  />;
        })}
      </div>


  )
}

export default Products
