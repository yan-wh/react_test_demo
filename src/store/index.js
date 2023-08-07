import { configureStore, createSlice } from "@reduxjs/toolkit";
// import counterSlice from 
// import 

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        name: '空'
    },
    reducers: {
        incremented: state => {
            // Redux Toolkit 允许在 reducers 中编写 "mutating" 逻辑。
            // 它实际上并没有改变 state，因为使用的是 Immer 库，检测到“草稿 state”的变化并产生一个全新的
            // 基于这些更改的不可变的 state。
            state.value += 1;
            state.name = '测试+'
        },
        decremented: state => {
            state.value -= 1;
            state.name = '测试-'
        }
    }
})

export const { incremented, decremented } = counterSlice.actions;

const store = configureStore({
    reducer: counterSlice.reducer
})

//可以订阅 store
store.subscribe(()=>console.log(store.getState()))

// 将我们创建的 action 对象传递给 `dispatch`
store.dispatch(incremented())
// {value: 1}
store.dispatch(incremented())
// {value: 2}
store.dispatch(decremented())
// {value: 1}