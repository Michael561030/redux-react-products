
import {takeLatest, put, call} from 'redux-saga/effects'

// actionTypes
const LOAD_PRODUCT_ASYNC = 'LOAD_PRODUCT_ASYNC';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOAD_FAILURE = 'LOAD_FAILURE';
const LOAD_REQUEST = 'LOAD_REQUEST';
const SET_INPUT_VALUE = 'SET_INPUT_VALUE';

const initialState = {
    products: null,
    loading: false,
    error: null,
    inputValue: '',
};
// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload ? action.payload : null,
                error: null,

            };
        case LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                products: null,
                error: action.error
            };
        case SET_INPUT_VALUE:
            return {
                ...state,
                inputValue: action.payload,
            };
        default:
            return state;
    }
}


// Saga
 function* fetchProductsSaga() {
    try {
        yield put(requestForProducts());
        const products = yield call(() => {
                return fetch("http://localhost:3000/products.json")
                    .then(res => res.json())
                    .then(
                        (result) => (result.hasOwnProperty('products') && result.products)
                    )
            }
        );
        yield put(requestProductSuccess(products));
    } catch (error) {
        yield put(requestProductError());
    }
}

// Action Creators
export const requestProduct = () => {
    return { type: 'LOAD_PRODUCT_ASYNC' }
};

const requestForProducts = () => ({
    type: LOAD_REQUEST
});


const requestProductSuccess = (products) => {
    return { type: 'LOAD_SUCCESS', payload: products    }
};


const requestProductError = () => {
    return { type: 'LOAD_FAILURE' }
};

export function* watchRequest() {
    yield takeLatest(LOAD_PRODUCT_ASYNC, fetchProductsSaga);
}

export const onInputSearch = (value) => ({
    type: SET_INPUT_VALUE,
    payload: value
});












// const watchFetchProduct = () => {
//     return { type: 'FETCHED_PRODUCT' }
// };
