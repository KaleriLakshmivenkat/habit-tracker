import React, { useState, useEffect } from "react";
import './App.css';
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";

function App() {
  const [habits, setHabits] = useState([]);

  // Load habits from localStorage when app starts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(saved);
  }, []);

  // Save habits to localStorage on change
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // Add a new habit
  const addHabit = (name) => {
    setHabits([...habits, { name, completed: false }]);
  };

  // Toggle checkbox for a habit
  const toggleHabit = (index) => {
    const updated = [...habits];
    updated[index].completed = !updated[index].completed;
    setHabits(updated);
  };

  // Delete a habit
  const deleteHabit = (index) => {
    const updated = [...habits];
    updated.splice(index, 1);
    setHabits(updated);
  };

  // ✏️ Edit habit name
  const editHabitName = (index, newName) => {
    const updated = [...habits];
    updated[index].name = newName;
    setHabits(updated);
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
    </div>
  );
}

export default App;
