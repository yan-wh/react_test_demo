// 顶部导航组件

import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
import { ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale } from "./icons";
import { AcmeLogo } from "./acmeLogo";
import './index.css'

const NavbarComponent = () => {
    const icons = {
        chevron: <ChevronDown fill="currentColor" size={16} />,
        scale: <Scale className="text-warning" fill="currentColor" size={30} />,
        lock: <Lock className="text-success" fill="currentColor" size={30} />,
        activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
        flash: <Flash className="text-primary" fill="currentColor" size={30} />,
        server: <Server className="text-success" fill="currentColor" size={30} />,
        user: <TagUser className="text-danger" fill="currentColor" size={30} />,
    };

    return (
        <Navbar position="static" isBordered
            classNames={{
                base: 'py-3',
                brand: 'text-2xl',
                item: 'text-2xl',
                
            }}
        >
            <NavbarBrand>
                <AcmeLogo />
                <p className="font-bold text-inherit">ACME</p>
            </NavbarBrand>
            <NavbarContent className="sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link to="/test">
                        <span>Test</span>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/home">
                        <span>Home</span>
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default NavbarComponent;