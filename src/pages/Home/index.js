import React, {useState} from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import AnimatedBackground from "../../components/AnimatedBackground";
import Footer from "../../components/Footer";
import Modal from "../../components/Modals/SingUpSignIn";
import {useSnackbar} from "notistack";
import {loginFormValidation, registrationFormValidation} from "./Validation";
import {animateScroll as scroll} from "react-scroll";
import {loginUser, registration, signOut} from "../../service/API";
import {useUserDispatch, useUserState} from "../../context/UserContext";

export default function HomePage(props) {
    let {loggedUser, isAdmin} = useUserState();
    if(loggedUser)
        loggedUser = JSON.parse(loggedUser);
    const userDispatch = useUserDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
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
            registration(userDispatch, user, props.history, setRegistrationButtonLoading, setError);
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
            loginUser(
                userDispatch,
                user.email,
                user.password,
                props.history,
                setLoginButtonLoading,
                setError,
            )
        }
    }

    const handleSignOut = () => {
        signOut(userDispatch, props?.history);
    }

    const handleSignInBtn = () => {
        changeView("logIn");
        setShowModal(true);
    }

    const handleSignUpBtn = () => {
        changeView("signUp");
        setShowModal(true);
    }

    if(error)
        enqueueSnackbar(error, {
            variant: 'error',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'left',
            },
        })

    return (
        <div>
            <Sidebar
                isOpen={isOpen}
                handleSignInBtn={handleSignInBtn}
                handleSignUpBtn={handleSignUpBtn}
                handleSignOut={handleSignOut}
                logoutBtnLoading={logoutBtnLoading}
                loggedUser={loggedUser}
                isAdmin={isAdmin}
                toggle={toggle}/>
            <Navbar
                toggle={toggle}
                toggleHome={toggleHome}
                loggedUser={loggedUser}
                handleSignOut={handleSignOut}
                handleSignInBtn={handleSignInBtn}
                handleSignUpBtn={handleSignUpBtn}
                isAdmin={isAdmin}
                logoutBtnLoading={logoutBtnLoading}
            />
            <AnimatedBackground/>
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