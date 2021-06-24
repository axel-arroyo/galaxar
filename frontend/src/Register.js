import React, { useState,useEffect } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Login(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("")
  const [carrera, setCarrera] = useState("");
  const [campus, setCampus] = useState("");
  const [sexo, setSexo] = useState("");
  const [ingresoU, setIngresoU] = useState("");
  const [id_rol, setRole] = useState("");
  const [id_rolList, setRoleList] = useState([{id: 0, name: "Selecione un Rol"}]);

  const [isLoading, setLoading] = useState(true);

//Vamos a traer todos los roles
useEffect(() => {
  //roles
    return axios.get("http://localhost:8000/role/", {
          headers: {
              'auth-token': localStorage.getItem('token'),
      },
            
      })
      .then(res => {
        const data = res.data;
        Array.prototype.push.apply(id_rolList,data); 
        setLoading(false);
      })
        .catch((err) => {
          console.log(err);
      });

    }, []);

function Maproles({items}){
    return(
    <>
      {items.map((e, key) => {
        return <option key={key} value={e.name}>{e.name}</option>;
        })}
    </>
    )
};


  const [estado, setEstado] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const handleCarrera = (e) => {
    setCarrera(e.target.value);
  };

  const handleCampus = (e) => {
    setCampus(e.target.value);
  };

  const handleSexo = (e) => {
    setSexo(e.target.value);
  };

  const handleIngresoU = (e) => {
    setIngresoU(e.target.value);
  };

  const handleRole = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/register", {
        name: name,
        email: email,
        password: pass,
        carrera: carrera,
        campus: campus,
        sexo: sexo,
        ingresoU: ingresoU,
        role: id_rol
      })
      .then((data) => {
        setEstado("Usuario registrado");
        //history.push("/home");
      })
      .catch((error) => {
        setEstado("El correo ya está en uso");
      });
  };

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

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
              name="pasword"
              onChange={handlePass}
              placeholder="Enter password"
              required
            ></input>
          </div>
          <div class="form-group">
            <input
              type="text"
              name="carrera"
              onChange={handleCarrera}
              placeholder="Enter carrera"
              required
            ></input>
          </div>
          <div class="form-group">
            <input
              type="text"
              name="Campus"
              onChange={handleCampus}
              placeholder="Enter campus"
              required
            ></input>
          </div>
          <div class="form-group">
            <input
              type="text"
              name="Sexo"
              onChange={handleSexo}
              placeholder="Enter sexo"
              required
            ></input>
          </div>
          <div class="form-group">
            <input
              type="text"
              name="ingresoU"
              onChange={handleIngresoU}
              placeholder="Enter ingreso u"
              required
            ></input>
          </div>
          <select
                
                className="custom-select"
                value={id_rol}
                onChange={(e) => {
                const selectedType = e.target.value;
                setRole(selectedType);
                }}  
            >
                {<Maproles items={id_rolList}/>}
                
            </select>
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