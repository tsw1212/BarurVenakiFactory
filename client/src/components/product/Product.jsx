import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WorngRequest from '../../pages/WorngRequest';
import { getRequest, postRequest } from '../../modules/requests/server_requests';
import '../../css/product.css';
import Slider from './Slider';
import SelectType from './SelectType';
import QuantityInput from './QuantityInput';
import Loading from '../Loading';
import NotAdd from './NotAdd';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';

let prices = { min: 0, max: 10 };

const Product = ({ setCountCartItems }) => {
  let token = useSelector((state) => state.app.token);
  const status = useSelector((state) => state.app.status);
  const user = useSelector((state) => state.app.user);

  const [products, setProducts] = useState([]);
  const { nameProduct } = useParams();
  const [wrongRequest, setWrongRequest] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedType, setSelectedType] = useState('בחר סוג אריזה');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [notAddFlag, setNotAddFlag] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (token === '') {
        token = localStorage.getItem('token');
      }
      let dataRequest = await getRequest(`http://localhost:3000/products/${nameProduct}`, token);
      if (dataRequest.ok) {
        setProducts(dataRequest.body);
        setLoading(false);
        prices = getMinMaxPrices(dataRequest.body);
      } else {
        setWrongRequest(true);
      }
    }
    fetchData();
  }, [nameProduct, token]);

  const handleTypeChange = (valueType) => {
    const selectedProductIndex = products.findIndex(product => product.package === valueType);
    const selectedProduct = products[selectedProductIndex];
    setCurrentProduct(selectedProduct);
    setCurrentSlide(selectedProductIndex);
  };

  const handleQuantityChange = (quantity) => {
    setQuantity(quantity);
  };

  const handleAddToCart = async () => {
    if (status === "guest") {
      setNotAddFlag(true);
      return;
    }
    if (currentProduct == null) {
      showAlertMessage('בחר סוג אריזה');
      return;
    }
    const item = {
      amount: quantity,
      userId: user.id,
      productId: currentProduct.id,
      choose: false
    };
    let dataRequest = await postRequest(`http://localhost:3000/cart`, item, token);
    if (dataRequest.ok) {
      setCountCartItems(prev => prev + 1);
      showAlertMessage('המוצר נוסף בהצלחה לעגלת הקניות');
    } else {
      alert('משהו השתבש נסה שוב');
    }
  };

  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  if (wrongRequest) {
    return <WorngRequest className='wrongRequest' setWrongRequest={setWrongRequest} />;
  }

  return (
    <>
      {showAlert && (
        <Alert
          severity="success"
          style={{
            position: 'absolute',
            top: '15vh',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000
          }}
        >
          {alertMessage}
        </Alert>
      )}
      <div className="product">
        {loading && <Loading />}
        {notAddFlag && <NotAdd setNotAddFlag={setNotAddFlag} />}
        <div className="product-images">
          {products.length !== 0 && <Slider sliders={products} currentSlide={currentSlide} />}
        </div>
        <div className="product-details">
          <h3>{products.length !== 0 && products[0].name}</h3>
          <p className="product-price">
            {currentProduct ? currentProduct.price : prices.min === prices.max ? `${prices.min}` : `${prices.min}-${prices.max}`}₪
          </p>
          <div className="product-options">
            <div className="product-type">
              <SelectType handleTypeChange={handleTypeChange} products={products} />
            </div>
            <div className="product-quantity">
              <label htmlFor="quantity">כמות</label>
              <QuantityInput quantity={quantity} handleQuantityChange={handleQuantityChange} />
            </div>
          </div>
          <button className="add-to-cart" onClick={handleAddToCart}>
            הוסף לעגלה
          </button>
        </div>
      </div>
    </>
  );
};

function getMinMaxPrices(products) {
  if (products.length === 0) return { min: 0, max: 0 };
  return products.reduce((acc, product) => {
    if (product.price < acc.min) acc.min = product.price;
    if (product.price > acc.max) acc.max = product.price;
    return acc;
  }, { min: products[0].price, max: products[0].price });
}

export default Product;
