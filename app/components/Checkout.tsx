import {useAppSelector} from "@/app/hooks";
import {selectTotalCartPrice} from "@/app/GlobalRedux/cartSlice";
import {getSignup} from "@/app/GlobalRedux/signupSlice";
import {CreditCard, PaymentForm} from "react-square-web-payments-sdk";
import {EntrantType, UserType} from "@/types";

const TAX = 0.0825
export function Checkout() {
    const total = useAppSelector(selectTotalCartPrice)
    const cents = total*TAX
    const signup = useAppSelector(getSignup)
    return (
        <div>
            <PaymentForm
                applicationId='sq0idp-OB6MLaqKMzyn15BLdC8EpQ'
                locationId="L5CQ4BZB5NCNX"
                cardTokenizeResponseReceived={async (token, buyer) => {
                    const response = await fetch('/api/pay', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            sourceId: token.token,
                            amount: cents.toFixed(2)
                        })
                    })
                    const {body: bodyData} = await response.json()
                    if(bodyData) {
                        const {payment: payData} = JSON.parse(bodyData)
                        alert(payData.status)
                        if(payData.status === "COMPLETED" && signup.player_id) {
                            const newUser: UserType = {
                                player_id: signup.player_id,
                                player_firstname: signup.player_firstname,
                                player_lastname: signup.player_lastname
                            }
                            poster('/api/entrants', newUser, signup.event_id!)
                            console.log(signup)
                        }
                        // this conditional reroutes to the PaymentSuccess page if the payment is successful
                        if(payData.status === "COMPLETED") {

                        }
                    }
                    else alert("paymentMessage")
                }}
                createPaymentRequest={()=> ({
                    countryCode: "US",
                    currencyCode: "USD",
                    lineItems: [
                        {
                            amount: String(cents),
                            label: "Item to be purchased",
                            id: "SKU-12345",
                            imageUrl: "https://url-cdn.com/123ABC",
                            pending: true,
                            productUrl: "https://my-company.com/product-123ABC"
                        }
                    ],
                    taxLineItems: [
                        {
                            label: "State Tax",
                            amount: "8.25",
                            pending: true,
                        }
                    ],
                    requestBillingContact: false,
                    requestShippingContact: false,
                    shippingOptions: [
                        {
                            label: "Pickup in store",
                            amount: "0.00",
                            id: "1"
                        }
                    ],
                    total: {
                        label: "Total",
                        amount: "41.79",
                    }
                })
                }           >
                <CreditCard/>
            </PaymentForm>
        </div>
    )
}

/*
function CheckoutInfo(props: checkoutProps) {
  return (
    <div>
      ${props.total*TAX}
    </div>
  )
}
*/

const putter = async (url: string, newUser: UserType) => {
    const res = await fetch(url, {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newUser)
    })
}
const poster = async (url: string, newUser: UserType, event_id: string) => {
    await putter('api/users', newUser)
    const newEntrant: EntrantType = {
        event_id: event_id,
        player_id: newUser.player_id!
    }
    const eventRes = await fetch(url, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(newEntrant)
    })
}
