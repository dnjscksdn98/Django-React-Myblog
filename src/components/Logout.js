import React from "react";
import { Link } from "react-router-dom";

function Logout(props) {
  const { handleConfirm } = props;

  return (
    <React.Fragment>
      <h1>Logout</h1>
      <br />
      <button onClick={() => handleConfirm()}>yes</button>
      <button>
        <Link to="/">cancel</Link>
      </button>
    </React.Fragment>
  );
}

export default Logout;
