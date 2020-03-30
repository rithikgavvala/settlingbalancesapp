import React, {useState} from 'react';


import "./BalanceTable.css";



const BalanceTable = ({balanceTable, handleBalanceChange, addNewRow}) => {
    return (
        <div className="table">
          <div className="table-title">Balance</div>
          <div className="table-content">
            <div className="table-header">
              <div className="table-row">
                <div className="table-data">
                  <div>Name</div>
                </div>
                <div className="table-data">
                  <div>Amount</div>
                </div>
              </div>
            </div>
            <div className="table-body">
              {balanceTable.map((item, index) => (
                <div className="table-row" key={index}>
                  <div className="table-data">
                    <input
                      name="name"
                      data-id={index}
                      type="text"
                      value={item.name}
                      onChange={handleBalanceChange}
                    />
                  </div>
                  <div className="table-data">
                    <input
                      name="amount"
                      data-id={index}
                      type="number"
                      value={item.amount}
                      onChange={handleBalanceChange}
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

export default BalanceTable