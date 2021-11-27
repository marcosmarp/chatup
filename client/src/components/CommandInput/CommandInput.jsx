import './command_input_style.css';
import { useState, useEffect } from 'react'

const CommandLine = ({ onSubmit, commandInputRef }) => {
  const [command, setCommand] = useState('');
  const [previousCommand, setPreviousCommand] = useState('');

  useEffect(() => {
    // Moving cursor to the end
    commandInputRef.current.selectionStart = commandInputRef.current.value.length;
    commandInputRef.current.selectionEnd = commandInputRef.current.value.length;
    // eslint-disable-next-line
  }, [command]);
  
  const onKeyPress = (key) => {
    if (key === "ArrowUp") {
      setCommand(previousCommand);
    }

    if (key === "ArrowDown") {
      setCommand('');
    }

    if (key === "Enter") {
      onSubmit(command);
      setPreviousCommand(command);
      setCommand('');
    };

  }

  return (
    <div className="h6" id="command_sector">
      <div id="command_container">
        <span>{`$`}</span>
        <input 
          type="text" 
          id="input_command" 
          value={command} 
          onChange={(e) => setCommand(e.target.value.toLowerCase())} 
          onKeyDown={(e) => onKeyPress(e.key)}
          autoComplete='off'
          autoFocus
          ref={commandInputRef}
        />
      </div>
    </div>
  )
}

export default CommandLine
