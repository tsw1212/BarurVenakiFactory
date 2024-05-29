import React, { useState } from 'react';
import { putRequest } from '../../modules/requests/server_requests_special';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EditProduct = ({ token,setProductsHandler,setEditOn ,productData}) => {
    const [formData, setFormData] = useState(productData);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData({
            ...formData,
            img: file
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const productDataUpdate = new FormData();
            for (const key in formData) {
              productDataUpdate.append(key, formData[key]);
            }
            const dataRequest = await putRequest (`http://localhost:3000/products/${productData.id}`, productDataUpdate, token);
            if (dataRequest.ok) {
              await  setProductsHandler("update",dataRequest.body.id,dataRequest.body)
                setEditOn(false);
            } else {
                alert('שגיאה בבקשה נסה שוב');
            }
        } catch (error) {
            console.error('Error creating product:', error);
            alert('שגיאה.');
        }
    };

    return (
        <div className='createProduct_container'>
            <FontAwesomeIcon className='exit' icon="fas fa-times" onClick={() => setEditOn(false)} />
            <form onSubmit={handleSubmit} className='createProduct_form'>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                <label htmlFor="weight">Weight:</label>
                <input type="text" id="weight" name="weight" value={formData.weight} onChange={handleChange} required />

                <label htmlFor="package">Package:</label>
                <input type="text" id="package" name="package" value={formData.package} onChange={handleChange} required />

                <label htmlFor="imageFile">Image File:</label>
                <input type="file" id="imageFile" name="imageFile" onChange={handleFileChange} accept="image/*" required />

                <label htmlFor="price">Price:</label>
                <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} required />

                <label htmlFor="inventory">Inventory:</label>
                <input type="text" id="inventory" name="inventory" value={formData.inventory} onChange={handleChange} required />

                <input type="submit" value="עדכון מוצר" />
            </form>
        </div>
    );
};

export default EditProduct;
