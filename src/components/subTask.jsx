import "./subTask.css";

import AddForm from "./AddForm";
import { useState } from "react";
import useSubTask from "../Store/useSubTask";

export default function SubTask({ taskId, title, id: subTaskId, isComplete }) {
  const [isEdit, setIsEdit] = useState(false);
  const { saveSubTask, toggleSubTaskStatus, deleteSubTask, moveUp, moveDown } =
    useSubTask();

  let timer;
  function handleMouseDown() {
    timer = setTimeout(() => {
      setIsEdit((prev) => !prev);
    }, 500);
  }
  //mobile friendly variant
  function handleTouchStart() {
    timer = setTimeout(() => {
      setIsEdit((prev) => !prev);
    }, 500);
  }

  function handleMouseUp() {
    clearTimeout(timer);
  }

  function handleMouseLeave() {
    clearTimeout(timer);
  }
  function handleTouchEnd() {
    clearTimeout(timer);
  }

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
            <input
              className='subTask__toggle'
              checked={isComplete}
              type='checkbox'
              name='toggle'
              onChange={() => {
                toggleSubTaskStatus({ taskId, subTaskId });
              }}
            />
            <p
              className='subTask__title'
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {title}
            </p>
          </section>
          <section className='subTask__controls'>
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
