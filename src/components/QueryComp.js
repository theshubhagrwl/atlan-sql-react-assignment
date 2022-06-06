import React, { useState, useEffect } from "react";

import "../App.css";

const QueryComp = ({ data, header, dataSet, setDataSet }) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const processQuery = () => {
    let temp = [];
    let keyWords = query.split(" ");
    console.log(keyWords);
    let firstItemName = keyWords[0] ? keyWords[0] : null;
    let operator = keyWords[1] ? keyWords[1] : null;
    let secondItemName = keyWords[2] ? keyWords[2] : null;
    if (secondItemName && firstItemName) {
      if (operator === "=") {
        data.map((dItem) => {
          if (eval(`dItem.${firstItemName} == ${secondItemName}`)) {
            console.log(dItem);
            temp.push(dItem);
          }
        });
      } else {
        data.map((dItem) => {
          if (eval(`dItem.${firstItemName} ${operator} ${secondItemName}`)) {
            console.log(dItem);
            temp.push(dItem);
          }
        });
      }
    }
    setFilteredData(temp);
  };

  return (
    <>
      <h2>Enter query here</h2>
      Select * from{" "}
      <select
        name="ds"
        onChange={(e) => {
          setDataSet(e.target.value);
        }}
      >
        <option value="product">Product</option>{" "}
        <option value="suppliers">Suppliers</option>{" "}
      </select>{" "}
      Product where{" "}
      <input
        type="text"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      ></input>
      <button
        type="submit"
        onClick={() => {
          processQuery();
        }}
      >
        Submit
      </button>
      {filteredData.length > 0 ? <h3>Result:</h3> : ""}
      <div>
        {filteredData.length > 0 ? (
          <>
            {dataSet === "product" ? (
              <table>
                <thead>
                  <th>productID</th>
                  <th>productName</th>
                  <th>supplierID</th>
                  <th>categoryID</th>
                  <th>quantityPerUnit</th>
                  <th>unitPrice</th>
                  <th>unitsInStock</th>
                  <th>unitsOnOrder</th>
                  <th>reorderLevel</th>
                  <th>discontinued</th>
                </thead>
                <tbody>
                  {filteredData.map((item, i) => (
                    <tr key={i}>
                      <td>{item.productID}</td>
                      <td>{item.productName}</td>
                      <td>{item.supplierID}</td>
                      <td>{item.categoryID}</td>
                      <td>{item.quantityPerUnit}</td>
                      <td>{item.unitPrice}</td>
                      <td>{item.unitsInStock}</td>
                      <td>{item.unitsOnOrder}</td>
                      <td>{item.reorderLevel}</td>
                      <td>{item.discontinued}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table>
                <thead>
                  <th>supplierID</th>
                  <th>companyName</th>
                  <th>contactName</th>
                  <th>contactTitle</th>
                  <th>address</th>
                  <th>city</th>
                  <th>region</th>
                  <th>postalCode</th>
                  <th>country</th>
                  <th>phone</th>
                  <th>fax</th>
                  <th>homePage</th>
                </thead>
                <tbody>
                  {filteredData.map((item, i) => (
                    <tr key={i}>
                      <td>{item.supplierID}</td>
                      <td>{item.companyName}</td>
                      <td>{item.contactName}</td>
                      <td>{item.contactTitle}</td>
                      <td>{item.address}</td>
                      <td>{item.city}</td>
                      <td>{item.region}</td>
                      <td>{item.postalCode}</td>
                      <td>{item.country}</td>
                      <td>{item.phone}</td>
                      <td>{item.fax}</td>
                      <td>{item.homePage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        ) : null}
      </div>
    </>
  );
};

export default QueryComp;
