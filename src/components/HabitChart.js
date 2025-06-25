import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function HabitChart({ habits }) {
  const chartData = habits.map((habit) => ({
    name: habit.name,
    completed: habit.history ? habit.history.length : 0
  }));

  return (
    <div style={{ width: '100%', height: 300, marginTop: "40px" }}>
      <h2>📊 Habit Completion Chart</h2>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="completed" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HabitChart;
