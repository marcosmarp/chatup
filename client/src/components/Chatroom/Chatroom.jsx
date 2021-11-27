import ChatsList from '../ChatsList/ChatsList'
import './chatroom_style.css'
import ChatInput from '../ChatInput/ChatInput'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Loader from '../Loader/Loader'
import { useEffect, useState } from 'react';

const Chatroom = ({ setDisplayInput, restUri, keyword, selectCode }) => {
  const [invalidChatroom, setInvalidChatroom] = useState(false);
  const [loading, setLoading] = useState(true);

  const [chatroom, setChatroom] = useState({
    "_id": "",
    "name": "",
    "creator": {},
    "users": [],
    "chats": [],
    "createdAt": "",
    "updatedAt": "",
    "__v": ""
  });

  const fetchChatroom = async () => {
    try {
      const res = await fetch(`${restUri}/chatrooms/${keyword}/${selectCode}/`, {
        method: "GET",
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
    const getChatroom = async () => {
      const res = await fetchChatroom();
      setLoading(false);

      if (res.success) {
        const serverChatroom = res.chatroom;
        setChatroom(serverChatroom);
      } else {
        setInvalidChatroom(true);
      }
    }

    getChatroom();
    // eslint-disable-next-line
  }, [chatroom]);
  
  useEffect(()=> {
    setDisplayInput(invalidChatroom);
    // eslint-disable-next-line
  }, [invalidChatroom]);

  return (
    <>
      {loading && <Loader />}
      {(!invalidChatroom && !loading) ?
        <div id="chatroom_container" className="h6">
          <h5 id='chatroom_title'>"{chatroom.name}" by {chatroom.creator.username}</h5>
          <ChatsList chats={chatroom.chats.slice(-10)} />
          <ChatInput chatroomId={chatroom._id} restUri={restUri} setDisplayInput={setDisplayInput}/>
        </div>
        : (!loading) && <ErrorMessage message={"Unexistent chatroom, try 'chatroom search <topic>' to see the select codes"} />
      } 
    </>   
  )
}

export default Chatroom
