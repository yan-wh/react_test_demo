// 该文件以 .tsx 结尾的原因是因为该文件内包含了 JSX 语法，因为 TypeScript 需要正确地处理 JSX


import { createBrowserRouter } from "react-router-dom";
// import { commonRoute } from "@/types/index.ts"
import App from '../App'; // ts中只支持相对和绝对路径
import ErrorPage from '../pages/error'
import Test from '../pages/test'
// import Contact from '../routes/contact'
import Home from '../pages/home'

export const router: any = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  }
  // ...其他路由配置
]);