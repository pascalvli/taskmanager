import Header from "./Header";
import "./taskManager.css";
import Tasks from "./Tasks";
import { TaskProvider } from "../Store/TaskProvider";
export default function TaskManager() {
  return (
    <div className='task-container'>
      <Header></Header>
      <TaskProvider>
        <Tasks></Tasks>
      </TaskProvider>
      {/* <addTask></addTask> */}
    </div>
  );
}
