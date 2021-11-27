import './chatrooms_list_style.css'
import ChatroomListItem from '../ChatroomListItem/ChatroomListItem';
import { useEffect, useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';

const ChatroomList = ({ keyword, restUri }) => {
  const [chatrooms, setChatrooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [allowErrorMessage, setAllowErrorMessage] = useState(false);
  const [allowChatroomListLoader, setAllowChatroomListLoader] = useState(true);

  const fetchChatrooms = async () => {
    try {
      const res = await fetch(`${restUri}/chatrooms/${keyword}/`, {
        method: "GET",
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
      });
      return res.json();
    } 
    catch (err) {
      return ({'error': err});
    }
  }

  useEffect(() => {
    const getChatrooms = async () => {
      const response = await fetchChatrooms();
      setAllowChatroomListLoader(false);
      setAllowErrorMessage(true);
      if (response.success) {
        const serverChatrooms = response.chatrooms;
        setChatrooms(serverChatrooms);

        setErrorMessage("No matches for your search");
        if (keyword === 'own') setErrorMessage("You don´t have any chatrooms yet, try 'chatrooms search <topic>'");
      } else if (response.error === "not authenticated") setErrorMessage("Log in to see your chatrooms");
    }

    getChatrooms();
    // eslint-disable-next-line
  }, [chatrooms]);
  
  chatrooms.sort((a,b) => (a.activeUsers < b.activeUsers) ? 1 : ((b.activeUsers < a.activeUsers) ? -1 : 0));

  return (
    <>
      {(chatrooms.length) ?
        <table id='chatrooms_list'>
          <thead>
            <tr>
              <th>CREATOR</th>
              <th>NAME</th>
              <th>ACTIVE USERS</th>
              <th>LAST ENTRY</th>
              <th>SELECT CODE</th>
            </tr>
          </thead>
          <tbody>
            {chatrooms.map((chatroom, index) => (
              <ChatroomListItem chatroom={chatroom} selectCode={index} key={chatroom._id} />
            ))}
          </tbody>
        </table>
        : allowChatroomListLoader && <Loader />
      }
      {(!chatrooms.length && allowErrorMessage) && <ErrorMessage message={errorMessage} />}
    </>  
  )
}

export default ChatroomList
