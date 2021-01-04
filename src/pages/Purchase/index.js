import React, {useEffect, useRef, useState} from "react";
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
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {useUserDispatch, useUserState} from "../../context/UserContext";
import {animateScroll as scroll} from "react-scroll";
import {loginFormValidation, registrationFormValidation} from "../Home/Validation";
import {getAllEventTypes, loginUser, registration, signOut} from "../../service/API";
import Modal from "../../components/Modals/SingUpSignIn";
import {useSnackbar} from "notistack";
import {BuyEvent} from "../../service/Purchase";
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import {getId} from "../../service/EventTypes";
import {useParams} from "react-router-dom";
import {parseError} from "../../utils/Parser";

export default function PurchasePage(props) {
    let {dataId} = useParams();
    let {loggedUser, isAdmin} = useUserState();
    if (loggedUser)
        loggedUser = JSON.parse(loggedUser);
    const userDispatch = useUserDispatch();
    const wrapperRef = useRef(null);
    const paypalRef = React.useRef();

    const [paid, setPaid] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [eventTypes, setEventTypes] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [registrationButtonLoading, setRegistrationButtonLoading] = useState(false);
    const [loginButtonLoading, setLoginButtonLoading] = useState(false);
    const [logoutBtnLoading, setLogoutBtnLoading] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [currentView, setCurrentView] = useState("signUp")
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [purchaseBtnLoading, setPurchaseBtnLoading] = useState(false)
    const [purchase, setPurchase] = useState({
        username: loggedUser ? loggedUser?.username : "",
        email: loggedUser ? loggedUser?.email : "",
        comentarios: "",
        direccion: "",
        estado: "",
    })
    const [evento, setEvento] = useState(null);
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        rePassword: ""
    });

    useEffect(() => {
        if (paid) {
            BuyEvent(purchase, evento, setError, setPurchaseBtnLoading);
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
                    let id = parseInt(getId(value));
                    event.id = id;
                    event.name = value?.name;
                    event.amount = value?.amount;
                    if (id === parseInt(dataId)) {
                        setEvento(event);
                        reRenderPayPal(event, paypalRef, setPaid);
                    }
                    list.push(event);
                });
                setEventTypes(list);
            }).catch(error => {
                let err = parseError(error);
                setError(err);
            })
        }
    }, [])

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleEventOnChange = (event) => {
        setEvento(eventTypes.filter(value => value?.id === event.target.value)[0]);
        reRenderPayPal(eventTypes.filter(value => value?.id === event.target.value)[0], paypalRef, setPaid);
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
                <h1>Programación de eventos</h1>
                <Box>
                    <FlexRow>
                        <VideocamIcon style={{width: "55px", height: "55px", marginRight: "10px", marginTop: "25px"}}
                                      color={"primary"}/>
                        <FormControl variant="outlined" style={{minWidth: 310, marginTop: "25px"}}>
                            <InputLabel>Evento</InputLabel>
                            <Select
                                value={evento?.id ?? ""}
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
                <div>
                    <h4>La cantidad total es EUR : {evento?.amount}</h4>
                    <div ref={paypalRef}/>
                </div>
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

function reRenderPayPal(evento, paypalRef, setPaid) {
    if (paypalRef?.current.children[0]) {
        paypalRef.current.children[0].innerHTML = "";
    }
    window.paypal
        .Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: `Tu orden es: ${evento?.name}`,
                            amount: {
                                currency_code: "EUR",
                                value: evento?.amount,
                            },
                        },
                    ],
                });
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                setPaid(true);
                console.log(order);
            },
            onError: (err) => {
                //   setError(err),
                console.error(err);
            },
        })
        .render(paypalRef.current);
}