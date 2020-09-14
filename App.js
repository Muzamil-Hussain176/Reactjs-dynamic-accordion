import React, { useState } from 'react'
import { Navbar, Table } from 'react-bootstrap'
import * as XLSX from 'xlsx'
import Accordion from './component/accordion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './App.css'

function App() {
  const[items, setItems] = useState([])
  const readExcel=(file) => {
    const promise = new Promise((resolve, reject)=>{
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload=(e)=>{
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, {type: "buffer"});
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror=(error) => {
        reject(error);
      };
    });
    promise.then((d)=>{
      setItems(d);
      console.log(d)
    });
  };

  return(
    <div className="container-fluid">
      <section className="heading">
        <h4>Products Details</h4>
        <input type="file" className="input-field" name="Upload File" onChange={(e) =>{
          const file=e.target.files[0];
          readExcel(file);
        }} />
      </section>
      {items.map((d) => (
        <Accordion 
          title={
            <tr key={d.ID} className="btn-heading">
              <td style={{padding: "0px 36px"}}>{d.ID}</td>
              <td style={{padding: "0px 16px"}}>{d.Mail}</td>
              <td style={{padding: "0px 67px"}}>{d.Name}</td>
              <td style={{padding: "0px 3px"}}>{d.PhoneNo}</td>
              <td style={{padding: "0px 98px"}}>{d.City}</td>
              <td style={{padding: "0px 6px"}}>{d.Date}</td>
              <td style={{padding: "0px 120px"}}>{d.Time}</td>
            </tr>
          }
          content={
            <div>
              <p className="header">
                  <span className="header-content">Shipping Address:</span>
                  292 Naqshband Colony. Near rabbania Mosque. Multan
              </p>
              <Table size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th style={{width:"15%",textAlign:"center"}}>Article No</th>
                    <th style={{width:"30%"}}>Product Name</th>
                    <th style={{width:"20%" ,textAlign:"center"}}>Quantity</th>
                    <th style={{width:"15%" ,textAlign:"center"}}>Price</th>
                    <th style={{width:"15%" ,textAlign:"center"}}>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((d) => (
                    <tr key={d.ArticleNo}>
                      <colgroup>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </colgroup>
                      <td>{d.ArticleNo}</td>
                      <td style={{textAlign:"left"}}>{d.ProductName}</td>
                      <td>{d.Quantity}</td>
                      <td>{d.Price}</td>
                      <td>{d.TotalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          }
        />
      ))}
    </div>
  );
}
export default App;
