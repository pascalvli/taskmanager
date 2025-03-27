// import useTaskContext from "../Store/useTaskContext";
import "./tasks.css";
import Task from "./Task";
import AddForm from "./AddForm";
import useTasks from "../Store/useTasks";
import useTask from "../Store/useTask";

export default function Tasks() {
  const state = useTasks();
  console.log("state:", state);
  const { addTask } = useTask();
  // const { state, addTask } = useTaskContext();
  console.log("state in Tasks.jsx:", state);

  return (
    <>
      <ul className='tasks-list'>
        {state.map((item) => (
          <li key={item.id}>
            <Task {...item}></Task>
          </li>
        ))}
      </ul>
      <AddForm
        placeHolder='Add new Task'
        onSubmit={addTask}
        className='task__input tasks-list__addForm'
      ></AddForm>
    </>
  );
}
