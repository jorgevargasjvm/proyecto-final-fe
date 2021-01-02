import React from 'react';
import {FaBars} from 'react-icons/fa'
import {
    MobileIcon,
    Nav,
    NavAdminLink,
    NavbarContainer,
    NavBtn,
    NavBtnLink,
    NavItem,
    NavLinks,
    NavLogo,
    NavMenu
} from './NavbarElements';
import CircularProgress from "@material-ui/core/CircularProgress";
import {FlexRow} from "../Flex";

const Navbar = ({toggle, toggleHome, loggedUser, handleSignOut, logoutBtnLoading, handleSignInBtn, handleSignUpBtn, isAdmin}) => {
    return (
        <Nav>
            <NavbarContainer>
                <NavLogo to='/' onClick={toggleHome}>Proyecto</NavLogo>
                <MobileIcon onClick={toggle}>
                    <FaBars/>
                </MobileIcon>
                <NavMenu>
                    <NavItem>
                        <NavLinks to='pre-boda'>PRE-BODA</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to='boda'>BODA</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to='cumpeano'>CUMPLEANO</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to='video-de-evento'>VIDEO DE EVENTO</NavLinks>
                    </NavItem>
                    {isAdmin ? <NavItem to="/admin">
                        <NavAdminLink to='/admin'>ADMIN PANEL</NavAdminLink>
                    </NavItem> : <></>}
                </NavMenu>

                {loggedUser ?
                    <NavBtn>
                        <NavBtnLink to="#" onClick={handleSignOut}>{logoutBtnLoading ?
                            <CircularProgress/> : `Sign out ${loggedUser?.name}`}</NavBtnLink>
                    </NavBtn> :
                    <FlexRow>
                        <NavBtn>
                            <NavBtnLink to="#" onClick={handleSignInBtn}>Iniciar seasion</NavBtnLink>
                        </NavBtn>
                        <NavBtn>
                            <NavBtnLink to="#" onClick={handleSignUpBtn}>Crear cuenta</NavBtnLink>
                        </NavBtn>
                    </FlexRow>
                }

            </NavbarContainer>
        </Nav>
    )
}

export default Navbar;
