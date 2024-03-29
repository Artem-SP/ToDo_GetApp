import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { removeToDoActionCreator } from "../store/toDoReduser";
import { changeToDoActionCreator } from "../store/toDoReduser";
import { setDoneToDoActionCreator } from "../store/toDoReduser";
import { Modal } from "./Modal.jsx";
import { Timer } from "./Timer.jsx";

import edit from "../img/edit.png";
import del from "../img/delete.png";
import "./ToDoList.css";

export const ToDoList = () => {
  const [title, setTitle] = useState("");
  const [modal, setModal] = useState(false);
  const [toEditeID, setToEditeID] = useState("");

  const toDo = useSelector((state) => state.toDo.toDo);
  const dispatch = useDispatch();

  // add toDo, sange toDo title, mark toDo done dispatchers
  const removeToDo = (toDo) => {
    dispatch(removeToDoActionCreator(toDo.id));
  };

  const changeToDo = () => {
    const cangeData = {
      toEditeID: toEditeID,
      title: title,
    };
    dispatch(changeToDoActionCreator(cangeData));
    setModal(false);
    setTitle("");
    setToEditeID("");
  };

  const setDoneToDo = (id) => {
    dispatch(setDoneToDoActionCreator(id));
  };

  // toDo elements construct
  let toDoList = toDo.map((toDo) => {
    return (
      <tr key={toDo.id + "row"}>
        <td className="col1" key={toDo.id + "col1"}>
          <input
            type="checkbox"
            checked={toDo.done}
            id={toDo.id}
            onChange={() => {
              setDoneToDo(toDo.id);
            }}
          />
        </td>
        <td key={`${toDo.id} + ${toDo.title}`} className="col2">
          {toDo.title}
        </td>
        <td key={`${toDo.id} + ${toDo.expire}`} className="col3">
          {toDo.expire}
        </td>
        <td className="col4" key={toDo.id + "col4"}>
          <Timer {...toDo} />
        </td>
        <td className="col5" key={toDo.id + "col5"}>
          <img
            className="icon"
            alt="edit"
            src={edit}
            onClick={() => {
              setToEditeID(parseInt(toDo.id, 10));
              setModal(true);
            }}
          />

          <img
            className="icon"
            alt="delete"
            src={del}
            onClick={() => removeToDo(toDo)}
          />
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className='todoList__body'>
        <table>
          <thead>
            <tr>
              <th>Done</th>
              <th>ToDo title</th>
              <th>Expire date</th>
              <th>Time to finish</th>
              <th>Edit/delite</th>
            </tr>
          </thead>
          <tbody>{toDoList}</tbody>
        </table>
      </div>

      <Modal
        title={"Modal 1 title"}
        isOpened={modal}
        onModalClose={() => setModal(false)}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button onClick={() => changeToDo(toDo)}>Change ToDo</button>
      </Modal>
    </>
  );
};
