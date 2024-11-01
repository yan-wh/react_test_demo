import './App.css';
import React from 'react';
import Layout from './layout';

// 应用组件
const App: React.FC = () => {
  return (
    <div className="common-dark text-foreground bg-background App">
      <Layout />
    </div>

    // 不太推荐的路由嵌套写法
    // <BrowserRouter>
    //   <div className='App'>
    //     <NavbarComponent />
    //     <div>
    //       <Routes>
    //         <Route path="/" element={<div>首页</div>} />
    //         <Route path="/test" element={<TestPage />} />
    //       </Routes>
    //     </div>
    //   </div>
    // </BrowserRouter>
  );
};

export default App;
