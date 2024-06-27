import React from 'react';
import { deleteRequest } from '../../modules/requests/server_requests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/DeleteProduct.css';
import {  useSelector } from 'react-redux';


const DeleteProduct = ({ productData,  setdeleteOn, setProductsHandler }) => {
    const token = useSelector((state) => state.app.token);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let dataRequest = await deleteRequest(`http://localhost:3000/products/${productData.id}`, token);
        if (dataRequest.ok) {
            await setProductsHandler("delete", productData.id);
            setdeleteOn(false);
        } else {
            alert('משהו השתבש בבקשה נסה שוב');
        }
    }

    return (
        <>
            <div className='overlay' onClick={() => setdeleteOn(false)} />
            <div className='deleteForm_container'>
                <FontAwesomeIcon className='exit' icon="fas fa-times" onClick={() => setdeleteOn(false)} />
                <form onSubmit={handleSubmit} className='delete_form'>
                    <p>האם אתה בטוח שברצונך למחוק את {productData.name} מסוג {productData.package}</p>
                    <input type="submit" value="כן" />
                </form>
            </div>
        </>
    );
};

export default DeleteProduct;
