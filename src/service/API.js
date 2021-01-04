import {ADMIN, ROOT} from "../routes/paths";
import axios from 'axios';
import {parseError} from "../utils/Parser";

export function loginUser(dispatch, username, password, history, setIsLoading, setError) {
    setIsLoading(true);
    axios(`http://3.93.68.19:8001/users/find?username=${username}&password=${password}`).then(response => {
        if (!response?.data) {
            setIsLoading(false);
            setError("Username or password incorrect!");
        } else {
            localStorage.setItem('loggedUser', JSON.stringify(response?.data))
            if (response?.data?.roles.includes("ADMIN")) {
                localStorage.setItem("is_admin", true);
            }
            setIsLoading(false)
            dispatch({type: 'LOGIN_SUCCESS'})
            window.location.reload();
        }
    }).catch(error => {
        let err = parseError(error);
        setError(err);
        setIsLoading(false);
    });
}

export function signOut(dispatch, history, setLogoutBtnLoading) {
    setLogoutBtnLoading(true);
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("is_admin");
    dispatch({type: "SIGN_OUT_SUCCESS"});
    history.push(ROOT);
    setLogoutBtnLoading(false);
}

export async function registration(dispatch, user, history, setIsLoading, setError) {
    setIsLoading(true);
    let newUser = user;
    newUser.roles = "CLIENT";
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
        console.log("ERROR REGISTRATION", error);
        let err = parseError(error);
        setError(err);
        setIsLoading(false);
    })
}

export function getAllEventTypes() {
    return axios('http://3.93.68.19:8002/event-types');
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

export function getAllEventsSync() {
    return axios('http://3.93.68.19:8002/events');
}

export async function getAllEvents() {
    return axios('http://3.93.68.19:8002/events');
}

export async function addEvent(event) {
    return axios('http://3.93.68.19:8002/events', {method: "POST", data: event})
}

export async function addPurachase(purachase, dataId) {
    return axios(`http://3.93.68.19:8002/events?id=${dataId}`, {
        method: "POST", data: {
            nombreCliente: purachase?.username,
            direccion: purachase?.direccion
        }
    });
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

export async function getPendingRequests() {
    return axios("http://3.93.68.19:8002/events-pending");
}
