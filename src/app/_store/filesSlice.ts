import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FileItem } from '../_types';

interface FilesState {
  items: FileItem[];
  loading: boolean;
  error: string | null;
}

const initialState: FilesState = {
  items: [],
  loading: false,
  error: null,
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<FileItem>) => {
      state.items.push(action.payload);
    },
    removeFile: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(file => file.id !== action.payload);
    },
    clearFiles: (state) => {
      state.items = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addFile, removeFile, clearFiles, setLoading, setError } = filesSlice.actions;
export default filesSlice.reducer;