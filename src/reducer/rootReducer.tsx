import { combineReducers } from "@reduxjs/toolkit";
import indexPage from './indexPage'

const rootReducer = combineReducers({
    indexPage,
})

//这样写也行，但是最好是写到store中，reducer就只做reducer相关的事，store也只做store相关的事
// export type RootState = ReturnType<typeof rootReducer>

export default rootReducer