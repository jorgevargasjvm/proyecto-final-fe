import React, {useState, useEffect} from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import AnimatedBackground from "../../components/AnimatedBackground";
import Footer from "../../components/Footer";
import Modal from "../../components/Modals/SingUpSignIn";
import {useSnackbar} from "notistack";
import {useCookies} from 'react-cookie';
import {loginFormValidation, registrationFormValidation} from "./Validation";
import {animateScroll as scroll} from "react-scroll";
import InfoSection from "../../components/InfoSection";
import {homeObjFour, homeObjOne, homeObjThree, homeObjTwo} from '../Data'

export default function HomePage() {
    const [loggedUser, setLoggedUser] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['logged_user']);
    useEffect(() => {
        if (cookies['logged_user']) {
            setLoggedUser(cookies['logged_user']);
        }
    }, [cookies]);

    const [isOpen, setIsOpen] = useState(false);
    const [registrationButtonLoading, setRegistrationButtonLoading] = useState(false);
    const [loginButtonLoading, setLoginButtonLoading] = useState(false);
    const [logoutBtnLoading, setLogoutBtnLoading] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [currentView, setCurrentView] = React.useState("signUp")
    const wrapperRef = React.useRef(null);
    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        rePassword: ""
    });

    const {enqueueSnackbar} = useSnackbar();

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const changeView = (view) => {
        setCurrentView(view)
    }

    const toggleHome = () => {
        scroll.scrollToTop()
    };

    const onSignInLoginInputChange = (event) => {
        const {name, value} = event?.target;
        setUser({...user, [name]: value})
    }

    const handleRegistration = (event) => {
        event?.preventDefault();
        let error = registrationFormValidation(user);
        if (error.trim() !== "") {
            enqueueSnackbar(error, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                },
            })
        } else {
            //registrationFunctions(user, setUser, setRegistrationButtonLoading, enqueueSnackbar, handleCloseModal);
        }
    }
    const handleLogin = (event) => {
        event?.preventDefault();
        let error = loginFormValidation(user);
        if (error.trim() !== "") {
            enqueueSnackbar(error, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                },
            })
        } else {
            //loginFunctions(user, setUser, setLoginButtonLoading, setLoggedUser, enqueueSnackbar, handleCloseModal, setCookie);
        }
    }

    const handleSignOut = () => {
        //logoutFunction(setLogoutBtnLoading, setLoggedUser, enqueueSnackbar, removeCookie);
    }

    const handleSignInBtn = () =>{
        changeView("logIn");
        setShowModal(true);
    }

    const handleSignUpBtn = () =>{
        changeView("signUp");
        setShowModal(true);
    }

    return (
        <div>
            <Sidebar
                isOpen={isOpen}
                handleSignInBtn={handleSignInBtn}
                handleSignUpBtn={handleSignUpBtn}
                handleSignOut={handleSignOut}
                logoutBtnLoading={logoutBtnLoading}
                loggedUser={loggedUser}
                toggle={toggle}/>
            <Navbar
                toggle={toggle}
                toggleHome={toggleHome}
                loggedUser={loggedUser}
                handleSignOut={handleSignOut}
                handleSignInBtn={handleSignInBtn}
                handleSignUpBtn={handleSignUpBtn}
                logoutBtnLoading={logoutBtnLoading}
            />
            <AnimatedBackground/>
            <InfoSection {...homeObjOne} />
            <InfoSection {...homeObjTwo} />
            <InfoSection {...homeObjThree} />
            <InfoSection {...homeObjFour} />
            <Footer/>
            <Modal
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                changeView={changeView}
                currentView={currentView}
                onSignInLoginInputChange={onSignInLoginInputChange}
                user={user}
                registrationButtonLoading={registrationButtonLoading}
                loginButtonLoading={loginButtonLoading}
                handleRegistration={handleRegistration}
                handleLogin={handleLogin}
                wrapperRef={wrapperRef}/>
        </div>
    )
};