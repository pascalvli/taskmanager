import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

export const useData = create(
  persist(
    immer((set) => ({
      state: [
        {
          task: "",
          id: null,
          subTasks: [{ title: "", id: null, isComplete: false }],
          isTaskFolded: true,
          status: "active",
        },
      ],

      toggleFold: ({ id }) =>
        set((draft) => {
          const task = draft.state.find((task) => task.id === id);
          if (!task) return;
          task.isTaskFolded = !task.isTaskFolded;
        }),
      addSubTask: ({ taskId, editTitle }) =>
        set((draft) => {
          const task = draft.state.find((task) => task.id === taskId);
          if (!task) return;
          task.subTasks.push({
            id: uuidv4(),
            title: editTitle,
            isComplete: false,
          });
        }),
      deleteTask: ({ id }) =>
        set((draft) => {
          const index = draft.state.findIndex((task) => task.id === id);
          if (index === -1) return;
          draft.state.splice(index, 1);
        }),

      addTask: ({ editTitle }) =>
        set((draft) => {
          const newTask = {
            task: editTitle,
            id: uuidv4(),
            subTasks: [],
            isTaskFolded: true,
            status: "active",
            completion: 0,
          };
          draft.state.push(newTask);
        }),

      editTask: ({ taskId, editTitle }) =>
        set((draft) => {
          const task = draft.state.find((task) => task.id === taskId);
          if (!task) return;
          task.task = editTitle;
        }),

      saveSubTask: ({ taskId, subTaskId, editTitle }) =>
        set((draft) => {
          const subTask = draft.state
            .find((task) => task.id === taskId)
            ?.subTasks.find((el) => el.id === subTaskId);

          if (!subTask) return;
          subTask.title = editTitle;
        }),

      deleteSubTask: ({ subTaskId, taskId }) =>
        set((draft) => {
          const task = draft.state.find((task) => task.id === taskId);
          if (!task) return;
          const ind = task.subTasks.findIndex((el) => el.id === subTaskId);
          if (ind === -1) return;
          task.subTasks.splice(ind, 1);
        }),

      toggleSubTaskStatus: ({ taskId, subTaskId }) =>
        set((draft) => {
          const subTask = draft.state
            .find((task) => task.id === taskId)
            ?.subTasks?.find((el) => el.id === subTaskId);
          if (!subTask) return;
          subTask.isComplete = !subTask.isComplete;
        }),

      moveDown: ({ taskId, subTaskId }) =>
        set((draft) => {
          const subTasks = draft.state.find(
            (task) => task.id === taskId
          )?.subTasks;
          if (!subTasks) return;
          const subTaskIndex = subTasks.findIndex((el) => el.id === subTaskId);

          //return if subTask item not found or if its last in array
          if (subTaskIndex === -1 || subTaskIndex === subTasks.length - 1)
            return;
          //swap the items in teh array
          [subTasks[subTaskIndex], subTasks[subTaskIndex + 1]] = [
            subTasks[subTaskIndex + 1],
            subTasks[subTaskIndex],
          ];
        }),
      moveUp: ({ taskId, subTaskId }) =>
        set((draft) => {
          const subTasks = draft.state.find(
            (task) => task.id === taskId
          )?.subTasks;
          if (!subTasks) return;
          const subTaskIndex = subTasks.findIndex((el) => el.id === subTaskId);

          //return if subTask item not found or if first in array
          if (subTaskIndex === -1 || subTaskIndex === 0) return;
          //swap the items in teh array
          [subTasks[subTaskIndex - 1], subTasks[subTaskIndex]] = [
            subTasks[subTaskIndex],
            subTasks[subTaskIndex - 1],
          ];
        }),
    })),
    { name: "task-manager" }
  )
);
