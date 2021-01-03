export function BuyEvent(event, setPurchaseBtnLoading) {
    setPurchaseBtnLoading(true)
    setTimeout(()=>{
        setPurchaseBtnLoading(false);
    }, 2000)
}