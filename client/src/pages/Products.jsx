import React, { useState } from 'react';
import ManagerProducts from './managerPages/ManagerProducts';
import ProductsUser from '../pages/userPages/ProductsUser';
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';

function Products() {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const token = useSelector(state => state.app.token);
    const status = useSelector(state => state.app.status);

    function showAlertMessage(message) {
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    }

    function setProductsHandler(typeSettings, productId, productDataToSetting = null) {
        let updateProducts;
        if (typeSettings === "delete") {
            let index = products.findIndex((p) => p.id === productId);
            updateProducts = [...products];
            updateProducts.splice(index, 1);
            dispatch({ type: 'SET_PRODUCTS', payload: updateProducts });
            setProducts([...updateProducts]);
            showAlertMessage('המוצר נמחק בהצלחה');
        } else if (typeSettings === "update") {
            updateProducts = products.map((product) => {
                if (product.id === productId) {
                    return productDataToSetting;
                } else {
                    return product;
                }
            });
            dispatch({ type: 'SET_PRODUCTS', payload: updateProducts });
            setProducts([...updateProducts]);
            showAlertMessage('המוצר עודכן בהצלחה');
        } else if (typeSettings === "add") {
            dispatch({ type: 'SET_PRODUCTS', payload: [...products, productDataToSetting] });
            setProducts([...products, productDataToSetting]);
            showAlertMessage('המוצר נוסף בהצלחה');
        }
    }

    return (
        <div>
            {showAlert && (
                <Alert 
                    severity="success" 
                    style={{ 
                        position: 'absolute', 
                        top: '5vh', 
                        left: '50%', 
                        transform: 'translateX(-50%)', 
                        zIndex: 1000 
                    }}
                >
                    {alertMessage}
                </Alert>
            )}
            {status === "manager" ? (
                <ManagerProducts
                    setProducts={setProducts}
                    products={products}
                    setProductsHandler={setProductsHandler}
                />
            ) : (
                <ProductsUser
                    setProducts={setProducts}
                    products={products}
                    setProductsHandler={setProductsHandler}
                />
            )}
        </div>
    );
}

export default Products;
