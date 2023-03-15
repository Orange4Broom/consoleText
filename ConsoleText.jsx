import React, { useEffect, useRef } from "react";
import "./consoleText.css";

function ConsoleText({ wordsToWrite, colors }) {
  const colorsRef = useRef(colors || ["#fff"]);
  const visibleRef = useRef(true);
  const letterCountRef = useRef(1);
  const xRef = useRef(1);
  const waitingRef = useRef(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const con = document.getElementById("console");
    const words = [...wordsToWrite];
    const id = "text";

    targetRef.current = document.getElementById(id);
    targetRef.current.setAttribute("style", "color:" + colorsRef.current[0]);

    const intervalId = window.setInterval(function () {
      if (letterCountRef.current === 0 && waitingRef.current === false) {
        waitingRef.current = true;
        targetRef.current.innerHTML = words[0].substring(
          0,
          letterCountRef.current
        );
        window.setTimeout(function () {
          var usedColor = colorsRef.current.shift();
          colorsRef.current.push(usedColor);
          var usedWord = words.shift();
          words.push(usedWord);
          xRef.current = 1;
          targetRef.current.setAttribute(
            "style",
            "color:" + colorsRef.current[0]
          );
          letterCountRef.current += xRef.current;
          waitingRef.current = false;
        }, 1000);
      } else if (
        letterCountRef.current === words[0].length + 1 &&
        waitingRef.current === false
      ) {
        waitingRef.current = true;
        window.setTimeout(function () {
          xRef.current = -1;
          letterCountRef.current += xRef.current;
          waitingRef.current = false;
        }, 1000);
      } else if (waitingRef.current === false) {
        targetRef.current.innerHTML = words[0].substring(
          0,
          letterCountRef.current
        );
        letterCountRef.current += xRef.current;
      }
    }, 120);

    const intervalId2 = window.setInterval(function () {
      if (visibleRef.current === true) {
        con.className = "console-underscore hidden";
        visibleRef.current = false;
      } else {
        con.className = "console-underscore";
        visibleRef.current = true;
      }
    }, 400);

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalId2);
    };
  }, []);

  return (
    <div className="console-container">
      <span id="text"></span>
      <div className="console-underscore" id="console">
        &#95;
      </div>
    </div>
  );
}

export default ConsoleText;
