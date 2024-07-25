import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [fn, setFn] = useState(0);
  const [sn, setSn] = useState(0);
  const [users, setUsers] = useState([]);
  async function getData(url) {
    try {
      const response = await fetch(url);
      let data = [];
      if (response.status == 200) {
        data = await response.json();
      }

      return data;
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData("https://jsonplaceholder.typicode.com/photos")
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  function fnValue(event) {
    setFn(event.target.value);
  }
  function snValue(event) {
    setSn(event.target.value);
  }
  return (
    <>
      <input
        onChange={fnValue}
        className="firstNumber"
        placeholder="from"
        type="number"
      />
      <input
        onChange={snValue}
        className="SecondNumber"
        placeholder="to"
        type="number"
      />
      <div className="container">
        {users.length > 0 &&
          users.map((user, index) => {
            if (fn != 0) {
              if (fn >= user.id) {
                return (
                  <div key={index} id={user.id} className="card">
                    <img width={400} height={400} src={user.url} alt="" />
                    <h2 className="title">{user.title}</h2>
                    <h3 className="thumbnailUrl">{user.thumbnailUrl}</h3>
                  </div>
                );
              }
            } else {
              return (
                <div key={index} id={user.id} className="card">
                  <img width={400} height={400} src={user.url} alt="" />
                  <h2 className="title">{user.title}</h2>
                  <h3 className="thumbnailUrl">{user.thumbnailUrl}</h3>
                </div>
              );
            }
            if (sn != 0) {
              if (sn <= user.id && fn >= user.id) {
                return (
                  <div key={index} id={user.id} className="card">
                    <img width={400} height={400} src={user.url} alt="" />
                    <h2 className="title">{user.title}</h2>
                    <h3 className="thumbnailUrl">{user.thumbnailUrl}</h3>
                  </div>
                );
              }
            } else {
              return (
                <div key={index} id={user.id} className="card">
                  <img width={400} height={400} src={user.url} alt="" />
                  <h2 className="title">{user.title}</h2>
                  <h3 className="thumbnailUrl">{user.thumbnailUrl}</h3>
                </div>
              );
            }
          })}
      </div>
    </>
  );
}

export default App;
