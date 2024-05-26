import React from 'react'
import { useState, useEffect } from 'react';
import '../css/home.css';
import ProductShort from '../components/product/ProductShort'
import WorngRequest from '../pages/WorngRequest';
import { getRequest } from '../modules/requests/server_requests'
let products;
function Home({ status, token, setToken }) {
  const [showProducts, setShowProducts] = useState([]);
  const [worngRequest, setWorngRequest] = useState(false);
  
  useEffect(() => {
    async function fatchData() {
      let updateToken;
      if (token == "") {
        updateToken = localStorage.getItem("token");
        if (!updateToken) {
          let dataRequest = await getRequest(`http://localhost:3000/guest_token`);
          if (dataRequest.ok) {
            localStorage.setItem('token', dataRequest.token);
            await setToken(dataRequest.token);
          }
        }
        else {
          await setToken(updateToken);
        }
      }
      
      let dataRequest = await getRequest(`http://localhost:3000/products/shortList`, token);
      if (dataRequest.ok) {
        products = dataRequest.body;
       await  setShowProducts(products);
      }
      else {
        await setWorngRequest(true);
      }
    }


    fatchData();
  }, [worngRequest]);
  return (

    worngRequest ? <WorngRequest className='wrongRequest' setWorngRequest={setWorngRequest} /> :
      <div className="allProducts">
        {showProducts.length > 0 && showProducts.map((productData) => {
          return <ProductShort className="productShort" productData={productData} key={productData.id} status={status} />;
        })}
      </div>


  )
}

export default Home
