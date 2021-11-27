import { useEffect, useState } from 'react'
import SuccessMessage from '../SuccessMessage/SuccessMessage'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Loader from '../Loader/Loader'

const DeleteChatroom = ({ restUri, selectCode }) => {
  const [serverResponse, setServerResponse] = useState(<></>);
  const [displayLoading, setDisplayLoading] = useState(true)

  const deleteChatroom = async () => {
    try {
      const res = await fetch(`${restUri}/chatrooms/own/${selectCode}/`, {
        method: "DELETE",
        headers: {'Content-type': 'application/json'},
        credentials: 'include'
      });
      return res.json();
    } 
    catch (err) {
      return ({'error': err});
    }
  }

  useEffect(() => {
    const getServerResponse = async () => {
      const res = await deleteChatroom();
      var response;
      if (res.success) response = <SuccessMessage message={"Deleted chatroom"} />;
      else {
        switch (res.error) {
          case "not authenticated":
            response = <ErrorMessage message={"Log in first"} />;
            break;
          
          case "invalid select code":
            response = <ErrorMessage message={"Invalid select code, try 'chatrooms own' to see the select codes"} />;
            break;

          case "forbidden":
            response = <ErrorMessage message={"You can only delete the chatrooms you created"} />;
            break;

          default:
            response = <ErrorMessage message={"Internal server error, try again later"} />;
            break;
        }
      }
      setServerResponse(response);
      setDisplayLoading(false);
    }

    getServerResponse();
  }, []);

  return (
    <span>
      {serverResponse}
      {displayLoading && <Loader />}
    </span>
  )
}

export default DeleteChatroom
