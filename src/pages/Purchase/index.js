import React, {useEffect, useState} from "react";
import {FlexRow} from "../../components/Flex";
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import VideocamIcon from '@material-ui/icons/Videocam';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import {Box, Wrapper} from './styles';
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PayPal from '../../assets/images/pp.png'
import {useUserDispatch, useUserState} from "../../context/UserContext";
import {animateScroll as scroll} from "react-scroll";
import {loginFormValidation, registrationFormValidation} from "../Home/Validation";
import {getAllEventTypes, loginUser, registration, signOut} from "../../service/API";
import Modal from "../../components/Modals/SingUpSignIn";
import {useSnackbar} from "notistack";
import {BuyEvent} from "../../service/Purchase";
import CircularProgress from "@material-ui/core/CircularProgress";
import {purchaseValidation} from "./Validtaion";
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import {getId} from "../../service/EventTypes";
import {useParams} from "react-router-dom";
import {parseError} from "../../utils/Parser";

export default function PurchasePage(props) {
    let {dataId} = useParams();
    const {enqueueSnackbar} = useSnackbar();
    const [eventTypes, setEventTypes] = useState([]);
    useEffect(() => {
        const query = new URLSearchParams(props.location.search);

        const fromPaypal = query.get('success')
        if (fromPaypal) {
            BuyEvent(purchase,evento, setError, setPurchaseBtnLoading);
            enqueueSnackbar("La compra se realiza correctamente con PayPal", {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                },
            })
        }
        if (eventTypes?.length === 0) {
            getAllEventTypes().then((response) => {
                const list = [];
                response?.data?._embedded?.eventTypes?.forEach(value => {
                    const event = {};
                    event.id = getId(value);
                    event.name = value?.name;
                    event.amount = value?.amount;
                    list.push(event);
                });
                setEventTypes(list);
            }).catch(error => {
                let err = parseError(error);
                throw Error(err);
            })
        }
    }, [])
    const userDispatch = useUserDispatch();
    const wrapperRef = React.useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [registrationButtonLoading, setRegistrationButtonLoading] = useState(false);
    const [loginButtonLoading, setLoginButtonLoading] = useState(false);
    const [logoutBtnLoading, setLogoutBtnLoading] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [currentView, setCurrentView] = React.useState("signUp")
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        rePassword: ""
    });

    let {loggedUser, isAdmin} = useUserState();
    if (loggedUser)
        loggedUser = JSON.parse(loggedUser);

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const [purchaseBtnLoading, setPurchaseBtnLoading] = React.useState(false)
    const onClickBuy = (event) => {
        event?.preventDefault();
        let error = purchaseValidation(purchase);
        if (error.trim() !== "") {
            enqueueSnackbar(error, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                },
            })
        } else {
            BuyEvent(purchase,evento, setError, setPurchaseBtnLoading, enqueueSnackbar);
        }
    }

    const [purchase, setPurchase] = React.useState({
        username: loggedUser ? loggedUser?.username : "",
        email: loggedUser ? loggedUser?.email : "",
        comentarios: "",
        direccion: "",
        estado: "",
    })
    const [evento, setEvento] = React.useState(dataId);

    const handleEventOnChange = (event) => {
        setEvento(event.target.value);
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setPurchase({...purchase, [name]: value})

    }

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
                user.username,
                user.password,
                props.history,
                setLoginButtonLoading,
                setError,
            )
        }
    }

    const handleSignOut = () => {
        signOut(userDispatch, props?.history, setLogoutBtnLoading);
    }

    const handleSignInBtn = () => {
        changeView("logIn");
        setShowModal(true);
    }

    const handleSignUpBtn = () => {
        changeView("signUp");
        setShowModal(true);
    }

    if (error) {
        enqueueSnackbar(error, {
            variant: 'error',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'left',
            },
        })
        setError(null);
    }

    const handlePaypal = () => {
        let error = purchaseValidation(purchase);
        if (error.trim() !== "") {
            enqueueSnackbar(error, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                },
            })
        } else {
            props.history.push(`/paypal/${evento}`);
        }
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
            <Wrapper>
                <h1>TEXT</h1>
                <Box>
                    <FlexRow>
                        <VideocamIcon style={{width: "55px", height: "55px", marginRight: "10px", marginTop: "25px"}}
                                      color={"primary"}/>
                        <FormControl variant="outlined" style={{minWidth: 310, marginTop: "25px"}}>
                            <InputLabel id="demo-simple-select-outlined-label">Evento</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={evento}
                                onChange={handleEventOnChange}
                                label="Evento">
                                {eventTypes?.map(value => {
                                    return (
                                        <MenuItem key={value?.id} value={value?.id}>{value?.name}</MenuItem>
                                    );
                                })}
                            </Select>

                        </FormControl>
                    </FlexRow>
                    <FlexRow style={{marginTop: "55px"}}>
                        <PersonIcon style={{minWidth: 100, width: "55px", height: "55px", marginRight: "10px"}}
                                    color={"primary"}/>
                        <TextField label="Nombre de usario" name="username" onChange={handleInputChange}
                                   value={purchase.username} type="text" variant="outlined"/>

                        <ChatBubbleIcon style={{minWidth: 100, width: "55px", height: "55px", marginRight: "10px"}}
                                        color={"primary"}/>
                        <TextField label="Comentarios" value={purchase.comentarios} name="comentarios"
                                   onChange={handleInputChange} type="text" variant="outlined"/>

                        <MailIcon style={{minWidth: 100, width: "55px", height: "55px", marginRight: "10px"}}
                                  color={"primary"}/>
                        <TextField label="Correo electrónico" value={purchase.email} name="email"
                                   onChange={handleInputChange} type="text" variant="outlined"/>
                    </FlexRow>
                    <FlexRow style={{marginTop: "55px"}}>
                        <LocationCityIcon style={{minWidth: 100, width: "55px", height: "55px", marginRight: "10px"}}
                                          color={"primary"}/>
                        <TextField label="Estado" value={purchase.estado} name="estado" onChange={handleInputChange}
                                   type="text" variant="outlined"/>


                        <HomeIcon style={{minWidth: 100, width: "55px", height: "55px", marginRight: "10px"}}
                                  color={"primary"}/>
                        <TextField label="La dirección" value={purchase.direccion} name="direccion"
                                   onChange={handleInputChange} type="text" variant="outlined"/>

                    </FlexRow>
                    <FlexRow style={{marginTop: "55px"}}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </FlexRow>
                </Box>
                <FlexRow>
                    <img src={PayPal} style={{width: "60px", marginRight: "10px"}} alt="paypal"/>
                    <Button variant="contained" color="default" onClick={handlePaypal}>Conectar paypal
                    </Button>
                </FlexRow>
                <FlexRow style={{marginTop: "25px"}}>
                    {/* <img style={{width: "40px", height: "40px", margintRight: "10px"}} src={PayPal} /> */}
                    <Button variant="contained" color="primary" onClick={onClickBuy}>
                        {purchaseBtnLoading ? <CircularProgress/> : "Comprar"}
                    </Button>
                </FlexRow>
            </Wrapper>
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
}