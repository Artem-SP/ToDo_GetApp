import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AddToDo } from "./components/AddToDo.jsx";
import { ToDoList } from "./components/ToDoList";
import "./App.css";

function App() {
  const toDo = useSelector((state) => state.toDo.toDo);


  return (
    <div className="App">
      <AddToDo />

      <div>
        {toDo.length > 0 ? (
          <ToDoList />
        ) : (
          <div style={{ color: "red", marginTop: 20 }}>Nothing to do (</div>
        )}
      </div>
    </div>
  );
}

export default App;
