// CRUD_API.reducers.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  productState: [],
};

export const handleCreateAPI = createAsyncThunk(
  'createAPI',
  async (data, { rejectWithValue }) => {
    const {itemName, description, price, category, stock, navigate } = data;
    try {
      const res = await axios.post('https://product-api-a7tg.onrender.com/api/createproduct', {
        itemName,
        description,
        price,
        category,
        stock
      }, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      console.log(res)
      if (res.status === 201) {
        toast.success("Created Data Successfully");
        navigate("/ReadAPI");
        return res.data;
      } else {
        throw new Error(`Unexpected response status: ${res.status}`);
      }
    } catch (error) {
      console.error('Error creating data:', error);
      toast.error(`Failed to create data: ${error.message}`, {
        position: "top-right",
      });
      return rejectWithValue({ error: error.message });
    }
  }
);

export const handleReadAPI = createAsyncThunk(
  'readAPI',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('https://product-api-a7tg.onrender.com/api/getproducts');
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error(`Unexpected response status: ${res.status}`);
      }
    } catch (error) {
      console.error('Error reading data:', error);
      toast.error(`Failed to read data: ${error.message}`, {
        position: "top-right",
      });
      return rejectWithValue({ error: error.message });
    }
  }
);

export const handleDeleteAPI = createAsyncThunk(
  'deleteAPI',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`https://product-api-a7tg.onrender.com/api/deleteProduct/${id}`);
      if (res.status === 200) {
        toast.success("Deleted Data Successfully");
        return id;
      } else {
        throw new Error(`Unexpected response status: ${res.status}`);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error(`Failed to delete data: ${error.message}`, {
        position: "top-right",
      });
      return rejectWithValue({ error: error.message });
    }
  }
);  

export const handleUpdateAPI = createAsyncThunk(
  'updateAPI',
  async (data, { dispatch, rejectWithValue }) => {
    const {_id:id, itemName, description, price, category,stock} = data;
    try {
      const res = await axios.put(`https://product-api-a7tg.onrender.com/api/updateproduct/${id}`, {
        itemName,
        description,
        price,
        category,
        stock
      }, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        toast.success("Updated Data Successfully");
        dispatch(handleReadAPI())
        return res.data;
      } else {
        throw new Error(`Unexpected response status: ${res.status}`);
      }
    } catch (error) {
      console.error('Error updating data:', error);
      toast.error(`Failed to update data: ${error.message}`, {
        position: "top-right",
      });
      return rejectWithValue({ error: error.message });
    }
  }
);

const CRUD_APISlice = createSlice({
  name: 'CRUD_API',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleCreateAPI.fulfilled, (state, action) => {
      state.productState.push(action.payload);
    });
    builder.addCase(handleCreateAPI.rejected, (state, action) => {
      console.error('Create API rejected:', action.payload);
    });
    builder.addCase(handleReadAPI.fulfilled, (state, action) => {
      state.productState = action.payload;
    });
   
    builder.addCase(handleReadAPI.rejected, (state, action) => {
      console.error('Read API rejected:', action.payload);
    });
    builder.addCase(handleDeleteAPI.fulfilled, (state, action) => {
      state.productState = state.productState.filter(product => product._id !== action.payload);
    });
    builder.addCase(handleDeleteAPI.rejected, (state, action) => {
      console.error('Delete API rejected:', action.payload);
    });
    builder.addCase(handleUpdateAPI.fulfilled, (state, action) => {
      const index = state.productState.findIndex(product => product._id === action.payload.id);
      if (index !== -1) {
        state.productState[index] = action.payload;
      }
    });
    builder.addCase(handleUpdateAPI.rejected, (state, action) => {
      console.error('Update API rejected:', action.payload);
    });
  },
});

export const CRUD_APIReducer = CRUD_APISlice.reducer;
export const CRUD_APISelector = (state) => state.CRUD_API.productState;
