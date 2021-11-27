const ChatListItem = ({ chat }) => {
  return (
    <span className="chat_list_item">
       <small>({chat.createdAt.substring(11, 16)})</small>&nbsp;{chat.creator.username}: {chat.content}
    </span>
  )
}

export default ChatListItem
