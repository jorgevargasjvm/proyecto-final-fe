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

const Sidebar = ({isOpen, toggle, loggedUser, handleSignOut, logoutBtnLoading, handleSignInBtn, handleSignUpBtn, isAdmin}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="pre-boda" onClick={toggle}>
                        PRE-BODA
                    </SidebarLink>
                    <SidebarLink to="boda" onClick={toggle}>
                        BODA
                    </SidebarLink>
                    <SidebarLink to="cumpleanos" onClick={toggle}>
                        CUMPLEANOS
                    </SidebarLink>
                    <SidebarLink to="vide-de-evento" onClick={toggle}>
                        VIDEO DE EVENTO
                    </SidebarLink>
                    {isAdmin ? <SidebarLink to="/admin" onClick={toggle}>
                        ADMIN PANEL
                    </SidebarLink> : <></>}
                </SidebarMenu>
                {loggedUser ?
                    <SideBtnWrap>
                        <SidebarRoute to='#' onClick={handleSignOut}>{logoutBtnLoading ?
                            <CircularProgress/> : `Desconectar ${loggedUser?.name}`}</SidebarRoute>
                    </SideBtnWrap> :
                    <FlexCol>
                        <SideBtnWrap>
                            <SidebarRoute to="#" onClick={handleSignInBtn}>Inicie sesión</SidebarRoute>
                        </SideBtnWrap>
                        <SideBtnWrap>
                            <SidebarRoute to="#" onClick={handleSignUpBtn}>Regístrese</SidebarRoute>
                        </SideBtnWrap>
                    </FlexCol>}
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
