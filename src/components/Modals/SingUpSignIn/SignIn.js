import React from "react";
import './ModalElements.scss';
import CircularProgress from "@material-ui/core/CircularProgress";

export default function SignInForm(props) {
    return (
        <form ref={props?.wrapperRef}>
            <h2>Welcome Back!</h2>
            <fieldset>
                <legend>Log In</legend>
                <ul>
                    <li>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={props?.user?.email}
                            onChange={(event) => props?.onSignInLoginInputChange(event)}
                            id="email"/>
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
                </ul>
            </fieldset>
            <button onClick={(event)=>props?.handleLogin(event)}>{props?.loginButtonLoading ? <CircularProgress/> : "Login"}</button>
            <button type="button" onClick={() => props?.changeView("signUp")}>Create an Account</button>
        </form>
    )
}