import './console_output_style.css'
import UnknownCommand from '../UnknownCommand/UnknownCommand';
import CommandsList from '../CommandsList/CommandsList'
import AuthForm from '../AuthForm/AuthForm'
import Chatroom from '../Chatroom/Chatroom';
import ChatroomList from '../ChatroomsList/ChatroomList';
import CommandLine from '../CommandLine/CommandLine'
import LogOut from '../LogOut/LogOut';
import NewChatroomForm from '../NewChatroomForm/NewChatroomForm';
import About from '../About/About'
import RemoveChatroom from '../RemoveChatroom/RemoveChatroom';
import DeleteChatroom from '../DeleteChatroom/DeleteChatroom'

const ConsoleOutput = ({ commands, setDisplayInput, restUri, clearScreen }) => {
  const processCommand = (command) => {
    var keyword;
    var selectCode;
    switch(command) {
      case '':
        break;

      case 'clear':
        clearScreen();
        break;

      case 'about':
        return <About />;

      case ':help':
        return <CommandsList />;

      case 'register':
        return <AuthForm setDisplayInput={setDisplayInput} restUri={restUri} mode={true} />;
      
      case 'log in':
        return <AuthForm setDisplayInput={setDisplayInput} restUri={restUri} mode={false} />;

      case 'log out':
        return <LogOut restUri={restUri} />;

      case 'chatrooms new':
        return <NewChatroomForm setDisplayInput={setDisplayInput} restUri={restUri}/>

      case 'chatrooms own':
        return <ChatroomList keyword={'own'} restUri={restUri} />;

      case command.match(/chatrooms own remove \d$/)?.input:
        selectCode = command.replace(/^chatrooms own remove /, '');
        return <RemoveChatroom selectCode={selectCode} restUri={restUri} />

      case command.match(/chatrooms own delete \d$/)?.input:
        selectCode = command.replace(/^chatrooms own delete /, '');
        return <DeleteChatroom selectCode={selectCode} restUri={restUri} />

      case command.match(/chatrooms own select \d$/)?.input:
        selectCode = command.replace(/^chatrooms own select /, '');
        return <Chatroom keyword={'own'} selectCode={selectCode} setDisplayInput={setDisplayInput} restUri={restUri} />;
      
      case command.match(/^chatrooms search [^\s]+$/)?.input:
        keyword = command.replace(/^chatrooms search /, '');
        return <ChatroomList keyword={keyword} restUri={restUri} />;

      case command.match(/^chatrooms search [^\s]+ select \d$/)?.input:
        keyword = command.replace(/^chatrooms search /, '').replace(/ select \d$/, '');
        selectCode = command.replace(/^chatrooms search [^\s]+ select /, '');
        return <Chatroom keyword={keyword} selectCode={selectCode} setDisplayInput={setDisplayInput} restUri={restUri} />;

      default:
        return <UnknownCommand command={command} />;
    }
  }

  return (
    <div id="previous_commands_container">
      {commands.map((command, index) => (
        <span key={index}>
          <CommandLine value={command} />
          {processCommand(command)}
        </span>))}
    </div>
  )
}

export default ConsoleOutput
