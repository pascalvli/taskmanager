import Header from "./Header";
import "./taskManager.css";
import Tasks from "./Tasks";
// import { TaskProvider } from "../Store/TaskProviderB";
export default function TaskManager() {
  return (
    <div className='task-container'>
      <Header></Header>
      <Tasks></Tasks>
    </div>
  );
}
