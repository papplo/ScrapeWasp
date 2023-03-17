import { Card, Text, Checkbox } from 'dracula-ui';

export const Task = (props) => {
    const handleIsDoneChange = async (event) => {
        try {
				const nn = await props.performTask({id: props.task.id});
					console.log(nn)
            await props.updateTask({
                id: Number(event.target.id),
                completed: event.target.checked
            })
        } catch (error) {
            window.alert('Error while updating task: ' + error.message)
        }
    };


    return (
    <li className="drac-text drac-text-white drac-p-xxs" key={props.task.id}>
      <Card variant={props.task.completed ? "normal" : "subtle"} color={props.color} p="md" m="xxs">
			<Checkbox id={props.task.id} name="normal" color={props.color}
				checked={props.task.completed}
 				onChange={handleIsDoneChange}
			/>
				<label htmlFor={props.task.id} className="drac-text drac-text-white">
					{props.task.description}
				</label>
        </Card>
      </li >
    )
  }