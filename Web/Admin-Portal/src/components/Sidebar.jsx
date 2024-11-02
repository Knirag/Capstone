import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons/lib";
import fLogo from "../assets/Images/logo.png";
import Colours from "../assets/Colours/Colours";

const Nav = styled.div`
  background: none;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 15;
`;

const NavIcon = styled(Link)`
  font-size: 2rem;
  height: 80px;
  display: flex;
  align-items: center;
  color: ${Colours.darkGray};
  text-decoration: none;
`;

const LogoutButton = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  color: ${Colours.darkGray};
  cursor: pointer;
  margin-right: 1rem;
`;

const SidebarNav = styled.nav`
  background: ${Colours.skyblue};
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
  padding-top: 1rem;
`;

const SidebarWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 1rem;
  text-decoration: none;
  color: ${Colours.darkGray};
  width: 100%;
  &:hover {
    background: ${Colours.lightGray};
    color: ${Colours.white};
  }
  span {
    margin-left: 16px;
    font-size: 1rem;
  }
`;

const Logo = styled.img`
  margin-top: auto;
  padding: 20px 0;
  width: 80px;
  height: auto;
`;

const SidebarItem = ({ item }) => (
  <SidebarLink to={item.path}>
    {item.icon}
    <span>{item.title}</span>
  </SidebarLink>
);

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();

  const showSidebar = () => setSidebar(!sidebar);

  const logOut = () => {
    localStorage.removeItem("authToken");
    navigate("/auth");
  };

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <Nav>
        <NavIcon to="#">
          <FaIcons.FaBars onClick={showSidebar} />
        </NavIcon>
        <LogoutButton onClick={logOut} title="Click here to logout">
          <LuLogOut />
        </LogoutButton>
      </Nav>
      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>

          {SidebarData.map((item, index) => (
            <SidebarItem item={item} key={index} />
          ))}
          <Logo src={fLogo} alt="Logo" />
        </SidebarWrap>
      </SidebarNav>
    </IconContext.Provider>
  );
};

export default Sidebar;
