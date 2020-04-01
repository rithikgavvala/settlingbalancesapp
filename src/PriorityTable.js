import React, {useState} from 'react';


import "./BalanceTable.css";



const PriorityTable = ({priorityTable, handlePriorityChange, addNewRow}) => {

    return (
        <div className="table">
          <div className="table-title">Priority Table</div>
          <div className="table-content">
            <div className="table-header">
              <div className="table-row">
                <div className="table-data">
                  <div>From</div>
                </div>
                <div className="table-data">
                  <div>To</div>
                </div>
                <div className="table-data">
                  <div>Amount</div>
                </div>
              </div>
            </div>
            <div className="table-body">
              {priorityTable.map((item, index) => (
                <div className="table-row" key={index}>
                  <div className="table-data">
                    <input
                      name="from"
                      data-id={index}
                      type="text"
                      value={item.from}
                      onChange={handlePriorityChange}
                    />
                  </div>
                  <div className="table-data">
                    <input
                      name="to"
                      data-id={index}
                      type="text"
                      value={item.to}
                      onChange={handlePriorityChange}
                    />
                  </div>
                  <div className="table-data">
                    <input
                      name="amount"
                      data-id={index}
                      type="number"
                      value={item.amount}
                      onChange={handlePriorityChange}
                    />
                  </div>
                </div>
              ))}
              <div className="table-row">
                <div className="table-data">
                  <button onClick={addNewRow}>+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );


}

export default PriorityTable