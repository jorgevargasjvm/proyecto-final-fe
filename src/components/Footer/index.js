import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { FooterContainer, FooterLink, FooterLinkItems, FooterLinkTitle, FooterLinksContainer, FooterLinksWrapper, FooterWrrap, SocialIconLink, SocialIcons, SocialLogo, SocialMedia, SocialMediaWrap, WebsiteRights } from './FooterElements'
import { animateScroll as scroll } from 'react-scroll'

const Footer = () => {

    const toggleHome = () => {
        scroll.scrollToTop()
    }


    return (
        <FooterContainer>
            <FooterWrrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>Text</FooterLinkTitle>
                            <FooterLink to='/signin'>Text</FooterLink>
                            <FooterLink to='/signin'>Text</FooterLink>
                            <FooterLink to='/signin'>Text</FooterLink>
                            <FooterLink to='/signin'>Text</FooterLink>
                            <FooterLink to='/signin'>Text</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>Text</FooterLinkTitle>
                            <FooterLink to='/signin'>Text</FooterLink>
                            <FooterLink to='/signin'>Text</FooterLink>
                            <FooterLink to='/signin'>Text</FooterLink>
                            <FooterLink to='/signin'>Text</FooterLink>
                            <FooterLink to='/signin'>Text</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>Text</FooterLinkTitle>
                            <FooterLink to='/signin'>Text</FooterLink>
                            <FooterLink to='/signin'>Text</FooterLink>
                            <FooterLink to='/signin'>Text</FooterLink>
                            <FooterLink to='/signin'>Text</FooterLink>
                            <FooterLink to='/signin'>Text</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>Text</FooterLinkTitle>
                            <FooterLink to='/signin'>Text</FooterLink>
                            <FooterLink to='/signin'>Text</FooterLink>
                            <FooterLink to='/signin'>Text</FooterLink>
                            <FooterLink to='/signin'>Text</FooterLink>
                            <FooterLink to='/signin'>Text</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                </FooterLinksContainer>
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo to='/' onClick={toggleHome}>text</SocialLogo>
                        <WebsiteRights>Text ©{new Date().getFullYear()} All rights reserved.</WebsiteRights>
                        <SocialIcons>
                            <SocialIconLink href='/' target="_blank" aria-label="Facebook">
                                <FaFacebook />
                            </SocialIconLink>
                            <SocialIconLink href='/' target="_blank" aria-label="Instagram">
                                <FaInstagram />
                            </SocialIconLink>
                            <SocialIconLink href='/' target="_blank" aria-label="Youtube">
                                <FaYoutube />
                            </SocialIconLink>
                            <SocialIconLink href='/' target="_blank" aria-label="Twitter">
                                <FaTwitter />
                            </SocialIconLink>
                            <SocialIconLink href='/' target="_blank" aria-label="Linkedin">
                                <FaLinkedin />
                            </SocialIconLink>
                        </SocialIcons>
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrrap>
        </FooterContainer>
    )
}

export default Footer
