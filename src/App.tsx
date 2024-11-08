import './App.css';
import React, { useEffect } from 'react';
import Layout from './layout';

// 应用组件
const App: React.FC = () => {

  useEffect(() => {
    // 获取当前页面宽度
    const width = document.documentElement.clientWidth;
    console.log('初始页面宽度：', width);
    // 监听页面宽度变化
    window.onresize = () => {
      const newWidth = document.documentElement.clientWidth;
      console.log('视窗大小改变：', newWidth);
      // if (newWidth !== width) {
      //   window.location.reload();
      // }
    }
  }, [])

  return (
    // <div className="common-dark text-foreground bg-background App">
    <div className="App">
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

// docker run -d --name my-alpine \
// -p 8081:80 \
// -v /opt/share-images:/usr/share/images my-alpine

// nginx容器构建
// docker run -d -p 8080:80 -v /opt/nginx/config:/etc/nginx/conf.d -v /opt/nginx/html:/usr/share/nginx/html --name my-nginx my-nginx

// nodejs容器构建
// docker run -d -p 8082:3000 -v /opt/nodejs-app:/app --name my-nodejs my-nodejs

/**
 * 8080为web服务端口，8081为文件系统端口，8082为node服务端口
 * 0、初始化文件系统
 * 
 * 步骤：
 * docker run -d --name my-alpine \
 * -p 8081:80 \
 * -v /opt/share-images:/usr/share/images my-alpine
 * 
 * 
 * 1、nginx容器关联到文件系统
 * 2、nginx容器关联到docker网络
 * 3、nginx容器关联到docker服务
 */