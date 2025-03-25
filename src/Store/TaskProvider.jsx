import useTaskReducer from "./reducer";
import { TaskContext } from "./taskContext";

export function TaskProvider({ children }) {
  const ctx = useTaskReducer();

  return <TaskContext.Provider value={ctx}>{children}</TaskContext.Provider>;
}
