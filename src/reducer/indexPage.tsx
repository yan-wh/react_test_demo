import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import store, { AppThunk, AppDispatch } from '../store';

interface Index{
    id: string;
    completed: boolean;
    text: string;
}

const initialState: Index = {
    id: '1',
    completed: false,
    text: '测试'
}
const indexSlice = createSlice({
    name: 'indexPage',
    initialState,
    reducers: {
        getIndexPageData(state, action: PayloadAction<Index>) {
            console.log('state', state.completed)
            console.log('action', action.payload.completed)
            state.completed = action.payload.completed
        },
        toggleTodo(state, action: PayloadAction<Index>) {
            console.log('toggleTodo')
        },
    }
})

export const {getIndexPageData, toggleTodo } = indexSlice.actions;

// export const getIndexPageData = (text: string): AppThunk => async(dispatch: AppDispatch) => {
//     const newIndex: Index = {
//         id: Math.random().toString(36).substr(2, 9),
//         completed: false,
//         text: text,
//     }
//     dispatch(indexSlice.actions.getIndexPageData(newIndex))
// }

export default indexSlice.reducer;