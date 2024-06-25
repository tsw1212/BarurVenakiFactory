import { combineReducers } from 'redux';

const initialState = {
    status: 'guest',
    token: '',
    user: {}
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
});

export default rootReducer;
