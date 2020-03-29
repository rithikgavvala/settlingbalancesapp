import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import BalanceTable from './BalanceTable';
import PriorityTable from './PriorityTable'


function App() {
  const _default = []

  const [balanceTable, setBalanceRow] = useState(_default)
    
  const handleBalanceChange = event => {
      const _temp = [...balanceTable]
      _temp[event.target.dataset.id][event.target.name] = event.target.value;
      setBalanceRow(_temp)
  }

  const addNewBalanceRow = () => {
      setBalanceRow(prevRows => [...prevRows, {name: "", amount: 0}])
  }

  const [priorityTable, setPriorityRow] = useState(_default)
    
  const handlePriorityRow = event => {
      const _temp = [...priorityTable]
      _temp[event.target.dataset.id][event.target.name] = event.target.value;
      setPriorityRow(_temp)
  }

  const addNewPriorityRow = () => {
      setPriorityRow(prevRows => [...prevRows, {source: "", target:  "", amount: 0}])
  }






  const balanceArr = [
    {
      name: "John",
      amount: -700
    },
    {
      name: "Peter",
      amount: 500
    },
    {
      name: "Russell",
      amount: -200
    },
    {
      name: "Smith",
      amount:700 
    },
    {
      name: "Adam",
      amount: -300
    }
  ]


  const priorityArr = [
    {
      source: "John",
      target: "Peter",
      amount: 200
    },
    {
      source: "John",
      target: "Peter",
      amount: 300
    }
  ]
  const outputArr = []
  const negArr = []
  const posArr = []

  let posAmt = 0
  let negAmt = 0
  let totalTrans = 0 

  const [isPriortyError, setPriorityErr] = useState(false)

  const prioritizeBalances = (priorityArr, balanceArr ) => {
    let isError = false

    for(var i = 0 ; priorityArr.length; i++){
      const values = Object.values(balanceArr)
      let srcIndex = 0
      let tarIndex = 0
      let isSrcFound = false;
      let isTarFound = false;
      const tempArr = balanceArr
      for (const val of values){
        if (val == priorityArr[i].source){
          isSrcFound = true;
          break;
        }
        srcIndex++;
      }
      for (const val of values){
        if (val == priorityArr[i].target){
          isTarFound = true;
          break;
        }
        tarIndex++;
      }
      if(!isSrcFound || !isTarFound){
        break;
      }
      if(Math.abs(tempArr[srcIndex].amount) > priorityArr[i].amount && tempArr[tarIndex] > 0 && tempArr[tarIndex].amount > priorityArr[i].amount){
        tempArr[srcIndex].amount += priorityArr[i].amount
        tempArr[tarIndex].amount -= priorityArr[i].amount
      }else{
        isError = true; 
      }
      if(isError){
        return -1
      }else{
        return tempArr
      }
     
      

    }
  }

  const settleBalances = (priorityArr, balanceArr) => {
      const newBalanceArr = prioritizeBalances(priorityArr, balanceArr)

      if (newBalanceArr != -1){
         //split into two arrays neg and pos
          for(var i = 0; i < balanceArr.length; i++){
            if(balanceArr[i].amount < 0){
              negArr.push(
                {
                  name: balanceArr[i].name,
                  amount: balanceArr[i].amount
                }
              )
              negAmt += balanceArr[i].amount
            }else{
              posArr.push({
                name: balanceArr[i].name,
                amount: balanceArr[i].amount
              }
              )
              posAmt += balanceArr[i].amount
            }
            totalTrans++
          }
          

          //distribute money
          for(var i = 0; i < posArr.length; i++){
            for(var j = 0; j < negArr.length; j++){
              if(posArr[i].amount < Math.abs(negArr[j].amount)){
                outputArr.push({
                  source: posArr[i].name,
                  target: negArr[j].name,
                  amount: posArr[i].amount
                })
                negArr[j].amount = negArr[j].amount + posArr[i].amount
                break
              }else if (posArr[i].amount == Math.abs(negArr[j].count)){
                outputArr.push({
                  source: posArr[i].name,
                  target: negArr[j].name,
                  amount: posArr[i].amount

                })
                posArr[i].amount = 0 
                negArr[j].amount = 0
                break
              }else{
                outputArr.push({
                  source: posArr[i].name,
                  target: negArr[j].name,
                  amount: Math.abs(negArr[j].amount)
                })
                posArr[i].amount = posArr[i].amount + negArr[j].amount
                negArr[j] = 0
              }
            }
          }

      }else{
        setPriorityErr(true)
      }

     
      console.log(outputArr)
      return outputArr
    }


  


    return (
      <div className="App">
        <div className="App-body">
          <div className="App-header">
            Balance Settler
          </div>
  
          <div className= "App-table">
            <div className="table-1">
              <table>
                <thead>
                  <tr>
                    <th>
                      Name
                    </th>
                    <th>
                      Amount
                    </th>
                  </tr>  
                </thead>
                <tbody>
                  {console.log("TEST" + balanceArr)}
                  {console.log("ANOTHER TES" + priorityArr)}
                  {balanceTable.map((row) => (
                    <tr> <td>{row.name}</td><td>{row.amount}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="table-2">
              <table>
                <thead>
                  <tr>
                    <th>
                      Source
                    </th>
                    <th>
                      Target
                    </th>
                    <th>
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {priorityTable.map((row) => (
                    <tr><td>{row.source}</td><td>{row.target}</td> <td>
                    {row.amount}
                  </td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
  
          </div>
  
          <div className="App-output">
            {outputArr.map((value) =>(
              <div> {value} </div>
            ))}
          </div>
          <div className="App-table">
            <div className="table-1">
              <div>
                <BalanceTable balanceTable={balanceTable} handleBalanceChange={handleBalanceChange} addNewRow={addNewBalanceRow}  />
              </div>

            </div>
            <div className="table-2">
              <PriorityTable priorityTable={priorityTable} handlePriorityChange={handlePriorityRow} addNewRow={addNewPriorityRow} />
            </div>
          </div>

          
          <button onClick={() => settleBalances(priorityTable, balanceTable)}>
            Settle

          </button>
  
  
  
  
        </div>
        
  
      </div>
    );
  }
export default App;
