import Task from './Task';

const TaskList = (props) => {
  return (
    <ul>
      {props.tasks.map((task) => {
        return <Task task={task} key={task.id} />;
      })}
    </ul>
  );
};

export default TaskList;
