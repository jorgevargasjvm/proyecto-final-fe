import React from "react";
import {getPayment} from "../../service/API";
import {parseError} from "../../utils/Parser";
import renderHTML from 'react-render-html';

export default function PaymentPage() {

    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);

    React.useEffect(()=>{
        getPayment().then(response => {
            console.log(response?.data, "ressssp")
            setData(data);
        }).catch(
            error=>{
                let err = parseError(error);
                setError(err)
            }
        )
    })

    return (
        <div className="screen-share">
            <span dangerouslySetInnerHTML={{__html: data}} />
        </div>

    )
}