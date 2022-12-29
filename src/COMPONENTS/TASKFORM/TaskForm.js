import { useRef, useState } from 'react';

import TaskInput from '../TASKINPUT/TaskInput';
import classes from './TaskForm.module.css';

const TaskForm = (props) => {
  const [error, seterror] = useState(false);

  const TaskText = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const TaskTextName = TaskText.current.value;
    if (TaskTextName.trim().length === 0) {
      seterror(true);
      return;
    }

    if (TaskTextName.trim().length > 0) {
      seterror(false);
      props.onsendData(TaskTextName);
    }
    TaskText.current.value = '';
  };

  return (
    <TaskInput>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.wrapper}>
          <input ref={TaskText} className={classes.input} type="text" />
          <button className={classes.button} type="submit">
            {props.loading ? 'SENDING' : 'ADD TASK'}
          </button>
        </div>
        {error && <p className={classes.error}>PLEASE ENTER SOME VALID DATA</p>}
      </form>
    </TaskInput>
  );
};

export default TaskForm;
