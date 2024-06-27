import React, { useEffect, useState } from 'react';
import { getRequest } from '../../modules/requests/server_requests';
import WorngRequest from '../WorngRequest';
import FullProduct from '../../components/product/FullProduct';
import AddProduct from '../../components/product/AddProduct';
import EditProduct from '../../components/product/EditProduct'; 
import Tooltip from '@mui/material/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import '../../css/managerProducts.css';
import Loading from '../../components/Loading';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';

function ManagerProducts({ products, setProducts, setProductsHandler }) {
  const [wrongRequest, setWorngRequest] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false); 
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(''); 

  let token = useSelector((state) => state.app.token);
  const status = useSelector((state) => state.app.status);

  useEffect(() => {
    async function getProducts() {
      setLoading(false);
      if (token === '') {
        token = localStorage.getItem('token');
      }
      const responseData = await getRequest('http://localhost:3000/products', token);
      if (responseData.ok) {
        await setProducts(responseData.body);
        setLoading(false);
      } else {
        alert('בעיה בטעינת הנתונים. נסה שוב');
      }
    }
    getProducts();
  }, [setProducts]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {wrongRequest ? <WorngRequest className='wrongRequest' setWorngRequest={setWorngRequest} /> :
        <div>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          <div className="searchContainer">
            <FontAwesomeIcon icon={faSearch} className="searchIcon" />
            <input
              type="text"
              placeholder="חפש מוצר..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="searchInput"
            />
          </div>
          {loading && <Loading />}
          <div className="allProducts">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((productData) => (
                <FullProduct className="fullProduct"
                  token={token}
                  status={status}
                  productData={productData}
                  key={productData.id}
                  setProductsHandler={setProductsHandler}
                />
              ))
            ) : (
              <div className="noProductsMessage">לא נמצאו מוצרים תואמים</div>
            )}
          </div>
          <Tooltip className="add_product_button" onClick={() => setAddProduct(true)} describeChild title='הוסף מוצר'>
            <FontAwesomeIcon icon={faPlusSquare} className='addIcon' />
          </Tooltip>
          {addProduct && <AddProduct  setAddProduct={setAddProduct} setProductsHandler={setProductsHandler} setSuccessMessage={setSuccessMessage} />}
          {editProduct && <EditProduct setProductsHandler={setProductsHandler}   setEditOn={setEditProduct} setSuccessMessage={setSuccessMessage} productData={editProduct} />}
        </div>}
    </div>
  );
}

export default ManagerProducts;
