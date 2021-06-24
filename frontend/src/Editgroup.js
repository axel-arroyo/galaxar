import React, { useState,useEffect } from "react";
import axios from "axios";
import {Form,Alert,Button} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


function EditGroup(props) {
  const [estado, setEstado] = useState("");

  const [user, setUser] = useState([]);
  const [group, setGroup] = useState([]);

  const [userList, setUserList] = useState([{id: 0, name: "Selecione un Usuario"}]);
  const [groupList, setGroupsList] = useState([{id: 1, name: "Selecione un Grupo"}]);

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

  function MapGroups({items}){
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
    console.log("nombre");
    console.log(user);
    console.log(group);
    axios
      .post("http://localhost:8000/group/add", {
        email: user,
        name: group 
      })
      .then((data) => {
        setEstado("Usuario Agregado");
        console.log(data);
      })
      .catch((error) => {
        setEstado("Error al agregar el usuario");
      });
  };

  //Obtenemos todos los grupos y usuarios

  useEffect(() => {
    //grupos
    axios.get("http://localhost:8000/group/", {
            headers: {
                'auth-token': localStorage.getItem('token'),
        },
              
        })
        .then(res => {
          const data = res.data;
          Array.prototype.push.apply(groupList,data); 
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
                value={group}
                onChange={(e) => {
                const selectedType = e.target.value;
                setGroup(selectedType);
                }}  
            >


                {<MapGroups items={groupList}/>}
                
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

export default EditGroup;