import React from 'react';
import ReactDOM from 'react-dom/client';
import {NextUIProvider} from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./route";
import store from './store/store'
import { Provider } from 'react-redux'

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <NextUIProvider>
        {/* <App /> */}
        {/* <main className="common-dark text-foreground bg-background">
          <App />
        </main> */}
        {/* 使用 RouterProvider 并将 router 实例传递给它 */}
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </NextUIProvider>
    </React.StrictMode>,
  );
}
