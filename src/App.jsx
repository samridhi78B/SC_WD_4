import { useState } from "react";
import "./App.css";

function App() {

  const [todoList, setTodoList] = useState([]);
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const addTask = (e) => {
    e.preventDefault();

    if (task.trim() === "") {
      alert("Enter a task");
      return;
    }

    const newTask = {
      text: task,
      date: date,
      time: time,
      completed: false
    };

    setTodoList([...todoList, newTask]);

    setTask("");
    setDate("");
    setTime("");
  };

  const deleteTask = (index) => {
    const updated = todoList.filter((_, i) => i !== index);
    setTodoList(updated);
  };

  const toggleComplete = (index) => {
    const updated = [...todoList];
    updated[index].completed = !updated[index].completed;
    setTodoList(updated);
  };

  const moveUp = (index) => {
    if (index === 0) return;

    const updated = [...todoList];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setTodoList(updated);
  };

  const moveDown = (index) => {
    if (index === todoList.length - 1) return;

    const updated = [...todoList];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    setTodoList(updated);
  };

  const editTask = (index) => {
    const newText = prompt("Edit Task", todoList[index].text);

    if (newText !== null && newText.trim() !== "") {
      const updated = [...todoList];
      updated[index].text = newText;
      setTodoList(updated);
    }
  };

  return (
    <div className="App">

      <h1>My ToDo List</h1>

      <form onSubmit={addTask}>

        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button>Add</button>

      </form>

      <div className="outerDiv">

        <ul>

          {todoList.map((item, index) => (
            <li
              key={index}
              style={{
                textDecoration: item.completed ? "line-through" : "none",
                opacity: item.completed ? 0.6 : 1
              }}
            >

              <div>

                <strong>{item.text}</strong>

                <br />

                <small>
                  {item.date} {item.time}
                </small>

              </div>

              <span onClick={() => deleteTask(index)}>✖</span>

              <div style={{ marginTop: "8px" }}>

                <button onClick={() => toggleComplete(index)}>
                  {item.completed ? "Undo" : "Complete"}
                </button>

                <button onClick={() => editTask(index)}>
                  Edit
                </button>

                <button onClick={() => moveUp(index)}>
                  ↑
                </button>

                <button onClick={() => moveDown(index)}>
                  ↓
                </button>

              </div>

            </li>
          ))}

        </ul>

      </div>

    </div>
  );
}

export default App;