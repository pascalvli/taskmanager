import { useData } from "./useData";

export default function useSubTask() {
  const toggleSubTaskStatus = useData((state) => state.toggleSubTaskStatus);
  const deleteSubTask = useData((state) => state.deleteSubTask);

  const saveSubTask = useData((state) => state.saveSubTask);
  const moveDown = useData((state) => state.moveDown);
  const moveUp = useData((state) => state.moveUp);

  return {
    toggleSubTaskStatus,
    deleteSubTask,
    saveSubTask,
    moveDown,
    moveUp,
  };
}
