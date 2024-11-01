
// import { Outlet } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import NavbarComponent from './navbar';
import './index.css'

const Layout = () => {
  return (
    <div>
        <div className='navbar-container'>
            <NavbarComponent />
        </div>
        <div className='content'>
            <Outlet />
        </div>
        <div className='footer'>
            {/* Footer content */}
        </div>
    </div>
    
  );
};

export default Layout;