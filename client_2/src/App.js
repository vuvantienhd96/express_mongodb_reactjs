import './App.scss';
import axios from 'axios';
// import Tasks from './Tasks';
import {Paper, TextField, Checkbox, Button} from '@material-ui/core';
import { useState, useEffect } from 'react';
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask
} from "./services/taskServices";


function App() {
  const [tasks, setTasks] =  useState([]);
  const [currentTask, setCurrentTask ] = useState("")

  useEffect( () => {
      let flag = false
      try {
          const { data } = getTasks().then((res) => 
          (setTasks(res.data))
          );
          
      } catch (error) {
          console.log(error);
      }
      return () => {
          return flag;
      }
  }, [])

  const handleChage = ({currentTarget: input}) => {
      setCurrentTask(input.value);
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
     
      debugger
      try {
          const {data} = await addTask({task: currentTask})
         
          //tasks.push(data);
          
          setTasks([...tasks, data]);
          setCurrentTask('');
      } catch (error) {
       console.log(error);
      }
  }

  const handleUpdate = async (currentTask) => {
      const originalTasks = tasks;
      try {
          const tasks = [...originalTasks];
          const index =  tasks.findIndex(task => task._id === currentTask);
          tasks[index] = {...tasks[index]};
           tasks[index].completed = !tasks[index].completed;
           setTasks(tasks);
           await updateTask(currentTask, {completed: tasks[index].completed})
      } catch (error) {
          setTasks(originalTasks);
          console.log(error);
      }
  }

  const handleDelete = async currentTask => {
      const originalTasks = tasks;
      try {
          const tasks = originalTasks.filter(
              task => task._id !== currentTask
          );
          setTasks(tasks);
          await deleteTask(currentTask);
      } catch (error) {
          setTasks(originalTasks);
          console.log(error);
      }
  }
  console.log('task', tasks);
  return (
    <div className="App container-app">
      <h2>Todo list</h2>
      <Paper elevation={3} className="container">
        <div className="heading">To-Do</div>
        <form
          onSubmit={handleSubmit}
          className="flex"
          style={{margin: "15px 0"}}
        >
          <TextField
            variant="outlined"
            size="small"
            style={{with: "80%"}}
            value={currentTask}
            required={true}
            onChange={handleChage}
            placeholder="add new here"
          />
          <Button style={{height: "40px"}} variant="outlined" type="submit" color="primary">Add task</Button>
        </form>
        <div className="form_list">
          {tasks && tasks.map(task => (
            <Paper key={task._id} className="flex task_container">
              <Checkbox
                checked={task.completed}
                onClick={() => handleUpdate(task._id)}
              ></Checkbox>
              <p>{task.task}</p>
            </Paper>
          ))}
        </div>
      </Paper>
    </div>
  );
}

export default App;
