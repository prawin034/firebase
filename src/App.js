import './App.css';
import Task from './COMPONENTS/TASKFORM/Task';
import TaskList from './COMPONENTS/TASKLIST/TaskList';
import { useState, useEffect } from 'react';
function App() {
  const [Tasks, setTasks] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState(null);
  const fetchDataHandler = async () => {
    setisloading(true);
    seterror(null);
    try {
      const response = await fetch(
        'https://react-4d481-default-rtdb.firebaseio.com/TaskData.json'
      );
      if (!response.ok) {
        throw new Error(
          `SOMETHING WENT WRONG ${response.status} ${response.statusText} `
        );
      }

      const data = await response.json();

      const loadedData = [];

      for (const key in data) {
        loadedData.push({
          id: key,
          text: data[key].task,
        });
      }
      setTasks(loadedData);

      console.log(loadedData);
    } catch (error) {
      console.log(error);
      seterror(error.message);
    }
    setisloading(false);
  };

  useEffect(() => {
    fetchDataHandler();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };
  return (
    <div className="App">
      <h1>FIREBASE DATA SHARING AND FETCHING</h1>
      <Task onSendDataObj={taskAddHandler} />
      <TaskList
        items={Tasks}
        loading={isloading}
        onfetch={fetchDataHandler}
        error={error}
      />
    </div>
  );
}

export default App;
