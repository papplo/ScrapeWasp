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
          <th className='drac-text drac-text-white'>Result title</th>
          <th className='drac-text drac-text-white'>Price</th>
          <th className='drac-text drac-text-white' style={{ maxWidth: 200 }}>
            Image
          </th>
          <th>
            Category
          </th>
        </tr>
      </thead>
      <tbody>
        {props.results.map(
          ({ parsedTitle, parsedPrice, parsedLink, parsedCategory, parsedImage, parsedQuery }) => {
            return (
              <tr>
                <td className='drac-text drac-text-white'><a className='drac-text-grey-secondary' href={parsedLink}>{parsedTitle}</a></td>
                <td className='drac-text drac-text-white'>{parsedPrice}</td>
                <td className='drac-text drac-text-white' style={{ maxWidth: 200, overflow: 'hidden' }}>
                  {/* <img src={parsedImage} /> */}
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
