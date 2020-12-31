import React from "react";
import './ModalElements.scss';
import CircularProgress from "@material-ui/core/CircularProgress";

export default function SignUpForm(props) {
    return (
        <form ref={props?.wrapperRef}>
            <h2>Regístrate!</h2>
            <fieldset>
                <legend>Regístrate</legend>
                <ul>
                    <li>
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={props?.user?.name}
                            onChange={(event) => props?.onSignInLoginInputChange(event)}/>
                    </li>
                    <li>
                        <label htmlFor="email">Correo electrónico:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={props?.user?.email}
                            onChange={(event) => props?.onSignInLoginInputChange(event)}/>
                    </li>
                    <li>
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={props?.user?.password}
                            onChange={(event) => props?.onSignInLoginInputChange(event)}/>
                    </li>
                    <li>
                        <label htmlFor="rePassword">Repetir contraseña:</label>
                        <input
                            type="password"
                            name="rePassword"
                            id="rePassword"
                            value={props?.user?.rePassword}
                            onChange={(event) => props?.onSignInLoginInputChange(event)}/>
                    </li>
                </ul>
            </fieldset>
            <button onClick={(event)=>props?.handleRegistration(event)}>{props?.registrationButtonLoading ? <CircularProgress/> : "Enviar"}</button>
            <button type="button" onClick={() => props?.changeView("logIn")}>Tienes una cuenta?</button>
        </form>
    )
}