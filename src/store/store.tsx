import { configureStore } from '@reduxjs/toolkit'
import indexReducer from './index'

export default configureStore({
  reducer: {
    index: indexReducer
  }
})