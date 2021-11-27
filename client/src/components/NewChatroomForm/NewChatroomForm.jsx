import './new_chatroom_form_style.css'
import { useState, useEffect } from 'react';
import SuccessMessage from '../SuccessMessage/SuccessMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const NewChatroomForm = ({ setDisplayInput, restUri }) => {

  const [displayKeywords, setDisplayKeywords] = useState(false);
  const [finishTrigger, setFinishTrigger] = useState(false);
  const [name, setName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [serverResponse, setServerResponse] = useState(<></>);

  const createChatroom = async (name, keywords) => {
    try {
      const res = await fetch(`${restUri}/chatrooms/`, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          "name": name,
          "keywords": keywords
        })
      });
      const response = await res.json();
      
      if (response.success) {
        return <SuccessMessage message={"Created chatroom"} />
      }
      else {
        switch (response.error) {
          case "not authenticated":
            return <ErrorMessage message={"You have to log in to create a chatroom"} />;

          case "empty username":
            return <ErrorMessage message={"Username can't be empty"} />;
          
          default:
            return <ErrorMessage message={"Internal server error, try again later"} />
        }
      }
    } 
    catch (err) {
      return <ErrorMessage message={err} />;
    }
  }

  const onNameSubmit = (key) => {
    if (key === "Enter") setDisplayKeywords(true);
  }

  const onKeywordsSubmit = async (key) => {
    if (key === "Enter") {
      setFinishTrigger(true);
      const response = await createChatroom(name, keywords);
      setServerResponse(response);
    }
  }

  useEffect(()=> {
    setDisplayInput(finishTrigger);
    // eslint-disable-next-line
  }, [finishTrigger]);

  return (
    <div id="new_chatroom_form" className='h6'>
      
      <div className="new_chatroom_input_container">
        <span>Name:&nbsp;</span>
        <input 
          type="text"
          autoFocus
          maxLength={100}
          disabled={displayKeywords}
          value={name}
          onChange={(e) => setName(e.target.value)} 
          onKeyDown={(e) => onNameSubmit(e.key)}
        />
      </div>

      {displayKeywords &&
        <div className="new_chatroom_input_container">
          <span>Keywords:&nbsp;</span>
          <input 
            type="text"
            autoFocus
            maxLength={100}
            disabled={finishTrigger}
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)} 
            onKeyDown={(e) => onKeywordsSubmit(e.key)}
          />
        </div>
      }
      {displayKeywords && <small>Separated by spaces, this will be used to find your chatroom (example: node nodejs programming)</small>}
      {serverResponse}
    </div>
  )
}

export default NewChatroomForm
