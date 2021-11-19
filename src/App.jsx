import React, { useEffect } from "react";
import { useSelector} from "react-redux";
import { AddToDo } from "./components/AddToDo.jsx";
import { ToDoList } from "./components/ToDoList";
import "./App.css";

function App() {
  const toDo = useSelector((state) => state.toDo.toDo);

  useEffect(() => {

      let localStorageData = JSON.parse(localStorage.getItem("toDo"));
    }, [null]);

  useEffect(() => {
    localStorage.setItem("toDo", JSON.stringify(toDo));
  }, [toDo]);

  return (
    <div className="App">
      <AddToDo />

      <div>
        {toDo.length > 0 ? (
          <div>
            <table>
              <tr>
                <th>Done</th>
                <th>ToDo title</th>
                <th>Expire date</th>
                <th>Edit/delite</th>

              </tr>
              
                <ToDoList />
              
            </table>

         </div>
        ) : (
          <div style={{ color: "red", marginTop: 20 }}>Nothing to do (</div>
        )}
      </div>
    </div>
  );
}

export default App;
