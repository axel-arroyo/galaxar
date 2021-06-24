import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {Form,Alert,Button} from "react-bootstrap";

function CreateRol(props) {
  const [name, setName] = useState("");




  const [estado, setEstado] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleName = (e) => {
    setName(e.target.value);
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.
    post("http://localhost:8000/role/create", {
      name: name,
    })
    .then((data) => {
      setEstado("Grupo registrado");
    })
    .catch((error) => {
      setEstado("El nombre del grupo ya está en uso");
    });
  };

  return (
    <div id="login-box">
      <div class="left">
        <h1>Crear Rol</h1>
        <form onSubmit={handleSubmit}>
          {estado !== "" && (
            <Alert variant={estado === "Grupo registrado" ? "success" : "danger"}>
              {estado}
            </Alert>
          )}
          <div class="form-group">
            <input
              type="text"
              name="name"
              onChange={handleName}
              placeholder="Enter name"
              required
            ></input>
          </div>
          <input type="submit" name="login_submit" value="Crear" />
        </form>
        
      </div>
    </div>
  );
}

export default CreateRol;