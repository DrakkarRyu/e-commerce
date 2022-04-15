import axios from "axios"

export const actions = {
    setProducts: "SET_PRODUCTS",
    setIsLoading: "SET_IS_LOADING",
    setCategories: "SET_CATEGORIES",
    setCart: "SET_CART",
    setPurchase: "SET_PURCHASE",
    setLoginMessage: "SET_LOGIN_MESSAGE"
}

const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export const setProducts = products => ({
    type: actions.setProducts,
    payload: products
})

export const setIsLoading = isLoading => ({
    type: actions.setIsLoading,
    payload: isLoading
})

export const setCategories = categories => ({
    type: actions.setCategories,
    payload: categories
})

export const setCart = cart => ({
    type: actions.setCart,
    payload: cart
})

export const setPurchase = purchase => ({
    type: actions.setPurchase,
    payload: purchase
})

export const setLoginMessage = message => ({
    type: actions.setLoginMessage,
    payload: message
})

export const getProductsThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products`)
            .then(res => dispatch(setProducts(res.data.data.products)))
            .finally(() => dispatch(setIsLoading(false)))
    }
}

export const getCategoriesThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/categories`)
            .then(res => dispatch(setCategories(res.data.data.categories)))
            .finally(() => dispatch(setIsLoading(false)))
    }
}

export const filterCategoryThunk = id => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`)
            .then(res => dispatch(setProducts(res.data.data.products)))
            .finally(() => dispatch(setIsLoading(false)))
    }
}

export const filterSearchThunk = search => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${search}`)
            .then(res => dispatch(setProducts(res.data.data.products)))
            .finally(() => dispatch(setIsLoading(false)))
    }
}

export const loginThunk = credentials => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', credentials)
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const addToCartThunk = products => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`, products, getConfig())
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const getCartThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`, getConfig())
            .then(res => dispatch(setCart(res.data.data.cart.products)))
            .finally(() => dispatch(setIsLoading(false)))
    }
}

export const removeProductCart = id => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
            .then(() => dispatch(getCartThunk()))
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const purchaseCartThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true));
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())
            .then(() => {
                dispatch(setCart([]));
                dispatch(getPurchasesThunk());
            })
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const getPurchasesThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true));
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', getConfig())
            .then(res => dispatch(setPurchase(res.data.data.purchases)))
            .finally(() => dispatch(setIsLoading(false)));
    }
}