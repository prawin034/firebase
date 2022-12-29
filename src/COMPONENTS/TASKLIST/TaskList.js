import TaskInput from '../TASKINPUT/TaskInput';

import classes from './TaskList.module.css';

const TaskList = (props) => {
  let tasklist = (
    <h2 className={classes['no-data']}>
      NO DATA FOUND - PLEASE SEND DATA TO FETCH
    </h2>
  );

  if (props.items.length > 0) {
    tasklist = (
      <ul className={classes.list}>
        {props.items.map((item) => (
          <li className={classes.li} key={item.id}>
            {item.text}
          </li>
        ))}
      </ul>
    );
  }

  let content = tasklist;

  if (props.loading) {
    content = <p className={classes.loading}>DATA LOADING PLEASE WAIT...</p>;
  }
  if (props.error) {
    content = <p className={classes.error}>{props.error}</p>;
  }

  return (
    <TaskInput>
      <div>{content}</div>
    </TaskInput>
  );
};

export default TaskList;
