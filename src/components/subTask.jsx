import "./subTask.css";

import useTaskContext from "../Store/useTaskContext";
import AddForm from "./AddForm";
import { useState } from "react";

export default function SubTask({ taskId, title, id: subTaskId, isComplete }) {
  const [isEdit, setIsEdit] = useState(false);
  const { saveSubTask, toggleSubTaskStatus, deleteSubTask, moveUp, moveDown } =
    useTaskContext();
  return (
    <>
      {isEdit && (
        <AddForm
          taskId={taskId}
          title={title}
          subTaskId={subTaskId}
          handleSetIsEdit={setIsEdit}
          onSubmit={saveSubTask}
          className='task__input'
        ></AddForm>
      )}
      {!isEdit && (
        <article className={`subTask subTask${isComplete ? "-completed" : ""}`}>
          <section className='subTask__main'>
            <img
              className='subTask__main-icon'
              src='/icons/drag.svg'
              alt='hamburger'
            />
            <input
              className='subTask__toggle'
              type='checkbox'
              name='toggle'
              onChange={() => {
                toggleSubTaskStatus({ taskId, subTaskId });
              }}
            />
            <p className='subTask__title'>{title}</p>
          </section>
          <section className='subTask__controls'>
            <button
              className='subTask__controls-edit'
              onClick={() => {
                setIsEdit((prev) => !prev);
              }}
            >
              <img
                className='subTask__controls-icon'
                src='/icons/pencil.svg'
                alt='pencil'
              />
            </button>
            <button
              className='subTask__controls-delete'
              onClick={() => {
                deleteSubTask({ taskId, subTaskId });
              }}
            >
              <img
                className='subTask__controls-icon'
                src='/icons/trash.svg'
                alt='delete'
              />
            </button>
            <button
              className='subTask__controls-moveup'
              onClick={() => moveUp({ taskId, subTaskId })}
            >
              <img
                className='subTask__controls-icon'
                src='/icons/up.svg'
                alt='up'
              />
            </button>
            <button
              className='subTask__controls-movedown'
              onClick={() => moveDown({ taskId, subTaskId })}
            >
              <img
                className='subTask__controls-icon'
                src='/icons/down.svg'
                alt='down'
              />
            </button>
          </section>
        </article>
      )}
    </>
  );
}
