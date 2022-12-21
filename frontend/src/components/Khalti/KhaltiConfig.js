// import axios from "axios";
// import { API } from "../../config"


let config = {
  // publicKey:"",
  productIdentity: "123766",
  productName: "Restraunt",
  productUrl: "http://localhost:5000",
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      console.log(payload);

      // axios.post(`${API}/processPayment`, {
      //   token: payload.token,
      //   amount: payload.amount,
      // }).then((response) => {
      //   console.log(response.data);
      //   alert("Thank you for generosity");
      // })
      //   .catch((error) => {
      //     console.log(error);
      //   });

    },
    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: [
    "KHALTI",
    "EBANKING",
    "MOBILE_BANKING",
    "CONNECT_IPS",
    "SCT",
  ],
};

export default config;
