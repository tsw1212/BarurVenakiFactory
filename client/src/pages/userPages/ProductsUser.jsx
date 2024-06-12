import React, { useState, useEffect } from 'react';
import '../../css/products.css';
import ProductShort from '../../components/product/ProductShort';
import WorngRequest from '../WorngRequest';
import { getRequest } from '../../modules/requests/server_requests';
import AddProduct from '../../components/product/AddProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from '@mui/material/Tooltip';
import Loading from '../../components/Loading';

function Products({ token, status, products, setProducts }) {
  const [worngRequest, setWorngRequest] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fatchData() {
      let dataRequest = await getRequest(`http://localhost:3000/products/shortList`, token);
      if (dataRequest.ok) {
        setProducts(dataRequest.body);
        setLoading(false);
      } else {
        setWorngRequest(true);
      }
    }
    fatchData();
  }, [worngRequest]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    worngRequest ? <WorngRequest className='wrongRequest' setWorngRequest={setWorngRequest} /> :
      <div>
        <div className="searchContainer">
        <FontAwesomeIcon icon="fas fa-search" />
          <input
            type="text"
            placeholder="חפש מוצר..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="searchInput"
          />
        </div>
        {loading&& <Loading />}
        <div className="allProducts">
          {filteredProducts.length > 0 && filteredProducts.map((productData) => {
            return <ProductShort status={status} className="productShort" productData={productData} key={productData.id} />;
          })}
        </div>
      </div>
  );
}

export default Products;
