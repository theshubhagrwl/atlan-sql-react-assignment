import React, { useState, useEffect } from "react";

import { PRODUCT } from "../data/product";
import { ORDERS } from "../data/order";
import QueryComp from "./QueryComp";

const AllData = () => {
  const [csvArray, setCsvArray] = useState([]);
  const [header, setHeader] = useState([]);
  const [dataSet, setDataSet] = useState("product");

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
    if (dataSet === "product") {
      processCSV(PRODUCT);
    }
    if (dataSet === "ORDERS") {
      processCSV(ORDERS);
    }
  }, [dataSet]);

  console.log(csvArray);

  return (
    <>
      <QueryComp
        data={csvArray}
        header={header}
        dataSet={dataSet}
        setDataSet={setDataSet}
      />
      <h2>{dataSet} data</h2>
      <div>
        {csvArray.length > 0 ? (
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
            ) : (
              <table>
                <thead>
                  <th>orderID</th>
                  <th>customerID</th>
                  <th>employeeID</th>
                  <th>orderDate</th>
                  <th>requiredDate</th>
                  <th>shippedDate</th>
                  <th>shipVia</th>
                  <th>freight</th>
                  <th>shipName</th>
                  <th>shipAddress</th>
                </thead>
                <tbody>
                  {csvArray.map((item, i) => (
                    <tr key={i}>
                      <td>{item.orderID}</td>
                      <td>{item.customerID}</td>
                      <td>{item.employeeID}</td>
                      <td>{item.orderDate}</td>
                      <td>{item.requiredDate}</td>
                      <td>{item.shippedDate}</td>
                      <td>{item.shipVia}</td>
                      <td>{item.freight}</td>
                      <td>{item.shipName}</td>
                      <td>{item.shipAddress}</td>
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

export default AllData;
