import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setinput] = useState("");
  const [recpromt, setrecprompt] = useState("");
  const [prevprompts, setprevprompts] = useState([]);
  const [showresult, setshowresult] = useState(false);
  const [resultData, setresultData] = useState("");
  const [Load, setLoad] = useState(false);

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setresultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoad(false);
    setshowresult(false);
  };

  const onSent = async (prompt) => {
    setresultData("");
    setLoad(true);
    setshowresult(true);
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setrecprompt(prompt);
    } else {
      setrecprompt(input);
      setprevprompts((prev) => [...prev, input]);
      response = await run(input);
    }

    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i == 0 || i % 2 != 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newRes = newResponse2.split(" ");
    for (let i = 0; i < newRes.length; i++) {
      const nextWord = newRes[i];
      delayPara(i, nextWord + " ");
    }
    setLoad(false);
    setinput("");
  };

  const contextValue = {
    onSent,
    input,
    setinput,
    recpromt,
    setrecprompt,
    prevprompts,
    setprevprompts,
    showresult,
    setshowresult,
    resultData,
    setresultData,
    Load,
    setLoad,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
