
// import { Outlet } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarComponent from './navbar';
import Message from '../components/Message';
import { useSelector, 
  // useDispatch 
} from 'react-redux'
// import { setState } from '../store/index'
import './index.css'

const Layout = () => {
  const [loadingStyle, setLoadingStyle] = useState({});
  const contentLoading = useSelector((state: any) => state.index.contentLoading);
  const [bodyHeight, setBodyHeight] = useState(0);

  const navRef = useRef(null);

  // const dispatch = useDispatch();

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

  useEffect(() => {
    const windowHeight = window.innerHeight;
    if (navRef.current) {
      setBodyHeight(windowHeight - navRef.current.clientHeight)
    }
  }, [])

  return (
    <>
      <div className='w-full h-full relative'>
        <Message />
        <div className='w-full' ref={navRef}>
          <NavbarComponent />
        </div>
        <div className='w-full' style={{height: bodyHeight}}>
          <Outlet />
        </div>
        {/* <div className='footer'>
        </div> */}
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