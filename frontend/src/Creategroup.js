import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Login(props) {
  const [name, setName] = useState("");




  const [estado, setEstado] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/group/", {
        name: name,
      })
      .then((data) => {
        setEstado("Grupo registrado");
        //history.push("/home");
      })
      .catch((error) => {
        setEstado("El nombre del grupo ya está en uso");
      });
  };

  return (
    <div id="login-box">
      <div class="left">
        <h1>Registro</h1>
        <form onSubmit={handleSubmit}>
          {estado !== "" && (
            <Alert variant={estado === "OK" ? "success" : "danger"}>
              {estado}
            </Alert>
          )}
          <div class="form-group">
            <input
              type="text"
              name="nombre"
              onChange={handleName}
              placeholder="Enter nombre"
              required
            ></input>
          </div>
          <div class="form-group"></div>
          <input type="submit" name="login_submit" value="Ingresar" />
        </form>
      </div>

      <div class="right">
        <span class="loginwith"></span>
      </div>
    </div>
  );
}

export default Login;