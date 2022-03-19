
const addProductToCart = (state, item, resId) => {
    state.restaurentID = resId;
    const copyCartList = [...state.cartList];
    const curItemIndex = copyCartList.findIndex((i) => i.itemId === item.itemId);

    if (curItemIndex < 0) {
        copyCartList.push({ ...item, quantity: 1, ItemToalPrice: (item.itemPrice * 1) });
    } else {
        const copyItem = { ...copyCartList[curItemIndex] };
        copyItem.quantity++;
        copyItem.ItemToalPrice = (copyItem.itemPrice * copyItem.quantity);
        copyCartList[curItemIndex] = copyItem;
    }

    return { ...state, cartList: copyCartList };
};

const decreaseQuantityFromCart = (state, itemId) => {
    const copyCartList = [...state.cartList];
    const curItemIndex = copyCartList.findIndex((i) => i.itemId === itemId);

    const curItem = { ...copyCartList[curItemIndex] };
    curItem.quantity--;
    curItem.ItemToalPrice = (curItem.itemPrice * curItem.quantity)

    if (curItem.quantity <= 0) {
        copyCartList.splice(curItemIndex, 1);
    } else {
        copyCartList[curItemIndex] = curItem;
    }

    return { ...state, cartList: copyCartList };
};

const removeProductFromCart = (state, itemId) => {
    const copyCartList = [...state.cartList];
    const curItemIndex = copyCartList.findIndex((i) => i.itemId === itemId);
    copyCartList.splice(curItemIndex, 1);
    return { ...state, cartList: copyCartList };
};

const clearCart = (state) => {
    return {
        ...state,
        cartList: [],
    };
};

const addTableToCart = (state, selectedTable) => {
    return {
        ...state,
        selectedTable: selectedTable,
    };
};



export const CartReducer = (state, action) => {

    switch (action.type) {
        case "ADD_TABLE_TO_CART":
            return addTableToCart(state, action.selectedTable);
        case "ADD_TO_CART":
            return addProductToCart(state, action.item, action.restaurentID);
        case "DECREASE_QUANTITY":
            return decreaseQuantityFromCart(state, action.itemId);
        case "REMOVE_FROM_CART":
            return removeProductFromCart(state, action.itemId);
        case "CLEAR_ALL_FROM_CART":
            return clearCart(state);
        default:
            return state;
    }
};