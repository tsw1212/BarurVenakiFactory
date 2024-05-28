import React, { useEffect,useState } from 'react'
import { getRequest } from '../../modules/requests/server_requests';
import WorngRequest from '../WorngRequest';
import FullProduct from '../../components/product/FullProduct';
import AddProduct from '../../components/product/AddProduct';
import Tooltip from '@mui/material/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ManagerProducts({ status, token }) {
    const [products, setProducts] = useState([]);
    const [wrongRequest, setWorngRequest] = useState(false);
    const [addProduct, setAddProduct] = useState(false);


    useEffect(() => {
        async function getProducts() {
            const responseData = await getRequest('http://localhost:3000/products', token);
            if (responseData.ok) {
                await setProducts(responseData.body);
            } else {
                setAlert('בעיה בטעינת הנתונים. נסה שוב');
            }

        }
        getProducts();
    }, [])
    return (
        <div>
            {wrongRequest ? <WorngRequest className='wrongRequest' setWorngRequest={setWorngRequest} /> :
            <div>
                <div className="allProducts">
                    {products.length > 0 && products.map((productData) => {
                        return <FullProduct className="fullProduct" 
                        status={status}  
                        productData={productData} 
                        key={productData.id} 
                        products={products} 
                        setProducts={setProducts}/>;
                    })}

                </div>
                <Tooltip onClick={() => setAddProduct(true)} describeChild title='הוסף מוצר'>
                    <FontAwesomeIcon icon="fas fa-plus-square" />
                </Tooltip>
                {addProduct &&
                    <AddProduct setAddProduct={setAddProduct} products={products} setProducts={setProducts} />
                }
            </div>}

        </div>
    )
}

export default ManagerProducts
