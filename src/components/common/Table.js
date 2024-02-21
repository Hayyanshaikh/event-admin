import React from "react";

const Table = ({ header, body }) => {
  return (
    <div className="table_responsive">
      <table className="table">
        <thead>
          <tr>
            {header.map((headerText, key) => (
              <th key={key}>{headerText}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map(function (rowData, rowIndex) {
            return (
              <tr key={rowIndex}>
                {
                  Object.entries(rowData).map(function ([key, value], elem) {
                    return (
                      <td key={elem}>
                        {rowData["image"] && key === "image" ? (
                          <div className="flex">
                            <img src={value} alt={`image ${elem}`} />
                            {rowData["title"]}
                          </div>
                        ) : (
                          key === "title" ? null : value
                        )}
                      </td>
                    );
                  })
                }
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
