import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addToDoActionCreator } from "../store/toDoReduser.js";
import "./AddToDo.css";

export const AddToDo = () => {
  const [title, setTitle] = useState("");
  const [expire, setExpire] = useState("");
  const [emptyError, setEmptyError] = useState(true);
  const [disabeled, setDisabeled] = useState(true);
  const [duble, setDuble] = useState(false);
  const [dubleError, setDubleError] = useState(false);
  const [pastDateError, setPastDateError] = useState(false);

  const toDo = useSelector((state) => state.toDo.toDo);

  useEffect(() => {
    setDuble(toDo.some((it) => it.title == title));
    setDubleError(duble);
  }, [title, expire]);

  useEffect(() => {
    setDubleError(duble);
  }, [duble]);

  useEffect(() => {
    if (Date.parse(expire) - Date.now()) setPastDateError(true);
  }, [expire]);

  useEffect(() => {
    if (!title || !expire) {
      setEmptyError(true);
      setDisabeled(true);
    } else {
      setEmptyError(false);
      setDisabeled(false);
    }
  }, [title, expire]);

  useEffect(() => {
    if (!title || !expire || duble || pastDateError) {
      setEmptyError(true);
      setDisabeled(true);
    } else {
      setEmptyError(false);
      setDisabeled(false);
    }
  }, [title, expire, duble]);

  const dispatch = useDispatch();

  const addToDo = () => {
    const toDo = {
      id: Date.now(),
      title: title,
      expire: expire,
      done: false,
    };
    dispatch(addToDoActionCreator(toDo));
    setTitle("");
    setExpire("");
  };

  return (
    <div className="add">
      <div>
        <div>
          <input
            type="text"
            value={title}
            placeholder="Input ToDo title here"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="datetime-local"
            value={expire}
            onChange={(e) => {
              setExpire(e.target.value);
            }}
          />
        </div>
        <div className="warnings">
          <div>
            {emptyError && (
              <div style={{ color: "red" }}> Empty fields not allowed </div>
            )}
          </div>

          <div>
            {dubleError && (
              <div style={{ color: "red" }}> Such toDo alredy exist </div>
            )}
          </div>

          <div>
            {pastDateError && (
              <div style={{ color: "red" }}> Past date/time selected </div>
            )}
          </div>
        </div>
        <div></div>
        <button disabled={disabeled} onClick={() => addToDo()}>
          Add ToDo
        </button>
      </div>
    </div>
  );
};
