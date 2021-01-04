import {addPurachase} from "../API";
import {parseError} from "../../utils/Parser";

export function BuyEvent(event, evento, setError, setPurchaseBtnLoading, enqueueSnackbar) {
    setPurchaseBtnLoading(true);
    addPurachase(event, evento?.id).then(response => {
        setPurchaseBtnLoading(false);
        if (enqueueSnackbar) {
            enqueueSnackbar("Has pedido con éxito", {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                },
            })
        }
    }).catch(error => {
        let err = parseError(error);
        setError(err);
        setPurchaseBtnLoading(false);
    });
}