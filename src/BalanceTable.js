import React, {useState} from 'react';


import "./BalanceTable.css";

const _default = []

const BalanceTable = () => {
    const [balanceTable, setBalanceRow] = useState(_default)
    
    const handleBalanceChange = event => {
        const _temp = [...balanceTable]
        _temp[event.target.dataset.id][event.target.name] = event.target.value;
        setBalanceRow(_temp)
    }

    const addNewRow = () => {
        setBalanceRow(prevRows => [...prevRows, {name: "", amount: 0}])
    }
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
                      name="price"
                      data-id={index}
                      type="number"
                      value={item.price}
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