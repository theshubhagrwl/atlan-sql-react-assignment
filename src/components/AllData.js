import React, { useState, useEffect } from "react";

import { PRODUCT } from "../data/product";
import { SUPPLIERS } from "../data/suppliers";
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
    if (dataSet === "suppliers") {
      processCSV(SUPPLIERS);
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
                  {csvArray.map((item, i) => (
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

export default AllData;
