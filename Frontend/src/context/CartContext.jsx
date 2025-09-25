import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

// Cart actions
const CART_ACTIONS = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    CLEAR_CART: 'CLEAR_CART',
    LOAD_CART: 'LOAD_CART'
};

// Cart reducer
const cartReducer = (state, action) => {
    switch (action.type) {
        case CART_ACTIONS.ADD_ITEM: {
            const { product, quantity = 1 } = action.payload;
            const existingItem = state.items.find(item => item.product._id === product._id);
            
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.product._id === product._id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    )
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, { product, quantity, price: product.price }]
                };
            }
        }
        
        case CART_ACTIONS.REMOVE_ITEM: {
            return {
                ...state,
                items: state.items.filter(item => item.product._id !== action.payload.productId)
            };
        }
        
        case CART_ACTIONS.UPDATE_QUANTITY: {
            const { productId, quantity } = action.payload;
            if (quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter(item => item.product._id !== productId)
                };
            }
            
            return {
                ...state,
                items: state.items.map(item =>
                    item.product._id === productId
                        ? { ...item, quantity }
                        : item
                )
            };
        }
        
        case CART_ACTIONS.CLEAR_CART: {
            return {
                ...state,
                items: []
            };
        }
        
        case CART_ACTIONS.LOAD_CART: {
            return {
                ...state,
                items: action.payload.items || []
            };
        }
        
        default:
            return state;
    }
};

// Calculate cart totals
const calculateCartTotals = (items) => {
    const itemsCount = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    return {
        itemsCount,
        totalPrice: Math.round(totalPrice * 100) / 100 // Round to 2 decimal places
    };
};

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        items: []
    });
    
    // Load cart from localStorage on mount
    React.useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const cartData = JSON.parse(savedCart);
                dispatch({ type: CART_ACTIONS.LOAD_CART, payload: { items: cartData.items } });
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
            }
        }
    }, []);
    
    // Save cart to localStorage whenever it changes
    React.useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);
    
    const addToCart = (product, quantity = 1) => {
        dispatch({
            type: CART_ACTIONS.ADD_ITEM,
            payload: { product, quantity }
        });
    };
    
    const removeFromCart = (productId) => {
        dispatch({
            type: CART_ACTIONS.REMOVE_ITEM,
            payload: { productId }
        });
    };
    
    const updateQuantity = (productId, quantity) => {
        dispatch({
            type: CART_ACTIONS.UPDATE_QUANTITY,
            payload: { productId, quantity }
        });
    };
    
    const clearCart = () => {
        dispatch({ type: CART_ACTIONS.CLEAR_CART });
    };
    
    const { itemsCount, totalPrice } = calculateCartTotals(state.items);
    
    const value = {
        items: state.items,
        itemsCount,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };
    
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use cart context
const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export { CartProvider, useCart };