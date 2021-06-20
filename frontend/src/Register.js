import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Login(props) {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");



  const [estado, setEstado] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleType = (e) => {
    setType(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/register", {
        name: name,
        email: email,
        password: pass,
        type: type,
      })
      .then((data) => {
        setEstado("Usuario registrado");
        //history.push("/home");
      })
      .catch((error) => {
        setEstado("El correo ya está en uso");
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
          <div class="form-group">
            <input
              type="text"
              name="email"
              onChange={handleEmail}
              placeholder="Enter email"
              required
            ></input>
          </div>
          <div class="form-group">
            <input
              type="password"
              name="pass"
              onChange={handlePass}
              placeholder="Enter password"
              required
            ></input>
          </div>
          <div class="form-group">
            <input
              type="text"
              name="Tipo"
              onChange={handleType}
              placeholder="Enter tipo"
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