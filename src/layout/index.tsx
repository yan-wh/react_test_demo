
// import { Outlet } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import NavbarComponent from './navbar';
import './index.css'

const Layout = () => {
  return (
    <div className='w-full h-full'>
      <div className='w-full h-[20%]'>
        <NavbarComponent />
      </div>
      <div className='w-full h-[80%]'>
        <Outlet />
      </div>
      <div className='footer'>
        {/* Footer content */}
      </div>
    </div>
    
  );
};

export default Layout;