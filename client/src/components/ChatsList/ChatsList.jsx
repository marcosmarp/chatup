import ChatListItem from "../ChatListItem/ChatListItem"

const ChatsList = ({ chats }) => {
  return (
    <div id="chats_container">
      {chats.slice(-10).map((chat, index) => (
        <ChatListItem chat={chat} key={chat._id} />
      ))}
    </div>
  )
}

export default ChatsList
