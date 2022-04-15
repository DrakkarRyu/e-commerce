import { actions } from './actions';

const INITIAL_STATE = {
    products: [],
    isLoading: false,
    categories: [],
    cart: [], 
    purchase: [],
    loginMessage: ""
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actions.setProducts:
            return {
                ...state,
                products: action.payload
            }
        case actions.setIsLoading:
            return {
                ...state,
                isLoading: action.payload
            }
        case actions.setCategories:
            return {
                ...state,
                categories: action.payload
            }
        case actions.setCart:
            return {
                ...state,
                cart: action.payload
            }
        case actions.setPurchase:
            return {
                ...state,
                purchase: action.payload
            }
        case actions.setLoginMessage:
            return{
                ...state,
                loginMessage: action.payload
            }
        default:
            return state;
    }
}

export default reducer;