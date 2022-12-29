import { Fragment, useState } from 'react';

import TaskForm from './TaskForm';
import classes from './Task.module.css';
const Task = (props) => {
  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState(null);

  const TaskSendDatahandler = async (TaskText) => {
    setisloading(true);
    seterror(null);

    try {
      const response = await fetch(
        'https://react-4d481-default-rtdb.firebaseio.com/TaskData.json',
        {
          method: 'POST',
          body: JSON.stringify({ task: TaskText }),
          headers: {
            'Content-Type': 'Application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `SOMETHING WENT WRONG ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      const generatedId = data.name;

      const TaskDataObj = { id: generatedId, text: TaskText };

      props.onSendDataObj(TaskDataObj);

      console.log(data);
    } catch (error) {
      seterror(error);
    }
    setisloading(false);
  };

  return (
    <Fragment>
      <TaskForm
        onsendData={TaskSendDatahandler}
        loading={isloading}
        error={error}
      />
      {error && <p className={classes.p}>{error.message}</p>}
    </Fragment>
  );
};

export default Task;
