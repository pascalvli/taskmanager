import { TaskContext } from "./taskContext";
import { useContext } from "react";

export default function useTaskContext() {
  return useContext(TaskContext);
}
