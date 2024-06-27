import { combineReducers } from 'redux';

const initialState = {
    status: 'guest',
    token: '',
    user: {},
    
};
const initialDetails={
    products: [],
    orders: [],
    users: [],
    carts:[],
}
const DetailsReducer=(state=initialDetails ,action)=>{
    switch(action.type){
        case 'SET_PRODUCTS':
            return {...state, products: action.payload};
        case 'SET_ORDERS':
            return {...state, orders: action.payload};
        case 'SET_USERS':
            return {...state, users: action.payload};
        case 'SET_CARTS':
            return {...state, carts: action.payload};    
        default:
            return state;
    }
 };

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_STATUS':
            return { ...state, status: action.payload };
        case 'SET_TOKEN':
            return { ...state, token: action.payload };
        case 'SET_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    app: appReducer,
    details:DetailsReducer
});

export default rootReducer;
