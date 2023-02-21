import './App.css';
import AddTask from './components/tasks/AddTask';
import TaskList from './components/tasks/TaskList';
import Card from './components/common/Card';
import { useState } from 'react';
import useHTTP from './hooks/use-http';

const DUMMY_TASKS = [
  {
    id: 1,
    title: 'Complete React Course',
  },
  {
    id: 2,
    title: 'Complete JS exercise',
  },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const { error, isLoading, fetchTasks } = useHTTP();

  useState(() => {
    const transformTasks = (data) => {
      const loadedTasks = [];
      for (const key in data) {
        loadedTasks.push({
          id: key,
          title: data[key].title,
        });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(
      {
        url: 'https://react-tasklist-7c619-default-rtdb.firebaseio.com/tasks.json',
        method: 'GET',
      },
      transformTasks
    );
  }, [fetchTasks]);

  const addTaskHandler = (task) => {
    setTasks((prevState) => {
      console.log(task);
      return [...prevState, task];
    });
  };

  let content = <p>No tasks found. Start adding some!</p>;

  if (isLoading) {
    content = <p>loading ...</p>;
  } else if (!isLoading && error) {
    content = <p>{error}</p>;
  } else if (!isLoading && tasks.length > 0) {
    content = <TaskList tasks={tasks} />;
  }

  return (
    <div className="App">
      <AddTask onFetch={addTaskHandler} />
      <Card>{content}</Card>
    </div>
  );
}

export default App;
