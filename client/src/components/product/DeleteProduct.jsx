import React, { useEffect, useState } from 'react';
import { deleteRequest } from '../../modules/requests/server_requests';
import { getRequest } from '../../modules/requests/server_requests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/DeleteProduct.css';


const DeleteProduct = ({ productsName, token, showProducts, setShowProducts,setDeleteOn }) => {
    const [products, setProducts] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState('');


    useEffect(() => {
        async function getProductsByName() {
            let dataRequest = await getRequest(`http://localhost:3000/products/${productsName}`, token);
            if (dataRequest.ok) {
                console.log(dataRequest.body);
                await setProducts(dataRequest.body)
            }
            else {
                setWorngRequest(true);
            }
        }
        getProductsByName();
    }, [])

    const handleChange = (event) => {
        setSelectedPackage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userConfirmed = window.confirm(`האם אתה בטוח שאתה רוצה למחוק את המוצר ${selectedPackage}`);
        if (userConfirmed) {
            const productToDelete = products.filter(product => product.package === selectedPackage);
            const productId = productToDelete[0].id;
            let dataRequest = await deleteRequest(`http://localhost:3000/products/${productId}`, token);

            if (dataRequest.ok) {
                alert('המוצר נמחק בהצלחה');
                const updatedProductsArray = products.filter(p => p.id !== productId);
                if (products.length == 1) {
                    const updatedProducts = showProducts.filter(p => p.name !== productsName);
                    await setShowProducts(updatedProducts)
                }
                await setProducts(updatedProductsArray);
            }
            else {
                alert('משהו השתבש בבקשה נסה שוב')
            }

        } else {
            alert('המחיקה התבטלה');
        }
    };

    return (
        <div className='deleteForm_container'>
            <FontAwesomeIcon className='exit' icon="fas fa-times" onClick={()=>setDeleteOn(false)}/>
            <form onSubmit={handleSubmit} className='delete_form'>
                <label htmlFor="names">בחר מוצר למחיקה:</label>
                <select name="name" id="names" value={selectedPackage} onChange={handleChange}>
                    <option value="" disabled>בחר סוג מוצר</option>
                    {products.map((p, index) => (
                        <option key={index} value={p.package}>{p.package}</option>
                    ))}
                </select>
                <br /><br />
                <input type="submit" value="מחק" />
            </form>
        </div>
    );
};

export default DeleteProduct;
