import classes from './AddTask.module.css';
import Card from '../common/Card';
import Button from '../common/Button';
import { useRef } from 'react';
import useHTTP from './../../hooks/use-http';

const AddTask = (props) => {
  const inputRef = useRef();

  const { isLoading, fetchTasks: saveTasks } = useHTTP();

  const createdTask = (taskText, taskData) => {
    props.onFetch({
      id: taskData.name,
      title: taskText,
    });
    inputRef.current.value = '';
  };

  const addTaskHandler = (event) => {
    event.preventDefault();
    const input = inputRef.current.value;
    saveTasks(
      {
        url: 'https://react-tasklist-7c619-default-rtdb.firebaseio.com/tasks.json',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          title: input,
        },
      },
      createdTask.bind(null, input)
    );
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={addTaskHandler}>
        <input type="text" ref={inputRef}></input>
        <Button type="submit">{isLoading ? 'sending..' : 'Add Task'}</Button>
      </form>
    </Card>
  );
};

export default AddTask;
