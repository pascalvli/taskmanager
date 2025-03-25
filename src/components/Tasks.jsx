import useTaskContext from "../Store/useTaskContext";
import "./tasks.css";
import Task from "./Task";
import AddForm from "./AddForm";
export default function Tasks() {
  const { state, addTask } = useTaskContext();
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
