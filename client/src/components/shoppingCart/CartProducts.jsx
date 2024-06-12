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
import { amber } from '@mui/material/colors';
import Loading from '../Loading'

function CartProducts({ token, chosenCartProducts, setChosenCartProducts }) {
    const [products, setProducts] = useState([]);
    const [worngRequest, setWorngRequest] = useState(false);
    const [deleteOn, setDeleteOn] = useState(false);
    const [currentProductToDelete, setCurrentProductToDelete] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    let user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        async function getCart() {
            const reqData = await getRequest(`http://localhost:3000/cart/${user.id}`, token);
            if (reqData.ok) {
                setProducts(reqData.body);
                setLoading(false);
            }
            else {
                setWorngRequest(true);
            }
        }
        getCart();

    }, [worngRequest]);

    const handleCheckboxChange =async (rowData) => {
        const updatedProducts = await Promise.all(  products.map(async (product) => {
            if (product.id === rowData.id) {
                const item = {
                    amount: product.amount,
                    userId: user.id,
                    productId: product.productId,
                    choose: !product.choose,
                    id:product.id,
                  };
                const reqData = await putRequest(`http://localhost:3000/cart/${item.id}`, item, token);
                if (!reqData.ok) {
                    alert('משהו השתבש בבקשה נסה שוב')
                }
                else{
                    return {...product,choose:item.choose};
                }

            }
            return product;
        }
        ));
        await setProducts(updatedProducts);

    };

    const handleQuantityChange = async(value, rowData) => {
        const updatedProducts =await Promise.all( products.map(async (product) => {
            if (product.id === rowData.id) {
                const item = {
                    amount: value,
                    userId: user.id,
                    productId: product.productId,
                    choose: rowData.choose,
                    id:product.id
                  };
                const reqData = await putRequest(`http://localhost:3000/cart/${item.id}`, item, token);
                if (!reqData.ok) {
                    alert('משהו השתבש בבקשה נסה שוב')
                }
                else
                {
                    return {...product,amount:item.amount};
                }
            }
            return product;
        }
        ));
        await setProducts(updatedProducts);
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
        {loading&& <Loading />}
            {worngRequest ? <WorngRequest setWorngRequest={setWorngRequest} /> :
                <div>
                    <div className='cartProducts'>
                        <DataTable value={products} rowKey="id" showGridlines stripedRows tableStyle={{ minWidth: '60rem' }}>
                            <Column className='column_cart' field="name" header="שם"></Column>
                            <Column className='column_cart' header="Image" body={(rowData) => <img src={`data:image/png;base64,${rowData.img}`} alt={rowData.name} style={{ width: '50px' }} />}></Column>
                            <Column className='column_cart' field="price" header="מחיר"></Column>
                            <Column className='column_cart' field="package" header="סוג אריזה"></Column>
                            <Column className='column_cart' header={<FontAwesomeIcon icon="fas fa-clipboard-check" />} body={(rowData) => <Checkbox checked={rowData.choose} onChange={() => handleCheckboxChange(rowData)} />}></Column>
                            <Column className='column_cart' header="כמות" body={(rowData) => <QuantityInput quantity={rowData.amount} handleQuantityChange={(value) => handleQuantityChange(value, rowData)} />}></Column>
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
