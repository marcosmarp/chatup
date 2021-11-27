import './commands_list_style.css'

const CommandsList = () => {
  return (
    <table className='h6' id='commands_help_table'>
      <thead>
        <tr>
          <th>CATEGORY</th>
          <th>COMMAND</th>
          <th>DESCRIPTION</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Miscenallious</td>
          <td>clear</td>
          <td>Resets the screen</td>
        </tr>
        <tr>
          <td>Miscenallious</td>
          <td>about</td>
          <td>Displays information about the project and it's creator</td>
        </tr>
        <tr>
          <td>Users</td>
          <td>register</td>
          <td>Starts registration process for new user</td>
        </tr>
        <tr>
          <td>Users</td>
          <td>log in</td>
          <td>Starts log in process for existing user</td>
        </tr>
        <tr>
          <td>Users</td>
          <td>log out</td>
          <td>Close existing user session</td>
        </tr>
        <tr>
          <td>Chatrooms</td>
          <td>chatrooms new</td>
          <td>Starts new chatroom creation process</td>
        </tr>
        <tr>
          <td>Chatrooms</td>
          <td>chatrooms own</td>
          <td>List your active chatrooms</td>
        </tr>
        <tr>
          <td>Chatrooms</td>
          <td>chatrooms own select {"<selectCode>"}</td>
          <td>Select a chatroom between your chatrooms (to see the select codes, run 'chatrooms own')</td>
        </tr>
        <tr>
          <td>Chatrooms</td>
          <td>chatrooms own remove {"<selectCode>"}</td>
          <td>Remove a chatroom between your chatrooms (If you're the owner of the chatroom, it'll get deleted) (to see the select codes, run 'chatrooms own')</td>
        </tr>
        <tr>
          <td>Chatrooms</td>
          <td>chatrooms own delete {"<selectCode>"}</td>
          <td>Delete a chatroom you created (to see the select codes, run 'chatrooms own')</td>
        </tr>
        <tr>
          <td>Chatrooms</td>
          <td>chatrooms search {"<topic>"}</td>
          <td>Searchs for chatrooms that matches the specified {"<topic>"}</td>
        </tr>
        <tr>
          <td>Chatrooms</td>
          <td>chatrooms search {"<topic>"} select {"<selectCode>"}</td>
          <td>Select a chatroom between the chatrooms that matches the specified {"<topic>"} (to see the select codes, run 'chatrooms search {"<topic>"}')</td>
        </tr>
      </tbody>
    </table>
  )
}

export default CommandsList
