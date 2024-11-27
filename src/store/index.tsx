import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定义状态类型
interface IndexState {
  msgStatus: boolean;
  msgInfo: string;
  msgTitle: string;
  contentLoading: boolean;
  msgTimeout: number;
  [key: string]: any;
}

// 使用定义的状态类型作为 initialState 的类型
const initialState: IndexState = {
  msgStatus: false,
  msgInfo: '',
  msgTitle: '',
  contentLoading: false, // 内容区域加载状态
  msgTimeout: 0, // 消息提示框定时器
  delStatus: false // 删除图片状态
};

export const indexStore = createSlice({
  name: 'index',
  initialState,
  reducers: {
    // 消息提示框状态
    setMsgStatus: (state, action: PayloadAction<boolean>) => {
      state.msgStatus = action.payload;
    },
    // body部分loading状态
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.contentLoading = action.payload;
    },
    setState: (state, action: PayloadAction<Partial<IndexState>>) => {
      Object.keys(action.payload).forEach((key) => {
        if (key in state) {
          state[key] = action.payload[key];
        }
      });
    },
  },
});

// 每个 case reducer 函数会生成对应的 Action creators
export const { setMsgStatus, setLoadingStatus, setState } = indexStore.actions;

export default indexStore.reducer;
