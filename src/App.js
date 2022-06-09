import { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [first, setFirst] = useState("USD");
  const [second, setSecond] = useState("INR");
  const [rate, setRate] = useState([]);

  const getRate = async (first, second) => {
    axios({
      method: "GET",
      url: `https://free.currconv.com/api/v7/convert?q=${first}_${second}&compact=ultra&apiKey=5a49beefa5e7696bc287`
    })
      .then((response) => {
        setRate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Refresh Prevented");
  };

  return (
    <div className="App">
      <div className="Main">
        <div className="Header">
          <h1>Currency Convertor</h1>
        </div>
        <div className="Rate">
          1 {first} = {rate[`${first}_${second}`]} {second}
        </div>
        <div>
          <form className="Form" onSubmit={onSubmit}>
            <div className="Inner">
              <input
                type="text"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
              />
              <br />
              <input
                type="text"
                value={second}
                onChange={(e) => setSecond(e.target.value)}
              />
              <br />
              <button
                onClick={() => {
                  getRate(first, second);
                }}
              >
                Convert
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
