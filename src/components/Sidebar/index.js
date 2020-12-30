import React from 'react'
import {
    CloseIcon,
    Icon,
    SidebarContainer,
    SidebarLink,
    SidebarMenu,
    SidebarRoute,
    SidebarWrapper,
    SideBtnWrap
} from './SidebarElements';
import CircularProgress from "@material-ui/core/CircularProgress";
import {FlexCol} from "../Flex";

const Sidebar = ({isOpen, toggle, loggedUser, handleSignOut, logoutBtnLoading, handleSignInBtn, handleSignUpBtn}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="about" onClick={toggle}>
                        Instruction
                    </SidebarLink>
                    <SidebarLink to="discover" onClick={toggle}>
                        Process image
                    </SidebarLink>
                    <SidebarLink to="translate" onClick={toggle}>
                        Translate
                    </SidebarLink>
                    <SidebarLink to="services" onClick={toggle}>
                        Recent projects
                    </SidebarLink>
                </SidebarMenu>
                {loggedUser ?
                    <SideBtnWrap>
                        <SidebarRoute to='#' onClick={handleSignOut}>{logoutBtnLoading ?
                            <CircularProgress/> : `Sign out ${loggedUser?.name + ' ' + loggedUser?.surname}`}</SidebarRoute>
                    </SideBtnWrap> :
                    <FlexCol>
                        <SideBtnWrap>
                            <SidebarRoute to="#" onClick={handleSignInBtn}>Sign In</SidebarRoute>
                        </SideBtnWrap>
                        <SideBtnWrap>
                            <SidebarRoute to="#" onClick={handleSignUpBtn}>Sign Up</SidebarRoute>
                        </SideBtnWrap>
                    </FlexCol>}
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
