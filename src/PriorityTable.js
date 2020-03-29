import React, {useState} from 'react';


import "./BalanceTable.css";



const PriorityTable = ({priorityTable, handlePriorityChange, addNewRow}) => {
    // const [balanceTable, setBalanceRow] = useState(_default)
    
    // const handleBalanceChange = event => {
    //     const _temp = [...balanceTable]
    //     _temp[event.target.dataset.id][event.target.name] = event.target.value;
    //     setBalanceRow(_temp)
    // }

    // const addNewRow = () => {
    //     setBalanceRow(prevRows => [...prevRows, {name: "", amount: 0}])
    // }
    return (
        <div className="table">
          <div className="table-title">Priority Table</div>
          <div className="table-content">
            <div className="table-header">
              <div className="table-row">
                <div className="table-data">
                  <div>Source</div>
                </div>
                <div className="table-data">
                  <div>Target</div>
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
                      name="source"
                      data-id={index}
                      type="text"
                      value={item.source}
                      onChange={handlePriorityChange}
                    />
                  </div>
                  <div className="table-data">
                    <input
                      name="target"
                      data-id={index}
                      type="text"
                      value={item.target}
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