import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import QuantityInput from '../product/QuantityInput';
import { getRequest, putRequest } from '../../modules/requests/server_requests';
import WorngRequest from '../../pages/WorngRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/ShoppingCart.css';
import DeleteCart from './DeleteCart';

function CartProducts({ token }) {
    const [products, setProducts] = useState([]);
    const [worngRequest, setWorngRequest] = useState(false);
    const [deleteOn, setDeleteOn] = useState(false);
    const [currentProductToDelete, setCurrentProductToDelete] = useState({});

    let user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        async function getCart() {
            const reqData = await getRequest(`http://localhost:3000/cart/${user.id}`, token);
            if (reqData.ok) {
                await setProducts(reqData.body);
            }
            else {
                await setWorngRequest(true);
            }
        }
        getCart();

    }, [worngRequest]);

    const handleCheckboxChange = (rowData) => {
        const updatedProducts = products.map(async (product) => {
            if (product.id === rowData.id) {
                product.choose = !product.choose;
                const reqData = await putRequest(`http://localhost:3000/cart/${product.id}`, product, token);
                if (!reqData.ok) {
                    alert('משהו השתבש בבקשה נסה שוב')
                }
            }
            return product;
        }
        );
        setProducts(updatedProducts);

    };

    const handleQuantityChange = (value, rowData) => {
        const updatedProducts = products.map(async (product) => {
            if (product.id === rowData.id) {
                product.quantity = value;
                const reqData = await putRequest(`http://localhost:3000/cart/${product.id}`, product, token);
                if (!reqData.ok) {
                    alert('משהו השתבש בבקשה נסה שוב')
                }
            }
            return product;
        }
        );
        setProducts(updatedProducts);
    };

    const checkboxBodyTemplate = (rowData) => {
        return (
            <Checkbox checked={rowData.choose} onChange={() => handleCheckboxChange(rowData)} />
        );
    };

    const quantityBodyTemplate = (rowData) => {
        return (
            <QuantityInput quantity={rowData.amount} handleQuantityChange={(value) => handleQuantityChange(value, rowData)} />
        );
    };

    async function handleOpenDeleteForm(e) {
        await setCurrentProductToDelete(e)
        await setDeleteOn(true)
    }
    function deleteFunction(id) {

    }

    return (
        <>
            {worngRequest ? <WorngRequest setWorngRequest={setWorngRequest} /> :
                <div className='cartProducts'>
                    <DataTable value={products} showGridlines stripedRows tableStyle={{ minWidth: '60rem' }}>
                        <Column className='column_cart' field="name" header="שם"></Column>
                        <Column className='column_cart' header="Image" body={(rowData) => <img src={`data:image/png;base64,${rowData.img}`} alt={rowData.name} style={{ width: '50px' }} />}></Column>
                        <Column className='column_cart' field="price" header="מחיר"></Column>
                        <Column className='column_cart' field="package" header="סוג אריזה"></Column>
                        <Column className='column_cart' header={<FontAwesomeIcon icon="fas fa-clipboard-check" />} body={checkboxBodyTemplate}></Column>
                        <Column className='column_cart' header="כמות" body={quantityBodyTemplate}></Column>
                        <Column className='column_cart' header="מחק מהסל" body={(rowData) => <FontAwesomeIcon onClick={() => handleOpenDeleteForm(rowData)} icon="fas fa-trash-alt" />}></Column>
                    </DataTable>
                </div>
            }
            {deleteOn && <DeleteCart currentProductToDelete={currentProductToDelete} deleteFunction={deleteFunction} setdeleteOn={setDeleteOn} />}

        </>

    )
}

export default CartProducts;
