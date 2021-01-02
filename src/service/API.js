import {ADMIN, ROOT} from "../routes/paths";
import * as axios from "axios";

export function loginUser(dispatch, email, password, history, setIsLoading, setError) {
    setIsLoading(true);

    if (!!email && !!password) {
        setTimeout(() => {
            setError(null)
            setIsLoading(false)
            dispatch({type: 'LOGIN_SUCCESS'})
            localStorage.setItem('loggedUser', JSON.stringify({email: email, name: "test"}))
            if (email.includes("admin")) {
                localStorage.setItem("is_admin", true);
                history.push(ADMIN);
            } else {
                history.push(ROOT);
            }
            window.location.reload();
        }, 2000);
    } else {
        dispatch({type: "LOGIN_FAILURE"});
        setError(true);
        setIsLoading(false);
    }
}

export function signOut(dispatch, history) {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("is_admin");
    dispatch({type: "SIGN_OUT_SUCCESS"});
    history.push(ROOT);
}

export async function registration(dispatch, user, history, setIsLoading, setError) {
    setIsLoading(true);
    let newUser = user;
    newUser.roles = "USER";
    axios('http://3.93.68.19:8001/users', {method: "POST", data: newUser}).then(response => {
        dispatch({type: 'LOGIN_SUCCESS'})
        localStorage.setItem('loggedUser', JSON.stringify(response?.data))
        if (response?.data?.roles.includes("ADMIN")) {
            localStorage.setItem("is_admin", true);
            history.push(ADMIN);
        } else {
            history.push(ROOT);
        }
        window.location.reload();
        setIsLoading(false);
    }).catch(error => {
        setError(error);
        console.log("ERROR REGISTRATION", error);
        setIsLoading(false);
    })
}

export async function getAllUsers() {
    return axios('http://3.93.68.19:8001/users');
}

export async function addUser(user) {
    return axios('http://3.93.68.19:8001/users', {method: "POST", data: user})
}

export async function editUser(user) {
    return axios('http://3.93.68.19:8001/users', {method: "PUT", data: user})
}

export async function deleteUser(userId) {
    return axios(`http://3.93.68.19:8001/users/${userId}`, {method: "DELETE"})
}

export async function getAllEvents() {
    return axios('http://3.93.68.19:8002/events');
}

export async function addEvent(event) {
    return axios('http://3.93.68.19:8002/events', {method: "POST", data: event})
}

export async function editEvent(event) {
    return axios('http://3.93.68.19:8002/events', {method: "PUT", data: event})
}

export async function deleteEvent(eventId) {
    return axios(`http://3.93.68.19:8002/events/${eventId}`, {method: "DELETE"})
}

export async function getAllNotifications() {
    return axios('http://3.93.68.19:8003/notifications');
}

export async function addNotifications(notifications) {
    return axios('http://3.93.68.19:8003/notifications', {method: "POST", data: notifications})
}

export async function editNotifications(notifications) {
    return axios('http://3.93.68.19:8003/notifications', {method: "PUT", data: notifications})
}

export async function deleteNotifications(notificationId) {
    return axios(`http://3.93.68.19:8003/notifications/${notificationId}`, {method: "DELETE"})
}