import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
  {
    id: 1,
    text: 'Doctors Appointment',
    day: 'Feb 5th at 2:30pm',
    reminder: true,
  },
  {
    id: 2,
    text: 'Meeting at school',
    day: 'Feb 6th at 1:30pm',
    reminder: true,
  },
  {
    id: 3,
    text: 'Create your web site with sass',
    day: 'Today by 12pm',
    reminder: true,
  }
  ])

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

// Add Task
const addTask = async (task) => {
  // const res = await fetch('http://localhost:5000/tasks', {
  //   method: 'POST',
  //   headers: {
  //     'Content-type': 'application/json',
  //   },
  //   body: JSON.stringify(task),
  // })

  // const data = await res.json()

  // setTasks([...tasks, data])

  const id = Math.floor(Math.random() *10000) + 1
  const newTask = { id, ...task }
  setTasks([...tasks, newTask])
}

// Delete Task
const deleteTask = (id) => {
  // await fetch(`http://localhost:5000/tasks/${id}`, {
  //   method: 'DELETE',
  // })

  setTasks(tasks.filter((task) => task.id !==
  id))
}

// Toggle Reminder
const toggleReminder = (id) => {
  setTasks(tasks.map((task) => 
  task.i === id ? { ...task, reminder:
  !task.reminder } : task
  ))
}

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? ( 
      <Tasks tasks={tasks} 
      onDelete={deleteTask} 
      onToggle={toggleReminder} 
      />
      ) : ( 
        'No Tasks To Show'
      )}
    </div>
  );
}

export default App;
