import React from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import Logout from "../components/Logout";
import { logout } from "../modules/auth";

function LogoutContainer(props) {
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(logout);
    props.history.push("/");
  };

  return <Logout handleConfirm={handleConfirm} />;
}

export default withRouter(LogoutContainer);
