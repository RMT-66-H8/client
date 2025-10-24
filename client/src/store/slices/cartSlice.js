import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../../helpers/http';

export const fetchCart = createAsyncThunk('cart/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await http.get('/cart');
    console.log('📦 Full Response:', response);
    console.log('📦 Response Data:', response.data);
    
    const data = response.data;
    
    // According to API docs, the response is { "carts": [...] }
    let cartItems = [];
    
    if (data.carts && Array.isArray(data.carts)) {
      cartItems = data.carts;
    } else if (data.cart && Array.isArray(data.cart)) {
      cartItems = data.cart;
    } else if (Array.isArray(data)) {
      cartItems = data;
    } else if (data.data && Array.isArray(data.data)) {
      cartItems = data.data;
    } else {
      console.warn('⚠️ Unexpected cart response structure:', data);
      cartItems = [];
    }
    
    console.log('✅ Parsed Cart Items:', cartItems);
    return cartItems;
  } catch (err) {
    console.error('❌ Fetch Cart Error:', err);
    console.error('❌ Error Response:', err.response?.data);
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch cart');
  }
});

export const addToCart = createAsyncThunk('cart/add', async (productId, { rejectWithValue }) => {
  try {
    const { data } = await http.post('/cart', { productId });
    console.log('➕ Add to Cart Response:', data);
    return data;
  } catch (err) {
    console.error('❌ Add to Cart Error:', err.response?.data);
    return rejectWithValue(err.response?.data?.message || 'Failed to add to cart');
  }
});

// Remove from Cart
export const removeFromCart = createAsyncThunk('cart/remove', async (cartId, { rejectWithValue }) => {
  try {
    await http.delete(`/cart/${cartId}`);
    console.log('🗑️ Removed cart item:', cartId);
    return cartId;
  } catch (err) {
    console.error('❌ Remove Error:', err.response?.data);
    return rejectWithValue(err.response?.data?.message || 'Failed to remove from cart');
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
