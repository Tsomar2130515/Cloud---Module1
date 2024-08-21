
"use client";
import { useState } from "react";

function AddTaskButton(action) {

    return (
        <button className="buttonDefault addTaskButton" onClick={action}>
            <span className="emojiPlus">➕</span>Ajouter
        </button>
    );
}
export default AddTaskButton;

