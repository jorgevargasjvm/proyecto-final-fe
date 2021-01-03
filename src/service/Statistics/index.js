import {getAllEventsSync} from "../API";
import {parseError} from "../../utils/Parser";
import moment from "moment";

export function todayStatistics() {
    return allEventsToday();
}

export function pastWeekStatistics() {
    return allEventsPastWeek();
}

export function pastMonthStatistics() {
    return allEventsPastMonth();
}

export function pastYearStatistics() {
    return allEventsPastYear();
}

function allEventsPastYear() {
    let events = [];
    getAllEventsSync().then(response => {
        response?.data.forEach(event => {
            if (inPastYear(event?.fechaHora)) {
                events.push(event);
            }
        });
    }).catch(error => {
        let err = parseError(error);
        throw new Error(err);
    })
    return events;
}

function allEventsPastMonth() {
    let events = [];
    getAllEventsSync().then(response => {
        response?.data.forEach(event => {
            if (inPastMonth(event?.fechaHora)) {
                events.push(event);
            }
        });
    }).catch(error => {
        let err = parseError(error);
        throw new Error(err);
    })
    return events;
}

function allEventsPastWeek() {
    let events = [];
    getAllEventsSync().then(response => {
        response?.data.forEach(event => {
            if (inPastWeek(event?.fechaHora)) {
                events.push(event);
            }
        });
    }).catch(error => {
        let err = parseError(error);
        throw new Error(err);
    })
    return events;
}

function allEventsToday() {
    let events = [];
    getAllEventsSync().then(response => {
        response?.data.forEach(event => {
            if (isToday(event?.fechaHora)) {
                events.push(event);
            }
        });
    }).catch(error => {
        let err = parseError(error);
        throw new Error(err);
    })
    return events;
}

function isToday(dateForParse) {
    let date = new Date(dateForParse);
    const today = new Date()
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
}

function inPastWeek(dateForParse) {
    let today = new Date();
    let date = new Date(dateForParse);
    let pastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return moment(date).isBetween(pastWeek, today);
}

function inPastMonth(dateForParse) {
    let today = new Date();
    let date = new Date(dateForParse);
    let pastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    return moment(date).isBetween(pastMonth, today);
}

function inPastYear(dateForParse) {
    let today = new Date();
    let date = new Date(dateForParse);
    let pastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    return moment(date).isBetween(pastYear, today);
}