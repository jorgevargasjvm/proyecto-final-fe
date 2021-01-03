import {getAllEventTypes} from "../API";
import {parseError} from "../../utils/Parser";

function parsedEventType(){
    getAllEventTypes().then((response)=>{
        let eventsType = [];
        response?.data?._embedded?.eventTypes?.forEach(value=>{
            let event = {};
            event.id = getId(value);
            event.name = value?.name;
            event.amount = value?.amount;
            eventsType.push(event);
        });
    }).catch(error=>{
        let err = parseError(error);
        throw Error(err);
    })
}

function getId(event){
    let value = event?._links?.self?.href;
    return value.substr(value.length - 1)
}