import { createSlice } from '@reduxjs/toolkit';
import { currencyCode, dateFormatCode } from '@/app/reusableComponent/JsonData';

interface User {
    name: string;
    countryCode: string;
  }

// Helper function to get currency and date format based on countryCode
const getCurrencyByCode = (countryCode:string) => {
  return currencyCode.find(item => item.countryCode === countryCode)?.currency || '';
};

const getDateFormatByCode = (countryCode:string) => {
  return dateFormatCode.find(item => item.countryCode === countryCode)?.dateFormat || '';
};

// Create the slice
const userCurrencySlice = createSlice({
  name: 'userCurrency',
  initialState: {
    user: null as User | null, // Initially no user data, will be set after login
    currency: '',
    dateFormat: ''
  },
  reducers: {
    // Action to update user information after login
    updateUser(state, action) {
      const { name, countryCode } = action.payload;
      state.user = { name, countryCode };
      state.currency = getCurrencyByCode(countryCode);
      state.dateFormat = getDateFormatByCode(countryCode);
    }
  }
});

// Export actions to use in components
export const { updateUser } = userCurrencySlice.actions;

export default userCurrencySlice.reducer;
