
import React, { useState } from 'react'
import 'dracula-ui/styles/dracula-ui.css'
import { Paragraph, Input, Button, OrderedList } from 'dracula-ui'
import {Task} from './components/Task'
import getTasks from '@wasp/queries/getTasks'
import createTask from '@wasp/actions/createTask'
import updateTask from '@wasp/actions/updateTask'
import { useQuery } from '@wasp/queries'

import './Main.css'

const MainPage = () => {
  const { data: tasks, error: tasksError, isLoading: tasksIsLoading } = useQuery(getTasks, null)

  console.log(tasksError)
  const [state, setState] = useState("");
  function handleCreateTask(e) {
    e.preventDefault()
    if (state === "") return
    createTask({ description: state, completed: false }).then(() => {
      console.log("Task created!");
      setState("");
      e.target.value = "";
    });
  };

  return (
    <main className='layout-root drac-bg-black'>
      <Paragraph color="black">Hello Vampire</Paragraph>
      <h1 className="drac-heading drac-heading-2xl drac-text-white">h1</h1>
      {tasksIsLoading && <div>Loading...</div>}
      {tasksError && <div>Error: {tasksError}</div>}
      <OrderedList color="purple" >
        {tasks && tasks.map((task) => (
          <Task {...{updateTask, task}} />        
        ))}
      </OrderedList>
      <aside>
        <form>
          <Input type="text" placeholder="Task description" value={state} color='white' onChange={(e) => setState(e.target.value)} />
          <Button disabled={!state}  color="purple" type="submit" onClick={handleCreateTask}>Create Task</Button>;
        </form>
      </aside>
    </main>
  )
}
export default MainPage

