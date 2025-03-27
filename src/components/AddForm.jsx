import { useState } from "react";
import "./addForm.css";

export default function AddForm({
  taskId,
  subTaskId,
  title,
  handleSetIsEdit,
  onSubmit,
  placeHolder,
  className,
}) {
  console.log("onSubmit:", onSubmit);
  const [editTitle, setEditTitle] = useState(title || "");

  function handleSubmit(e) {
    e.preventDefault();
    const trimTitle = editTitle.trim();
    if (!trimTitle || trimTitle === title) {
      handleSetIsEdit && handleSetIsEdit(false);
      return;
    }

    onSubmit({ taskId, subTaskId, editTitle: trimTitle });
    handleSetIsEdit && handleSetIsEdit((prev) => !prev);
    setEditTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input
        className={className}
        type='text'
        placeholder={placeHolder}
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
      />
      <button className='task__input-button'>
        <img className='task__input-icon' src='/icons/save.svg' alt='save' />
      </button>
    </form>
  );
}
