import React from 'react'
import { useState ,useEffect} from 'react';
import '../css/home.css';
import ProductShort from '../components/product/ProductShort'
import WorngRequest from '../pages/WorngRequest';
import { getListProductShort } from '../requests/productsRequests'
let products;
function Home({ status ,token}) {
  const [showproducts, setShowProducts] = useState([]);
  const [wrongRequest, setWrongRequest] = useState(false);
  useEffect(() => {
    async function fatchData() {
      let dataRequest = await getListProductShort(token);
      if (dataRequest.ok) {
        products = dataRequest.value;
      }
      else {
        setWrongRequest(true);
      }
      setShowProducts(products);
    }
    fatchData();
  }, [wrongRequest]);
  return (

   wrongRequest ? <WorngRequest setWrongRequest={setWrongRequest} /> :
        <div className="allProducts">
          {showproducts.map((productData) => {
           return <ProductShort className="productShort" productData={productData}  key={productData.id} status={status} />;
          })}
       </div>
  )
}

export default Home
