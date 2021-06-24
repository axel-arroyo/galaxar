import React, { useState,useEffect } from "react";
import axios from "axios";
import {Form,Alert,Button} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


function EditRol(props) {
  const [estado, setEstado] = useState("");

  const [user, setUser] = useState([]);
  const [role, setRole] = useState([]);

  const [userList, setUserList] = useState([{id: 0, name: "Selecione un Usuario"}]);
  const [roleList, setRoleList] = useState([{id: 1, name: "Selecione un Rol"}]);

  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();


  function MapUsers({items}){
    return(
    <>
      {items.map((e, key) => {
        return <option key={key} value={e.email}>{e.name}</option>;
        })}
    </>
    )
  };

  function MapRoles({items}){
    return(
    <>
      {items.map((e, key) => {
        return <option key={key} value={e.name}>{e.name}</option>;
        })}
    </>
    )
  };


  //Agregamos un usuario a un grupo
  const AddUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/role/assign", {
        email: user,
        role: role 
      })
      .then((data) => {
        setEstado("Usuario Agregado");
      })
      .catch((error) => {
        setEstado("Error al agregar el usuario");
      });
  };

  //Obtenemos todos los grupos y usuarios

  useEffect(() => {
    //Roles
    axios.get("http://localhost:8000/role/", {
            headers: {
                'auth-token': localStorage.getItem('token'),
        },
              
        })
        .then(res => {
          const data = res.data;
          Array.prototype.push.apply(roleList,data); 
        })
          .catch((err) => {
            console.log(err);
        });
    //usuarios
    axios.get("http://localhost:8000/user/", {
            headers: {
                'auth-token': localStorage.getItem('token'),
        },
              
        })
        .then(res => {
          const data = res.data;
          Array.prototype.push.apply(userList,data);
          setLoading(false);  
        })
          .catch((err) => {
            console.log(err);
        });

    
    }
    , []);
  

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div id="login-box">
      <div class="left">
        <h1>Editar grupo</h1>

        <form onSubmit={AddUser}>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Usuario a agregar</Form.Label>
            <select
                
                className="custom-select"
                value={user}
                onChange={(e) => {
                const selectedType = e.target.value;
                setUser(selectedType);
                }}  
            > 
                {<MapUsers items={userList}/>}
                
            </select>
            <Form.Label>Grupo a editar </Form.Label>
            <select
                
                className="custom-select"
                value={role}
                onChange={(e) => {
                const selectedType = e.target.value;
                setRole(selectedType);
                }}  
            >


                {<MapRoles items={roleList}/>}
                
            </select>

                  
            </Form.Group>
        
            <input type="submit" name="login_submit" value="Agregar Usuario" />
                
        {estado !== "" && (
            <Alert variant={estado === "Usuario Agregado" ? "success" : "danger"}>
              {estado}
            </Alert>
          )}
        </form>

      </div>
    </div>
  );
}

export default EditRol;