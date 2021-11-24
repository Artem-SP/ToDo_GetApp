import { useState, useEffect } from "react";
import { Modal } from "./Modal.jsx";

export function Timer(toDo) {
  const [days, setTimmerDays] = useState(0);
  const [hours, setTimmerHours] = useState(0);
  const [minutes, setTimmerMinutes] = useState(0);
  const [seconds, setTimmerSeconds] = useState(0);
  const [timeExpire, setTimeExpire] = useState(false);
  const [output, setOutput] = useState("");
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("title");

  // timer engine
  const countExpire = () =>
    setInterval(() => {
      let leftMS = Date.parse(toDo.expire) - Date.now();
      const days = Math.floor(leftMS / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (leftMS % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((leftMS % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((leftMS % (60 * 1000)) / 1000);
      // console.log(toDo[0].id);
      setTimmerDays(days);
      setTimmerHours(hours);
      setTimmerMinutes(minutes);
      setTimmerSeconds(seconds);

      if (Date.parse(toDo.expire) - Date.now() < 0) {
        setTimeExpire(true);
        setOutput("Finished on time expire");
      } else if (toDo.done === true) {
        setOutput("Complited before deadline");
      } else {
        setOutput(`${days} d : ${hours} h : ${minutes} m : ${seconds} s`);
      }
    }, 1000);

  useEffect(() => {
    if (timeExpire && !toDo.done) {
      setModal(true);
      setModalTitle(`${toDo.title} finsed on time expire`);
    } else if (timeExpire && toDo.done) {
      setModal(true);
      setModalTitle(`${toDo.title} Complited before deadline`);
    }
  }, [timeExpire]);

  useEffect(() => {
    countExpire();
  }, [toDo]);

  return (
    <div>
      {output}

      <Modal
        title={modalTitle}
        style={{}}
        isOpened={modal}
        onModalClose={() => setModal(false)}
      ></Modal>
    </div>
  );
}
