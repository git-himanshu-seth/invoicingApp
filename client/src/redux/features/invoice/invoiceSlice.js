import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { invoiceServices } from "../../services/invoice.services";

const initialState = {
  value: null,
  status: "idle",
  error: null,
};

export const gnerateInvoice = createAsyncThunk(
  "department",
  async (action, { rejectWithValue }) => {
    try {
      const res = await invoiceServices.createinvoice(action);
      if (res) {
        if (res.data.status === "success") {
          return {};
        }
      } else {
        return rejectWithValue(res?.message || "something went wrong");
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateState = createAsyncThunk(
  "department",
  (action, { rejectWithValue }) => {
    try {
      const res = {};
      if (res) {
        if (res.data.status === "success") return {};
      } else {
        return {};
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gnerateInvoice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(gnerateInvoice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(gnerateInvoice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default invoiceSlice.reducer;
