import React, { useState } from "react";

import { PRODUCT } from "../data/product";

const AllData = () => {
  const [csvArray, setCsvArray] = useState([]);

  const processCSV = (str, delim = ",") => {
    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const newArray = rows.map((row) => {
      const values = row.split(delim);
      const eachObject = headers.reduce((prev, header, i) => {
        prev[header] = values[i];
        return prev;
      }, {});
      return eachObject;
    });

    setCsvArray(newArray);
  };
  console.log(csvArray);

  return (
    <>
      <button
        onClick={() => {
          processCSV(PRODUCT);
        }}
      >
        Process
      </button>
      {csvArray.length > 0 ? (
        <>
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
              {csvArray.map((item, i) => (
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
        </>
      ) : null}
    </>
  );
};

export default AllData;
