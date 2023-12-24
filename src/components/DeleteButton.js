import { useState } from "react";
import Trash from "./icons/Trash";

export default function DeleteButton({ label, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="flex item-center bg-black/70 absolute inset-0 justify-center  items-center">
        <div className="absolute mx-auto  bg-white p-4 rounded-lg">
          <div>Are you sure you want to delete</div>
          <div className="inline-flex gap-2 mt-1">
            <button type="button" onClick={() => setShowConfirm(false)}>
              Cancel
            </button>
            <button
              onClick={()=>{onDelete()
                 setShowConfirm(false)}}
              className="submit inline-flex"
              type="button"
            >
              Yes,&nbsp;Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <button type="button" onClick={() => setShowConfirm(true)}>
      <Trash />
      <span>{label}</span>
    </button>
  );
}
