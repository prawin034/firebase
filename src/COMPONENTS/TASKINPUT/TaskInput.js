import classes from './TaskInput.module.css';

const TaskInput = (props) => {
  return <div className={classes.input}>{props.children}</div>;
};

export default TaskInput;
