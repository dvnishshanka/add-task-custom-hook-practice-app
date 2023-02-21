import classes from './Task.module.css';

const Task = (props) => {
  return <li className={classes.task}>{props.task.title}</li>;
};

export default Task;
