import React from 'react';
import {FaBars} from 'react-icons/fa'
import {
    MobileIcon,
    Nav,
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

const Navbar = ({toggle, toggleHome, loggedUser, handleSignOut, logoutBtnLoading, handleSignInBtn, handleSignUpBtn}) => {

    return (
        <Nav>
            <NavbarContainer>
                <NavLogo to='/' onClick={toggleHome}>moniskhan45</NavLogo>
                <MobileIcon onClick={toggle}>
                    <FaBars/>
                </MobileIcon>
                <NavMenu>
                    <NavItem>
                        <NavLinks to='about'>Instruction</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to='discover'>Process image</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to='translate'>Translate</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to='services'>Recent projects</NavLinks>
                    </NavItem>
                </NavMenu>

                {loggedUser ?
                    <NavBtn>
                        <NavBtnLink to="#" onClick={handleSignOut}>{logoutBtnLoading? <CircularProgress/> : `Sign out ${loggedUser?.name + ' ' + loggedUser?.surname}`}</NavBtnLink>
                    </NavBtn> :
                    <FlexRow>
                        <NavBtn>
                            <NavBtnLink to="#" onClick={handleSignInBtn}>Sign In</NavBtnLink>
                        </NavBtn>
                        <NavBtn>
                            <NavBtnLink to="#" onClick={handleSignUpBtn}>Sign Up</NavBtnLink>
                        </NavBtn>
                    </FlexRow>
                }

            </NavbarContainer>
        </Nav>
    )
}

export default Navbar;
