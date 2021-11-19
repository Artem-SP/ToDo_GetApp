import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { removeToDoAction } from "../store/toDoReduser";
import { changeToDoAction } from "../store/toDoReduser";
import { setDoneToDoAction } from "../store/toDoReduser";
import { Modal } from "./Modal.jsx";
import edit from "../img/edit.png";
import del from "../img/delete.png";
import "./ToDoList.css";

export const ToDoList = () => {
  const [title, setTitle] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [toEditeID, setToEditeID] = useState("");
  const [done, setDone] = useState(false);
  
  const toDo = useSelector((state) => state.toDo.toDo);
  const dispatch = useDispatch();

  console.log(toEditeID);

  console.log(title);
  console.log(toDo);

  const removeToDo = (toDo) => {
    dispatch(removeToDoAction(toDo.id));
  };

  const changeToDo = (toDo) => {
    const cangeData = {
      toEditeID: toEditeID,
      title: title
    };
    dispatch(changeToDoAction(cangeData));
    setModalActive(false);
    setTitle("");
  };

  const setDoneToDo = (toDo) => {
    console.log(toDo)
    console.log(toEditeID)
    dispatch(setDoneToDoAction(toEditeID))
  };

  let toDoList = toDo.map((toDo) => {
    return (
      <tr>
      <td className="col1">

      <input type="checkbox" id='toDo' onChange={
        ()=>{setToEditeID(toDo.id)
        setDoneToDo()}} />

      </td>
        <td key='`${toDo.id} + ${toDo.title}`' className="col2">
          {toDo.title}
        </td>
        <td key='`${toDo.id} + ${toDo.expire}`' className="col3">
          {toDo.expire}
        </td>
        <td className="col4">
          <img
            className="icon"
            alt="edit"
            src={edit}
            onClick={
              () => {
                setToEditeID(parseInt(toDo.id, 10));
              setModalActive(true);
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
       {toDoList}
      <Modal active={modalActive} setActive={setModalActive}>
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
