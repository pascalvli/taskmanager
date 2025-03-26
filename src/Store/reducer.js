import {
  TOGGLEFOLD,
  TOGGLESUBTASKSTATUS,
  DELETESUBTASK,
  SAVESUBTASK,
  ADDSUBTASK,
  ADDTASK,
  DELETETASK,
  EDITTASK,
  MOVEDOWN,
  MOVEUP,
  // DRAG_SUBTASK,
  DROP_SUBTASK,
} from "./actiontypes";
import { v4 as uuidv4 } from "uuid";
import { initialState } from "../data/data,js";
import { useReducer, useEffect } from "react";

export function reducer(state, action) {
  switch (action.type) {
    case TOGGLEFOLD:
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, isTaskFolded: !task.isTaskFolded }
          : task
      );
    case ADDSUBTASK:
      return state.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              subTasks: [
                ...task.subTasks,
                { id: uuidv4(), title: action.payload.editTitle },
              ],
            }
          : task
      );
    case DELETETASK:
      return state.filter((task) => task.id !== action.payload.id);

    case MOVEUP: {
      return state.map((task) => {
        if (task.id !== action.payload.taskId) return task;

        const subTasks = [...task.subTasks];
        const index = subTasks.findIndex(
          (subTask) => subTask.id === action.payload.subTaskId
        );

        if (index === 0) return task; // Can't move up if already at index 0

        [subTasks[index], subTasks[index - 1]] = [
          subTasks[index - 1],
          subTasks[index],
        ];
        return { ...task, subTasks };
      });
    }

    case MOVEDOWN: {
      return state.map((task) => {
        if (task.id !== action.payload.taskId) return task;

        const subTasks = [...task.subTasks];
        const index = subTasks.findIndex(
          (subTask) => subTask.id === action.payload.subTaskId
        );

        if (index === subTasks.length - 1) return task; // Can't move down if already at last index

        [subTasks[index], subTasks[index + 1]] = [
          subTasks[index + 1],
          subTasks[index],
        ];
        return { ...task, subTasks };
      });
    }
    case ADDTASK: {
      const newTask = {
        task: action.payload.editTitle,
        id: uuidv4(),
        subTasks: [],
        isTaskFolded: true,
        status: "active",
        completion: 0,
      };
      return [...state, newTask];
    }
    case EDITTASK:
      return state.map((task) =>
        task.id === action.payload.taskId
          ? { ...task, task: action.payload.editTitle }
          : task
      );
    case SAVESUBTASK:
      return state.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              subTasks: task.subTasks.map((subtask) => {
                return subtask.id === action.payload.subTaskId
                  ? { ...subtask, title: action.payload.editTitle }
                  : subtask;
              }),
            }
          : task
      );

    // case DRAG_SUBTASK:
    //   return {
    //     ...state,
    //     draggingSubTask: action.payload, // Store the dragged subtask info
    //   };

    case DROP_SUBTASK:
      return state.map((task) => {
        if (task.id !== action.payload.taskId) return task;

        const { sourceIndex, destinationIndex } = action.payload;
        const updatedSubTasks = [...task.subTasks];

        // Ensure indices are valid
        if (
          sourceIndex < 0 ||
          destinationIndex < 0 ||
          sourceIndex >= updatedSubTasks.length ||
          destinationIndex >= updatedSubTasks.length
        ) {
          return task;
        }

        // Swap the subtasks
        const [movedSubTask] = updatedSubTasks.splice(sourceIndex, 1);
        updatedSubTasks.splice(destinationIndex, 0, movedSubTask);

        return {
          ...task,
          subTasks: updatedSubTasks,
        };
      });

    case DELETESUBTASK:
      return state.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              subTasks: task.subTasks.filter(
                (subTask) => subTask.id !== action.payload.subTaskId
              ),
            }
          : task
      );

    case TOGGLESUBTASKSTATUS:
      return state.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              subTasks: task.subTasks.map((subtask) => {
                console.log("you are in subtaskmap");
                return subtask.id === action.payload.subTaskId
                  ? { ...subtask, isComplete: !subtask.isComplete }
                  : subtask;
              }),
            }
          : task
      );

    default:
      return state;
  }
}

export default function useTaskReducer() {
  // Load state from localStorage or use initialState
  const storedState = JSON.parse(localStorage.getItem("tasks"));
  const [state, dispatch] = useReducer(reducer, storedState || initialState);

  // Save to localStorage whenever state updates
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state));
  }, [state]);

  const toggleFold = (payload) => dispatch({ type: TOGGLEFOLD, payload });
  const addSubTask = (payload) => dispatch({ type: ADDSUBTASK, payload });
  const addTask = (payload) => dispatch({ type: ADDTASK, payload });
  const saveSubTask = (payload) => dispatch({ type: SAVESUBTASK, payload });
  const deleteSubTask = (payload) => dispatch({ type: DELETESUBTASK, payload });
  const deleteTask = (payload) => dispatch({ type: DELETETASK, payload });
  const editTask = (payload) => dispatch({ type: EDITTASK, payload });
  const moveDown = (payload) => dispatch({ type: MOVEDOWN, payload });
  const moveUp = (payload) => dispatch({ type: MOVEUP, payload });
  // const dragSubTask = (payload) => dispatch({ type: DRAG_SUBTASK, payload });
  const dropSubTask = (payload) => dispatch({ type: DROP_SUBTASK, payload });
  const toggleSubTaskStatus = (payload) =>
    dispatch({ type: TOGGLESUBTASKSTATUS, payload });

  return {
    state,
    // dragSubTask,
    dropSubTask,
    toggleFold,
    addSubTask,
    addTask,
    editTask,
    deleteTask,
    saveSubTask,
    deleteSubTask,
    toggleSubTaskStatus,
    moveDown,
    moveUp,
  };
}
