import "./task.css";

import AddForm from "./AddForm";
import { useState, useEffect } from "react";
import useTask from "../Store/useTask";
import SubTask from "./subTask";

export default function Task({ task, id, subTasks, isTaskFolded }) {
  const { toggleFold, deleteTask, editTask, addSubTask } = useTask();

  const [completion, setCompletion] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const completedTasks = subTasks.filter((task) => task.isComplete).length;
    setCompletion(Math.floor((completedTasks / subTasks.length) * 100) || 0);
  }, [subTasks]);

  return (
    <>
      <article className='task'>
        <div className='task__summary'>
          {isEdit && (
            <AddForm
              onSubmit={editTask}
              title={task}
              taskId={id}
              handleSetIsEdit={setIsEdit}
              className='task__input task__input-header'
            ></AddForm>
          )}
          {!isEdit && (
            <div className='task__header'>
              <div className='task__main'>
                <button
                  className='task__toggle'
                  onClick={() => toggleFold({ id })}
                >
                  <img
                    className={`task__toggle-icon task__toggle-icon${
                      isTaskFolded ? "-fold" : "-unfold"
                    }`}
                    src='/icons/caret.svg'
                    alt='caret'
                  />
                </button>
                <h2 className='task__title'>{task}</h2>
              </div>
              <span className='task__completion'>{`${completion}%`}</span>
              {!isTaskFolded && (
                <div className='task__header-controls'>
                  <button
                    className='task__header-button'
                    onClick={() => setIsEdit((prev) => !prev)}
                  >
                    edit
                  </button>
                  <button
                    className='task__header-button'
                    onClick={() => {
                      deleteTask({ id });
                    }}
                  >
                    delete
                  </button>
                </div>
              )}
            </div>
          )}
          {/*progress bar */}
          {subTasks.length > 0 && !isTaskFolded && (
            <div className='task__progressbar'>
              <div
                className='task__progressbar-length'
                style={{ width: `${completion}%` }}
              ></div>
            </div>
          )}
        </div>
        {!isTaskFolded && (
          <section
            className={`task__details task__details${
              isTaskFolded ? "-fold" : "-unfold"
            }`}
          >
            <ol>
              {subTasks.map((subtask) => (
                <li key={subtask.id}>
                  <SubTask taskId={id} {...subtask}></SubTask>
                  <hr />
                </li>
              ))}
            </ol>
            {/* form to add a new task */}
            <AddForm
              taskId={id}
              onSubmit={addSubTask}
              placeHolder='add new subtask'
              className='subTask__addForm'
            ></AddForm>
          </section>
        )}
      </article>
    </>
  );
}
