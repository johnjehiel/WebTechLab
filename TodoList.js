import React, { useState } from "react";
import "./TodoList.css";
function TodoItem({ task, onDelete }) {
	return (
		<div className="todo-item">
			<span>{task}</span>
			<button onClick={onDelete} className="delete-button">
				Delete
			</button>
		</div>
	);
}

function TodoList() {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");

	const handleTaskChange = (event) => {
		setNewTask(event.target.value);
	};

	const handleAddTask = () => {
		if (newTask.trim() !== "") {
			setTasks([...tasks, newTask]);
			setNewTask("");
		}
	};

	const handleDeleteTask = (index) => {
		const updatedTasks = tasks.filter((_, i) => i !== index);
		setTasks(updatedTasks);
	};
	return (
		<div className="container">
			<h1>Todo List</h1>
			<div className="input-container">
				<input
					type="text"
					value={newTask}
					onChange={handleTaskChange}
					placeholder="Enter a task"
				/>
				<button onClick={handleAddTask}>Add Task</button>
			</div>

			<ul className="task-list">
				{tasks.map((task, index) => (
					<li key={index}>
						<TodoItem task={task} onDelete={() => handleDeleteTask(index)} />
					</li>
				))}
			</ul>
		</div>
	);
}

export default TodoList;
