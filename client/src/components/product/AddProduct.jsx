import React, { useState } from 'react';
import { postRequest } from '../../modules/requests/server_requests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddProduct = ({ token,setProductsHandler,setAddProduct }) => {
    const [formData, setFormData] = useState({
        name: '',
        weight: '',
        package: '',
        price: '',
        inventory: '',
        imageFile: null
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const productData = new FormData();
            for (const key in formData) {
                productData.append(key, formData[key]);
            }
            const dataRequest = await postRequest('http://localhost:3000/products', productData, token);
            if (dataRequest.ok) {
                await  setProductsHandler("add",dataRequest.body.id,dataRequest.body)
            } else {
                alert('Failed to create product. Please try again.');
            }
        } catch (error) {
            console.error('Error creating product:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className='createProduct_container'>
            <FontAwesomeIcon className='exit' icon="fas fa-times" onClick={() => setAddProduct(false)} />
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

                <input type="submit" value="Create Product" />
            </form>
        </div>
    );
};

export default AddProduct;
