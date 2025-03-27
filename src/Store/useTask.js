import { useData } from "./useData";

export default function useTask() {
  const toggleFold = useData((state) => state.toggleFold);
  const deleteTask = useData((state) => state.deleteTask);
  const addTask = useData((state) => state.addTask);
  const editTask = useData((state) => state.editTask);
  const addSubTask = useData((state) => state.addSubTask);

  return { toggleFold, addTask, deleteTask, editTask, addSubTask };
}
