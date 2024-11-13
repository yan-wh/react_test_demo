
// import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarComponent from './navbar';
import Message from '../components/Message';
import { useSelector } from 'react-redux'
import './index.css'

const Layout = () => {
  const [loadingStyle, setLoadingStyle] = useState({});
  const contentLoading = useSelector((state: any) => state.index.contentLoading);

  useEffect(() => {
    if(contentLoading) {
      setLoadingStyle({
        zIndex: 999,
        opacity: 1
      })
    } else {
      setLoadingStyle({
        zIndex: -10,
        opacity: 0
      })
    }
  }, [contentLoading])

  return (
    <>
      <div className='w-full h-full relative'>
        <Message />
        <div className='w-full'>
          <NavbarComponent />
        </div>
        <div className='w-full h-[80%]'>
          <Outlet />
        </div>
        <div className='footer'>
          {/* Footer content */}
        </div>
      </div>
      <div className='absolute left-0 top-0 w-full h-full' style={{background: 'rgba(0,0,0,0.8)', ...loadingStyle}}>
        <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
          <span className="loader"></span>
        </div>
      </div>
    </>
  );
};

export default Layout;