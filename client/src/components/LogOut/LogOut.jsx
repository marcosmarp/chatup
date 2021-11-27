import { useState, useEffect } from 'react';
import SuccessMessage from '../SuccessMessage/SuccessMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const LogOut = ({ restUri }) => {
  const [serverResponse, setServerResponse] = useState(<></>);

  const logOut = async () => {
    try {
      const res = await fetch(`${restUri}/users/auth/log-out/`, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
      });
      const response = await res.json();
      if (response.success) return <SuccessMessage message={"Logged out"} />;
      else return <ErrorMessage message={"Internal server error, try again later"} />;
    }
    catch (err) {
      return <ErrorMessage message={err} />;
    }
  }

  useEffect(() => {
    const getLogOutResponse = async () => {
      const response = await logOut();
      setServerResponse(response);
    }

    getLogOutResponse();
    // eslint-disable-next-line
  }, []);
  
  return (
    <span>
      {serverResponse}
    </span>
  )
}

export default LogOut
