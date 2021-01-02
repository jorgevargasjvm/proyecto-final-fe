import React from "react";

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

function userReducer(state, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {...state, isAuthenticated: true, loggedUser: state?.loggedUser, isAdmin: state?.isAdmin};
        case "SIGN_OUT_SUCCESS":
            return {...state, isAuthenticated: false, loggedUser: null, isAdmin: false};
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function UserProvider({children}) {
    const [state, dispatch] = React.useReducer(userReducer, {
        isAuthenticated: !!localStorage.getItem("loggedUser"),
        loggedUser: localStorage.getItem("loggedUser"),
        isAdmin: !!localStorage.getItem("is_admin"),
    });

    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
}

function useUserState() {
    const context = React.useContext(UserStateContext);
    if (context === undefined) {
        throw new Error("useUserState must be used within a UserProvider");
    }
    return context;
}

function useUserDispatch() {
    const context = React.useContext(UserDispatchContext);
    if (context === undefined) {
        throw new Error("useUserDispatch must be used within a UserProvider");
    }
    return context;
}

export {UserProvider, useUserState, useUserDispatch};