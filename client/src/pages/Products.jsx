import React, { useState } from 'react';
import ManagerProducts from './managerPages/ManagerProducts';
import ProductsUser from '../pages/userPages/ProductsUser'
function Products({ status, token }) {
    const [products, setProducts] = useState([]);

    function setProductsHandler( typeSettings,productId, productDataToSetting = null) {
        let updateProducts;
        if (typeSettings == "delete") {
            let index = products.findIndex((p) => p.id == productId)
            updateProducts = [...products];
            updateProducts.splice(index, 1);
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
            setProducts([...updateProducts])
        }
        else if (typeSettings == "add") {
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
