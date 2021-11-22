import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export function Timer(expire) {
  const toDo = useSelector((state) => state.toDo.toDo);
  const [days, setTimmerDays] = useState(0);
  const [hours, setTimmerHours] = useState(0);
  const [minutes, setTimmerMinutes] = useState(0);
  const [seconds, setTimmerSeconds] = useState(0);

  const expireStr = expire.expire;

  // timer engine
  const countExpire = () =>
    setInterval(() => {
      let leftMS = Date.parse(expireStr) - Date.now();
      const days = Math.floor(leftMS / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (leftMS % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((leftMS % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((leftMS % (60 * 1000)) / 1000);

      setTimmerDays(days);
      setTimmerHours(hours);
      setTimmerMinutes(minutes);
      setTimmerSeconds(seconds);
    }, 1000);

  useEffect(() => {
    countExpire();
  }, [toDo]);

  return <span>{`${days} d : ${hours} h : ${minutes} m : ${seconds} s`}</span>;
}
