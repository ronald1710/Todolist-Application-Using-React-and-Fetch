import React from "react";
import { useState } from "react";
import { useEffect } from "react";
//create your first component
const Home = () => {
  const [addTarea, setAddTarea] = useState([]);
 
  const getTareas = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/ronaldazofeifa")
      .then((resp) => resp.json())
      .then((resp) => setAddTarea(resp));
  };
  useEffect(() => {
    getTareas();
  }, []);

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify(addTarea);
  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://assets.breatheco.de/apis/fake/todos/user/ronaldazofeifa",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))






  const listaTareas = e => {
		
		if (e.key === "Enter") {
			 setAddTarea([
				{ label: e.target.value , done: false },
				...addTarea
			]);
		  console.log(addTarea);
			e.target.value = "";
		}
	};
  console.log(addTarea);

  const removeTodo = (index) => {
    const newTodos = [...addTarea];
    newTodos.splice(index, 1);
    setAddTarea(newTodos);
  };

  return (
    <div className="container">
      <h1 className="text-center"><b>Cosas por hacer</b></h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          placeholder="Que necesitas hacer?"
          onKeyDown={listaTareas}
        />
      </div>
      <div id="lista">
        <div id="pendientes">
          <ul className="list-group">
            {addTarea.map((tarea, index) => {
              return (
                <li key={index}>
                  {tarea.label}
                  <a className="float-end" onClick={() => removeTodo(index)}>
                    <i className="bi bi-x bg-primary text-white"></i>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="text-center">
        <p>
          Tareas pendientes por hacer: <b>{addTarea.length} </b>
        </p>
      </div>
    </div>
  );
};

export default Home;
