import React, { useState, useEffect } from "react";

const QueryComp = ({ data, header }) => {
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
      data.map((dItem) => {
        if (eval(`dItem.${firstItemName} ${operator} ${secondItemName}`)) {
          console.log(dItem);
          temp.push(dItem);
        }
      });
    }
    setFilteredData(temp);
  };

  return (
    <>
      <h2>Enter query here</h2>
      <div>QueryComp</div>
      Select * from Product where{" "}
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
      <div>
        {filteredData.length > 0 ? (
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
          </>
        ) : null}
      </div>
    </>
  );
};

export default QueryComp;
