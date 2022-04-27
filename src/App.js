import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import * as XLSX from "xlsx";

function App() {
  const [items, setItems] = useState([]);
  
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      console.log(d);
      setItems(d);
    });
  };

const imgstyle = {width:"30vw", height: "30vh"}
const containerstyle = {width:"50vw"}

  return (
    <div>
       <nav className="bg-info p-1 text-center">
              <h3>Smart Cafeteria</h3>
        </nav>
        <div className="input-group">
        <input type="file" className="form-control " id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" 
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}/>
        </div>
    {items.map((d) => (
        <table className="table container bg-light text-center" style={containerstyle}>
          <thead>
            <tr >
              <th scope="col text-center">Month</th>
              <th scope="col text-center">Week</th>
              <th scope="col text-center">Days</th>
              <th scope="col text-center">Food menu</th>
            </tr>
          </thead>
          <tbody>
            <tr key={d.DATE}>
              <td className="text-center">{d.MONTH}</td>
              <td className="text-center">{d.WEEK}</td>
              <td className="text-center">{d.DATE}</td>
              <td>
                <img src={d.IMAGE} style={imgstyle}/>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  )
}

export default App;