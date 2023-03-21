
import React, { useState } from 'react'

import { Paragraph, Input, Button, OrderedList, Select } from 'dracula-ui'
import { Task } from './components/Task'

import { useQuery } from '@wasp/queries'
import getTasks from '@wasp/queries/getTasks'
import getTypes from '@wasp/queries/getTypes'

import createTask from '@wasp/actions/createTask'
import performTask from '@wasp/actions/performTask'
import updateTask from '@wasp/actions/updateTask'

import 'dracula-ui/styles/dracula-ui.css'
import './Main.css'

const MainPage = () => {
  const { data: tasks, error: tasksError, isLoading: tasksIsLoading } = useQuery(getTasks, null)
  const { data: types, error: typesError, isLoading: typesIsLoading } = useQuery(getTypes, null)
  const [state, setState] = useState({ name: "", query: "", description: "", completed: false, typeId: null });


  function handleCreateTask(e) {
    e.preventDefault()
    if (state === "") return
    createTask(state).then(() => {
      console.log("Task created!");
      setState({ name: "", query: "", description: "", completed: false, typeId: null });
      e.target.value = "";
    });
  };

  const draculaColors = [
    "cyan" , "green" , "orange" , "pink" , "purple" , "red" , "yellow"
  ]

  return (
    <main className='layout-root drac-bg-black'>
      <Paragraph color="black">Scraping</Paragraph>
      <h1 className="drac-heading drac-heading-2xl drac-text-white">Tasks</h1>
      {tasksIsLoading && <div>Loading...</div>}
      {tasksError && <div>Error: {tasksError}</div>}

      {types && types.map((type, index) => (
        <OrderedList color="" key={type.id}>
            <h2 className="drac-heading drac-heading-xl drac-text-white">{type.name}</h2>
              {tasks && tasks.filter(t => t.type?.name == type.name).map((task) => (
                <Task {...{updateTask, performTask, task, color: draculaColors[index] }} key={task.id} />
              ))}
        </OrderedList>
      ))}
      <aside>
        <form>
          <Input type="text" placeholder="Task Query" value={state.input} color='white' onChange={(e) => setState(p => ({ ...p, query: e.target.value}))} />
          <Input type="text" placeholder="Task name" value={state.input} color='white' onChange={(e) => setState(p => ({ ...p, name: e.target.value}))} />
          <Input type="text" placeholder="Task description" value={state.input} color='white' onChange={(e) => setState(p => ({ ...p, description: e.target.value}))} />

          <div style={{ display: 'flex', flexDirection: 'row'}}>
            <Button disabled={!state}  color="purple" type="submit" onClick={handleCreateTask}>Create Task</Button>

            <Select defaultValue="default" variant="normal" color="white" size="small" onChange={(e) => setState(p => ({ ...p, typeId: e.target.key}))} >
            <option value="default" disabled={true}>
              Select option
            </option>
              {types && types.map(type => (
                <option key={type.id}>{type.name}</option>
              ))}
            </Select>
          </div>
        </form>
      </aside>
    </main>
  )
}
export default MainPage

