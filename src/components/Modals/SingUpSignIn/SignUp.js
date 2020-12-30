import React from "react";
import './ModalElements.scss';
import CircularProgress from "@material-ui/core/CircularProgress";

export default function SignUpForm(props) {
    return (
        <form ref={props?.wrapperRef}>
            <h2>Sign Up!</h2>
            <fieldset>
                <legend>Create Account</legend>
                <ul>
                    <li>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={props?.user?.name}
                            onChange={(event) => props?.onSignInLoginInputChange(event)}/>
                    </li>
                    <li>
                        <label htmlFor="surname">Surname:</label>
                        <input
                            type="text"
                            name='surname'
                            id="surname"
                            value={props?.user?.surname}
                            onChange={(event) => props?.onSignInLoginInputChange(event)}/>
                    </li>
                    <li>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={props?.user?.email}
                            onChange={(event) => props?.onSignInLoginInputChange(event)}/>
                    </li>
                    <li>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={props?.user?.password}
                            onChange={(event) => props?.onSignInLoginInputChange(event)}/>
                    </li>
                    <li>
                        <label htmlFor="rePassword">Repeat password:</label>
                        <input
                            type="password"
                            name="rePassword"
                            id="rePassword"
                            value={props?.user?.rePassword}
                            onChange={(event) => props?.onSignInLoginInputChange(event)}/>
                    </li>
                </ul>
            </fieldset>
            <button onClick={(event)=>props?.handleRegistration(event)}>{props?.registrationButtonLoading ? <CircularProgress/> : "Submit"}</button>
            <button type="button" onClick={() => props?.changeView("logIn")}>Have an Account?</button>
        </form>
    )
}