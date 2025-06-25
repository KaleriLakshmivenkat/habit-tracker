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
        <li key={index} style={{ marginBottom: "20px" }}>
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
              <span style={{ marginLeft: "10px", fontWeight: "bold" }}>{habit.name}</span>
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

          {/* 📅 Show completed dates */}
          {habit.history && habit.history.length > 0 && (
            <div style={{ marginTop: "10px", marginLeft: "25px" }}>
              <strong>Completed on:</strong>
              <ul style={{ paddingLeft: "20px" }}>
                {habit.history.map((date, i) => (
                  <li key={i}>{date}</li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default HabitList;
