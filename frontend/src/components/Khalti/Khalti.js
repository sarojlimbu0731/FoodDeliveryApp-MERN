import React from "react";
import KhaltiCheckout from "khalti-checkout-web";
import config from "./KhaltiConfig";

const Khalti = ({ amount, publicKey }) => {
     config.publicKey = publicKey
     let checkout = new KhaltiCheckout(config);
     let buttonStyles = {
          backgroundColor: "purple",
          padding: "10px",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
          border: "1px solid white",
     };
     return (
          <div>
               <button
                    onClick={() => checkout.show({ amount: amount })}
                    style={buttonStyles}
               >
                    Pay Via Khalti
               </button>
          </div>
     );
}

export default Khalti
