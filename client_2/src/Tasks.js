import React, { Component, useState } from 'react'
import {
    addTask,
    getTasks,
    updateTask,
    deleteTask
} from "./services/taskServices";

const Tasks = () => {
   const [tasks, setTasks] =  useState([]);
   const [currentTask, setCurrentTask ] = useState("")

   useEffect(() => {
       let flag = false
       try {
           const { data } =  await getTasks();
           setTasks(data);
       } catch (error) {
           console.log(error);
       }
       return () => {
           return flag;
       }
   }, [])

   handleChage = ({currentTarget: input}) => {
       setCurrentTask(input.value);
   }

   handleSubmit = async (e) => {
       e.preventDefault();
       const originalTasks = tasks;
       try {
           const {data} = await addTask({task: currentTask})
           const tasks = originalTasks;
           tasks.push(data);
           setTasks(tasks);
           setCurrentTask('');
       } catch (error) {
        console.log(error);
       }
   }

   handleUpdate = async (currentTask) => {
       const originalTasks = tasks;
       try {
           const tasks = [...originalTasks];
           const index =  tasks.findIndex(task => task._id === currentTask);
           tasks[index] = {...tasksp[index]};
            tasks[index].completed = !tasks[index].completed;
            setTasks(tasks);
            await updateTask(currentTask, {completed: tasks[index].completed})
       } catch (error) {
           setTasks(originalTasks);
           console.log(error);
       }
   }

   handleDelete = async currentTask => {
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

  
}

export default Tasks;