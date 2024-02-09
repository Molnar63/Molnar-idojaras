import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Activation = ({ match }) => {
  const [message, setMessage] = useState("");
  const history = useHistory();

  const activate = async () => {
    try {
      const response = await fetch(
        `http://localhost/mdb5react/activate.php?activation_key=${match.params.activation_key}`
      );

      if (response.ok) {
        setMessage("Account activated successfully. You can now log in.");
        history.push("/login");
      } else {
        setMessage("Invalid activation key.");
      }
    } catch (error) {
      setMessage("Something went wrong during activation.");
    }
  };

  return (
    <div>
      <h1>Account Activation</h1>
      <p>{message}</p>
      <button onClick={activate}>Activate Account</button>
    </div>
  );
};

export default Activation;
