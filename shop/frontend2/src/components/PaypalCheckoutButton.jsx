import { PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";
import { startPayingOrder } from "../store/order/thunks";

const PaypalCheckoutButton = ({ amount, id }) => {
  const dispatch = useDispatch();

  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amount,
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log(order);
        dispatch(startPayingOrder(id, order));
      }}
      onError={(err) => {
        console.log(err);
      }}
    />
  );
};

export default PaypalCheckoutButton;
