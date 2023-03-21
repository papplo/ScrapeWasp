import { Card, Text, Checkbox, Table } from 'dracula-ui';
import { useState } from 'react';

export const Task = (props) => {
	const [resTable, setResTable] = useState([]);
    const handleIsDoneChange = async (event) => {
        try {
				const resultsTable = await props.performTask({id: props.task.id});
				setResTable(resultsTable);

            await props.updateTask({
                id: Number(event.target.id),
                completed: event.target.checked,
				description: props.task.description

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
					{props.task.name}
				</label>
        </Card>
		{resTable && resTable.length > 0 && (
			<ResultsTable results={resTable} />
		)}
      </li >
    )
  }

	const ResultsTable = (props) => {
		return (
			<Table color="cyan">
				<thead>
					<tr>
						<th className="drac-text drac-text-white">Name</th>
						<th className="drac-text drac-text-white">Age</th>
						<th className="drac-text drac-text-white" style={{ maxWidth: 200 }}>
						Bio
						</th>
					</tr>
				</thead>
				<tbody>

					{props.results.map(({ title, price, image, link, category}) => {(
						<tr>
							<td className="drac-text drac-text-white">{title}</td>
							<td className="drac-text drac-text-white">{price}</td>
							<td className="drac-text drac-text-white" style={{ maxWidth: 200 }}>
								{image}
							</td>
							<td className="drac-text drac-text-white" style={{ maxWidth: 200 }}>
								{category}
							</td>
					</tr>
					)})}
				</tbody>
			</Table>
		)
	}