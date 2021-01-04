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
import { animateScroll as scroll } from 'react-scroll'

const Navbar = ({toggle, loggedUser, handleSignOut, logoutBtnLoading, handleSignInBtn, handleSignUpBtn, isAdmin}) => {

  const toggleHome = () => {
        scroll.scrollToTop()
    };
  
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
                        <NavLinks to='cumpleanos'>CUMPLEANO</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to='video-de-evento'>VIDEO DE EVENTO</NavLinks>
                    </NavItem>
                    {isAdmin ? <NavItem to="/admin">
                        <NavAdminLink to='/admin'>TABLERO
                        </NavAdminLink>
                    </NavItem> : <></>}
                </NavMenu>

                {loggedUser ?
                    <NavBtn>
                        <NavBtnLink to="#" onClick={handleSignOut}>{logoutBtnLoading ?
                            <CircularProgress/> : `Desconectar ${loggedUser?.name}`}</NavBtnLink>
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
