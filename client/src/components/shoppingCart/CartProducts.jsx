import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import QuantityInput from '../product/QuantityInput';
import { getRequest, putRequest, deleteRequest } from '../../modules/requests/server_requests';
import WorngRequest from '../../pages/WorngRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/ShoppingCart.css';
import DeleteCart from './DeleteCart';
import { useNavigate } from 'react-router-dom';

function CartProducts({ token, chosenCartProducts, setChosenCartProducts }) {
    const [products, setProducts] = useState([]);
    const [worngRequest, setWorngRequest] = useState(false);
    const [deleteOn, setDeleteOn] = useState(false);
    const [currentProductToDelete, setCurrentProductToDelete] = useState({});
    const navigate = useNavigate();


    let user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        async function getCart() {
            const reqData = await getRequest(`http://localhost:3000/cart/${user.id}`, token);
            if (reqData.ok) {
                setProducts(reqData.body);
            }
            else {
                setWorngRequest(true);
            }
        }
        getCart();

    }, [worngRequest]);

    const handleCheckboxChange = (rowData) => {
        const updatedProducts = products.map(async (product) => {
            if (product.id === rowData.id) {
                let newProduct={id: product.id, amount:product.amount,userId:product.userId,choose:(!product.choose),productId:product.productId}
                const reqData = await putRequest(`http://localhost:3000/cart/${product.id}`, newProduct, token);
                if (!reqData.ok) {
                    alert('משהו השתבש בבקשה נסה שוב')
                }
                else{
                    setProducts(products.map(product => product.id === rowData.id ? {...product,choose:newProduct.choose}:product));
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
                let newProduct={id: product.id, amount:value,userId:product.userId,choose:product.choose,productId:product.productId}
                const reqData = await putRequest(`http://localhost:3000/cart/${product.id}`, newProduct, token);
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
    };

    async function deleteFunction(id) {
        const reqData = await deleteRequest(`http://localhost:3000/cart/${id}`, token);
        if (reqData.ok) {
            await setProducts(products.filter(product => product.id !== id));

        }
        else {
            alert('משהו השתבש בבקשה נסה שוב');
        }

    };

    async function handleContinueToOrder() {
        const chosenProducts = products.filter(product => product.choose);
        setChosenCartProducts(chosenProducts);
        navigate('/home/shopping_cart/order');
    }

    return (
        <>
            {worngRequest ? <WorngRequest setWorngRequest={setWorngRequest} /> :
                <div>
                    <div className='cartProducts'>
                        <DataTable value={products} rowKey="id" showGridlines stripedRows tableStyle={{ minWidth: '60rem' }}>
                            <Column className='column_cart' field="name" header="שם"></Column>
                            <Column className='column_cart' header="Image" body={(rowData) => <img src={`data:image/png;base64,${rowData.img}`} alt={rowData.name} style={{ width: '50px' }} />}></Column>
                            <Column className='column_cart' field="price" header="מחיר"></Column>
                            <Column className='column_cart' field="package" header="סוג אריזה"></Column>
                            <Column className='column_cart' header={<FontAwesomeIcon icon="fas fa-clipboard-check" />} body={checkboxBodyTemplate}></Column>
                            <Column className='column_cart' header="כמות" body={quantityBodyTemplate}></Column>
                            <Column className='column_cart' header="מחק מהסל" body={(rowData) => <FontAwesomeIcon onClick={() => handleOpenDeleteForm(rowData)} icon="fas fa-trash-alt" />}></Column>
                        </DataTable>
                    </div>
                    <button onClick={handleContinueToOrder}>המשך להזמנה</button>
                </div>
            }
            {deleteOn && <DeleteCart currentProductToDelete={currentProductToDelete} deleteFunction={deleteFunction} setdeleteOn={setDeleteOn} />}

        </>

    )
}

export default CartProducts;
