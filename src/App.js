import React, { useState, useEffect } from "react";
import './App.css';
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import HabitChart from "./components/HabitChart"; // ✅ Chart component

function App() {
  const [habits, setHabits] = useState([]);

  // Load habits from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(saved);
  }, []);

  // Save habits to localStorage
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // Add a new habit
  const addHabit = (name) => {
    setHabits([...habits, { name, completed: false, history: [] }]);
  };

  // Toggle checkbox and update date history
  const toggleHabit = (index) => {
    const updated = [...habits];
    updated[index].completed = !updated[index].completed;

    const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd

    if (updated[index].completed) {
      if (!updated[index].history.includes(today)) {
        updated[index].history.push(today);
      }
    } else {
      updated[index].history = updated[index].history.filter(date => date !== today);
    }

    setHabits(updated);
  };

  // Delete a habit
  const deleteHabit = (index) => {
    const updated = [...habits];
    updated.splice(index, 1);
    setHabits(updated);
  };

  // Edit habit name
  const editHabitName = (index, newName) => {
    const updated = [...habits];
    updated[index].name = newName;
    setHabits(updated);
  };

  // 🔄 Reset all habits
  const resetHabits = () => {
    const confirmReset = window.confirm("Are you sure you want to reset all habits?");
    if (confirmReset) {
      setHabits([]);
      localStorage.removeItem("habits");
    }
  };

  return (
    <div className="App">
      <h1>🧠 Habit Tracker</h1>
      <HabitForm addHabit={addHabit} />
      <HabitList
        habits={habits}
        toggleHabit={toggleHabit}
        deleteHabit={deleteHabit}
        editHabitName={editHabitName}
      />
      <HabitChart habits={habits} />
      <button
        onClick={resetHabits}
        style={{
          marginTop: "20px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        🔄 Reset All Habits
      </button>
    </div>
  );
}

export default App;
