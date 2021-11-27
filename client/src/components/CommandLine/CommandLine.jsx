import './command_line_style.css';

const CommandLine = ({value}) => {
  return (
    <div id="command_container">
      <span>{`$`}</span>
      <span id="command">{value}</span>
    </div>
  )
}

export default CommandLine
