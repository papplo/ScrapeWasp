import { Card, Text, Checkbox, Table } from 'dracula-ui'
import { useState } from 'react'

export const Task = props => {
  const [resTable, setResTable] = useState(props.results || [])
  const handlePerformTask = async event => {
    try {
      const { results, ...task } = await props.performTask({
        id: props.task.id,
      })
      setResTable(results)
    } catch (error) {
      window.alert('Error while updating task: ' + error.message)
    }
  }

  return (
    <li className='drac-text drac-text-white drac-p-xxs' key={props.task.id}>
      <Card
        variant={props.task.completed ? 'normal' : 'subtle'}
        color={props.color}
        p='md'
        m='xxs'>
        <Checkbox
          id={props.task.id}
          name='normal'
          color={props.color}
          checked={props.task.completed}
          onChange={handlePerformTask}
        />
        <label htmlFor={props.task.id} className='drac-text drac-text-white'>
          {props.task.name}
        </label>
      </Card>
      {resTable && resTable.length > 0 && <ResultsTable results={resTable} />}
    </li>
  )
}

const ResultsTable = props => {
  return (
    <Table color='cyan'>
      <thead>
        <tr>
          <th className='drac-text drac-text-white'>Name</th>
          <th className='drac-text drac-text-white'>Age</th>
          <th className='drac-text drac-text-white' style={{ maxWidth: 200 }}>
            Bio
          </th>
        </tr>
      </thead>
      <tbody>
        {props.results.map(
          ({ parsedTitle, parsedPrice, parsedLink, parsedCategory, parsedImage }) => {
            console.log(parsedTitle)
            return (
              <tr>
                <td className='drac-text drac-text-white'>{parsedTitle}</td>
                <td className='drac-text drac-text-white'>{parsedPrice}</td>
                <td className='drac-text drac-text-white' style={{ maxWidth: 200 }}>
                  {parsedImage}
                </td>
                <td className='drac-text drac-text-white' style={{ maxWidth: 200 }}>
                  {parsedCategory}
                </td>
              </tr>
            )
          },
        )}
      </tbody>
    </Table>
  )
}
