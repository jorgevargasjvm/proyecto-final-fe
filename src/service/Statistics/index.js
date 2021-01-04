import moment from "moment";

export function filterByCategory(eventList, category) {
    return eventList?.filter(event => event?.tipoEvento?.name === category);
}

export function pastYearStatistics() {
    return allEventsPastYear();
}

export function allEventsPastYear(eventList) {
    return eventList.filter(event => inPastYear(event?.fechaHora));
}

export function allEventsPastMonth(eventList) {
    return eventList.filter(event => inPastMonth(event?.fechaHora));
}

export function allEventsPastWeek(eventList) {
    return eventList.filter(event => inPastWeek(event?.fechaHora));
}

export function allEventsToday(eventList) {
    return eventList.filter(event => isToday(event?.fechaHora));
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