import { useState, useEffect } from 'react'
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SuccessMessage from '../SuccessMessage/SuccessMessage'
import './chat_input_style.css'
import Loader from '../Loader/Loader';

const ChatInput = ({ restUri, chatroomId, setDisplayInput }) => {
  const [chat, setChat] = useState('');
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [displayLoading, setDisplayLoading] = useState(false);
  const [displayPostMessage, setDisplayPostMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [exitTrigger, setExitTrigger] = useState(false);

  const postChat = async (content) => {
    try {
      const res = await fetch(`${restUri}/chatrooms/${chatroomId}/chats/`, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({"content": content})
    });
      return res.json();
    } 
    catch (err) {
      return ({'error': err});
    }
  }

  const displayAndHidePostMessage = () => {
    setDisplayPostMessage(true);
    setTimeout(() => {
      setDisplayPostMessage(false);
    }, 3500);
  }

  const onSubmit = async () => {
    setDisplayErrorMessage(false);
    setDisplayLoading(true);
    if (chat !== '' && chat !== ':exit') {
      const response = await postChat(chat);
      if (!response.success) {
        switch (response.error) {
          case 'not authenticated':
            setErrorMessage("Log in to post a chat!");
            break;
          case 'invalid id':
            setErrorMessage("The chatroom ID isn't properly formatted");
            break;
          case 'invalid chatroom':
            setErrorMessage("This chatroom doesn't exists anymore");
            break;
          case 'empty message':
            setErrorMessage("No, you can't post empty messages");
            break;
          default:
            setErrorMessage("Internal server error, try again later");
            break;
        }
        setDisplayErrorMessage(true);
      } else {
        displayAndHidePostMessage();
      }
    }

    if (chat === ':exit') {
      setExitTrigger(true);
    }
    setDisplayLoading(false);
  }
  
  const onKeyPress = (key) => {
    if (key === "Enter") {
      onSubmit();
      setChat('');
    };
  }

  useEffect(()=> {
    setDisplayInput(exitTrigger);
    // eslint-disable-next-line
  }, [exitTrigger]);

  return (
    <div id='chat_input_component_wrapper'>
      <div id="chat_input_container">
        <span>{`>`}</span>
        <input 
          type="text" 
          id="chat_input" 
          value={chat} 
          onChange={(e) => setChat(e.target.value)} 
          onKeyDown={(e) => onKeyPress(e.key)}
          autoComplete='off'
          autoFocus
          disabled={exitTrigger}
        />
        {displayLoading && <Loader />}
      </div>
      {displayErrorMessage && <ErrorMessage message={errorMessage} />}
      {displayPostMessage && <SuccessMessage message={"Chat sent - Changes will be reflected in a second"} />}
      <small>':exit' to leave</small>
    </div>
  )
}

export default ChatInput
