import React, { useState } from "react";

function HabitList({ habits, toggleHabit, deleteHabit, editHabitName }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [newName, setNewName] = useState("");

  const handleEdit = (index, currentName) => {
    setEditingIndex(index);
    setNewName(currentName);
  };

  const saveEdit = (index) => {
    if (newName.trim() !== "") {
      editHabitName(index, newName);
      setEditingIndex(null);
      setNewName("");
    }
  };

  return (
    <ul>
      {habits.map((habit, index) => (
        <li key={index}>
          <input
            type="checkbox"
            checked={habit.completed}
            onChange={() => toggleHabit(index)}
          />

          {editingIndex === index ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button onClick={() => saveEdit(index)}>💾 Save</button>
            </>
          ) : (
            <>
              {habit.name}
              <button
                onClick={() => handleEdit(index, habit.name)}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#2196f3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "5px 10px",
                  cursor: "pointer"
                }}
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => deleteHabit(index)}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "5px 10px",
                  cursor: "pointer"
                }}
              >
                🗑
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default HabitList;
