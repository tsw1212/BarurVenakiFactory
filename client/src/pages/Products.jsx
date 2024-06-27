import React, { useState } from 'react';
import ManagerProducts from './managerPages/ManagerProducts';
import ProductsUser from '../pages/userPages/ProductsUser'
import {  useSelector ,useDispatch} from 'react-redux';

function Products() {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const token = useSelector(state=>state.app.token);
    const status = useSelector(state=>state.app.status);

    function setProductsHandler( typeSettings,productId, productDataToSetting = null) {
        let updateProducts;
        if (typeSettings == "delete") {
            let index = products.findIndex((p) => p.id == productId)
            updateProducts = [...products];
            updateProducts.splice(index, 1);
            dispatch({ type: 'SET_PRODUCTS', payload: updateProducts  });
            setProducts([...updateProducts]);
        }
        else if (typeSettings == "update") {
            updateProducts = products.map((product) => {
                if (product.id == productId) {
                    return  productDataToSetting
                }
                else
                    return  product
            })
            dispatch({ type: 'SET_PRODUCTS', payload: updateProducts  });
            setProducts([...updateProducts])
        }
        else if (typeSettings == "add") {
            dispatch({ type: 'SET_PRODUCTS', payload: [...products, productDataToSetting] });
            setProducts([...products, productDataToSetting])
        }
    }
    return (

        <div>
            {status == "manager" ? <ManagerProducts status={status} token={token} setProducts={setProducts} products={products} setProductsHandler={setProductsHandler} /> :
                <ProductsUser status={status} token={token} setProducts={setProducts} products={products} setProductsHandler={setProductsHandler} />
            }
        </div>
    );
}

export default Products;
