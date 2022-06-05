import React, { useState, useEffect } from "react";

import { PRODUCT } from "../data/product";
import QueryComp from "./QueryComp";

const AllData = () => {
  const [csvArray, setCsvArray] = useState([]);
  const [header, setHeader] = useState([]);

  const processCSV = (str, delim = ",") => {
    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    setHeader(headers);
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

  useEffect(() => {
    processCSV(PRODUCT);
  }, []);

  console.log(csvArray);

  return (
    <>
      <QueryComp data={csvArray} header={header} />
      <h2>Product Data</h2>
      <div>
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
      </div>
    </>
  );
};

export default AllData;
