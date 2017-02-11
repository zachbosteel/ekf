import React from "react";

class Login extends React.Component {
  render(){
    return (
      <div className="login-form">
        Username: <input type="text" />
        Password: <input type="text" />
        <button type="submit">Login</button>
      </div>
    )
  }
}

export default Login