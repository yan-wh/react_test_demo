// 顶部导航组件
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button,
    //  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar 
    } from "@nextui-org/react";
// import { ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale } from "./icons";
import { AcmeLogo } from "./acmeLogo";
import './index.css'

const NavbarComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<Boolean>(false);

    const menuItems = [
        ["图片上传", "/test"],
        ["武功山回忆录", "/home"],
        "登出",
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <AcmeLogo />
                    <p className="font-bold text-inherit">武功山五人行</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link to="/test">
                        <span>照片上传</span>
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link to="/home">
                        <span>五人行回忆录</span>
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        登录
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item[0]}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            to={item[1]}
                        >
                            {item[0]}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};

export default NavbarComponent;