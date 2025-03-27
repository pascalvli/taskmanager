import { useData } from "./useData";

export default function useTasks() {
  console.log("inside useTasks hook");
  return useData((state) => state.state);
}
