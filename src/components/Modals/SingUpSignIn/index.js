import React from 'react'
import {useOutsideAlerter} from "../../../utils/OutsideClick";
import SignUpForm from "./SignUp";
import SignInForm from "./SignIn";

export default function Modal(props) {
    useOutsideAlerter(props?.wrapperRef, props?.handleCloseModal)
    if (!props?.showModal) {
        return <></>
    }
    const view = () => {
        switch (props?.currentView) {
            case "signUp":
                return <SignUpForm {...props}/>
            case "logIn":
                return <SignInForm {...props}/>
            default:
                return (
                    <></>
                )
        }
    }
    return (
        <section id="entry-page">
            {view()}
        </section>
    )
}