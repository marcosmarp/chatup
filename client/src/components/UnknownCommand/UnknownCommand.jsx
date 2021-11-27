const UnknownCommand = ({command}) => {
  return (
    <h6>
      {command} isn't a valid command, try :help for a list of commands
    </h6>
  )
}

export default UnknownCommand
