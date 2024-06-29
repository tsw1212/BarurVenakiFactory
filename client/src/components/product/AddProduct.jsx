import React, { useState, useEffect } from 'react';
import { postRequest } from '../../modules/requests/server_requests_special';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/addProduct.css';
import { useSelector } from 'react-redux';
import SelectProductType from './SelectProductType';
import { Alert } from '@mui/material';

const AddProduct = ({ setProductsHandler, setAddProduct, setSuccessMessage }) => {
  const token = useSelector((state) => state.app.token);
  const [formData, setFormData] = useState({
    name: '',
    weight: '',
    package: '',
    price: '',
    inventory: '',
    imageFile: null
  });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.type !== 'image/jpeg' && file.type !== "image/png" && file.type !== "image/gif") {
      alert('אנא בחר קובץ תמונה');
    }
    setFormData({
      ...formData,
      imageFile: file
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleChangeType = (value) => {
    setFormData({
      ...formData,
      package: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const productData = new FormData();
      for (const key in formData) {
        productData.append(key, formData[key]);
      }
      const dataRequest = await postRequest('http://localhost:3000/products', productData, token);
      if (dataRequest.ok) {
        await setProductsHandler("add", dataRequest.body.newProduct.id, dataRequest.body.newProduct);
        await setAddProduct(false);
        setSuccessMessage("המוצר נוסף בהצלחה");
        setShowAlert(true);
      } else {
        alert('יצירת המוצר נכשלה. אנא נסה שוב.');
      }
    } catch (error) {
      console.error('שגיאה ביצירת המוצר:', error);
      alert('אירעה שגיאה. אנא נסה שוב.');
    }
  };

  return (
    <>
      <div className='overlay' onClick={() => setAddProduct(false)} />
      <div className='createProduct_container'>
        <FontAwesomeIcon className='exit' icon="fas fa-times" onClick={() => setAddProduct(false)} />
        <form onSubmit={handleSubmit} className='createProduct_form'>
          {showAlert && <Alert severity="success" style={{ marginTop: '15vh' }}>המוצר נוסף בהצלחה</Alert>}
          <label htmlFor="name">שם</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required style={{ textAlign: 'right', direction: 'rtl' }} />

          <label htmlFor="weight">משקל</label>
          <input type="text" id="weight" name="weight" value={formData.weight} onChange={handleChange} required style={{ textAlign: 'right', direction: 'rtl' }} />

          <SelectProductType handleChangeType={handleChangeType} />

          <label htmlFor="imageFile">קובץ תמונה</label>
          <input type="file" id="imageFile" name="imageFile" onChange={handleFileChange} accept="image/*" required style={{ textAlign: 'right', direction: 'rtl' }} />

          <label htmlFor="price">מחיר</label>
          <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} required style={{ textAlign: 'right', direction: 'rtl' }} />

          <label htmlFor="inventory">מלאי</label>
          <input type="text" id="inventory" name="inventory" value={formData.inventory} onChange={handleChange} required style={{ textAlign: 'right', direction: 'rtl' }} />

          <input type="submit" value="יצירת מוצר" />
        </form>
      </div>
    </>
  );
};

export default AddProduct;
