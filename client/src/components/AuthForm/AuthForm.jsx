import { useState, useEffect } from 'react'
import './auth_form_style.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SuccessMessage from '../SuccessMessage/SuccessMessage';

const AuthForm = ({mode, setDisplayInput, restUri }) => {

  const logIn = async (username, password) => {
    try {
      const res = await fetch(`${restUri}/users/auth/log-in/`, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          "username": username,
          "password": password
        })
      });
      const response = await res.json();
      
      if (response.success) {
        if (response.authenticated) return <SuccessMessage message={"Logged in"} />
        else return <ErrorMessage message={"Wrong password"} />;
      }
      else {
        switch (response.error) {
          case "unexistent username":
            return <ErrorMessage message={"Username is not registered, try 'register'"} />;

          case "empty username":
            return <ErrorMessage message={"Username can't be empty"} />;

          case "empty password":
            return <ErrorMessage message={"Password can't be empty"} />;
          
          default:
            return <ErrorMessage message={"Internal server error, try again later"} />;
        }
      }
    } 
    catch (err) {
      return <ErrorMessage message={err} />;
    }
  }

  const registerUser = async (username, password) => {
    try {
      const res = await fetch(`${restUri}/users/auth/register/`, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          "username": username,
          "password": password
        })
      });
      const response = await res.json();
      
      if (response.success) return <SuccessMessage message={"Registered new user"} />;
      else {
        switch (response.error) {
          case "username taken":
            return <ErrorMessage message={"Username already registered"} />;

          case "empty username":
            return <ErrorMessage message={"Username can't be empty"} />;

          case "empty password":
            return <ErrorMessage message={"Password can't be empty"} />;
          
          default:
            return <ErrorMessage message={"Internal server error, try again later"} />;
        }
      }    
    } 
    catch (err) {
      return <ErrorMessage message={err} />;
    }
  }

  const [displayPasswordInput, setDisplayPasswordInput] = useState(false);

  const [disablePasswordInput, setDisablePasswordInput] = useState(false);
  const [disableUsernameInput, setDisableUsernameInput] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [serverResponse, setServerResponse] = useState(<></>);
  
  const onUsernameSubmit = (key) => {
    if (key === "Enter") {
      setDisplayPasswordInput(true);
      setDisableUsernameInput(true);
    };
  }
  const onPasswordSubmit = async (key) => {
    if (key === "Enter") {
      var response;
      if (mode) response = await registerUser(username, password);
      else response = await logIn(username, password);
      setServerResponse(response);
      setDisablePasswordInput(true);
    };
  }

  useEffect(() => {
    setDisplayInput(disablePasswordInput);
    // eslint-disable-next-line
  }, [disablePasswordInput]);

  return (
    <div className="h6" id='registration_form'>
      <div className="form_username">
        <span>Username:&nbsp;</span>
        <input 
        type="text" 
        className="auth_input" 
        autoFocus 
        value={username}
        onChange={(e) => setUsername(e.target.value)} 
        onKeyDown={(e) => onUsernameSubmit(e.key)}
        disabled={disableUsernameInput}
        />
      </div>
      {displayPasswordInput && 
        <div className="form_password">
          <span>Password:&nbsp;</span>
          <input 
            type="password" 
            className="auth_input" 
            autoFocus 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            onKeyDown={(e) => onPasswordSubmit(e.key)}
            disabled={disablePasswordInput}
          />
        </div>
      }
      {serverResponse}
    </div>
  )
}

export default AuthForm
