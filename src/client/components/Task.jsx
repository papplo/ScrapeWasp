
export const Task = (props) => {
    const handleIsDoneChange = async (event) => {
        
        try {
            await props.updateTask({
                id: props.task.id,
                completed: event.target.checked
            })
        } catch (error) {
            window.alert('Error while updating task: ' + error.message)
        }
    }
    return (
    <li className="drac-text drac-text-white drac-p-xxs" key={props.task.id}>
        <input
          type='checkbox' id={props.task.id}
          checked={props.task.completed}
          onChange={handleIsDoneChange}
        />
        { props.task.description }
      </li >
    )
  }