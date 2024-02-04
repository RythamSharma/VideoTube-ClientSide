import React from "react";
import { User, useAuth0 } from "@auth0/auth0-react";
function Login() {
  const { loginWithRedirect, isAuthenticated,user } = useAuth0();
  return (
    <div>
        {user?`hi ${user.name} `:""}
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  );
}

export default Login;
