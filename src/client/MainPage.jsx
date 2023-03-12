import getTasks from '@wasp/queries/getTasks'
import createTask from '@wasp/actions/createTask'
import updateTask from '@wasp/actions/updateTask'
import { useQuery } from '@wasp/queries'

import './Main.css'

const MainPage = () => {

  const { data: tasks, error: tasksError, isLoading: tasksIsLoading } = useQuery(getTasks, null)
  return (
    <div className="container">
      <main>

        <h2 className="welcome-title"> Aswap </h2>
        <h3 className="welcome-subtitle">
         Theese are your tasks:      </h3>
        <ul>
          {tasksIsLoading && <div>Loading...</div>}
          {tasksError && <div>Error: {tasksError}</div>}
          {tasks && tasks.map((task) => (<li key={task.id}>{task.description}, {task.id}</li>))}
        </ul>
      </main>
      <aside>
        <form>
          <input type="text" placeholder="Task description" defaultValue="" />
          <input type='submit' value='Create task' />
          <input
          </form>
          <label htmlFor="task-description">Task description</label>
      </aside>
    </div>
  )
}
export default MainPage
