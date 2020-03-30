import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import BalanceTable from './BalanceTable';
import PriorityTable from './PriorityTable'


function App() {
  let _default = []
  let outputArr = []
  const [balanceTable, setBalanceRow] = useState(_default)
  const [outputTable, setOutputTable] = useState(outputArr)
  const [priorityTable, setPriorityRow] = useState(_default)

    
  const handleBalanceChange = event => {
      const _temp = [...balanceTable]
      _temp[event.target.dataset.id][event.target.name] = event.target.value;
      setBalanceRow(_temp)
  }

  const addNewBalanceRow = () => {
      setBalanceRow(prevRows => [...prevRows, {name: "", amount: parseInt(0)}])
  }

  const handleSettleClick = () => {
    const returnTable = settleBalances(priorityTable, balanceTable)
    console.log("RETURN " + JSON.stringify(returnTable, null, '\t')); 
    console.log("OUTPUT" + JSON.stringify(outputTable, null, '\t'));
    console.log("PROP RETURN" + typeof(returnTable) )
    console.log("PROP OUTPUT" + typeof(outputTable))
 
    setOutputTable([...returnTable]);



  
    // let tmp =   [...outputTable, (returnTable[0])];
    // console.log('Tmp: '+JSON.stringify(tmp, null, '\t'))
    console.log("UPDATE " + JSON.stringify(outputTable, null, '\t'))

  }

    
  const handlePriorityRow = event => {
      const _temp = [...priorityTable]
      _temp[event.target.dataset.id][event.target.name] = event.target.value;
      setPriorityRow(_temp)
  }

  const addNewPriorityRow = () => {
      setPriorityRow(prevRows => [...prevRows, {source: "", target:  "", amount: parseInt(0)}])
  }


  const negArr = []
  const posArr = []

  let posAmt = 0
  let negAmt = 0
  let totalTrans = 0 

  const [isPriorityError, setPriorityErr] = useState(false)

  const prioritizeBalances = (priorityTable, balanceTable ) => {
    let isError = false
    const tempArr = balanceTable
    console.log("GOING INTO PRIORITY" + priorityTable)
    
    for(var i = 0 ; i < priorityTable.length; i++){
      console.log("GOING INTO LOOP")
      let srcIndex = balanceTable.findIndex(obj => obj.name == priorityTable[i].source)
      let tarIndex = balanceTable.findIndex(obj => obj.name == priorityTable[i].target)
      console.log("SRC"  + srcIndex)
      console.log("TAR" + tarIndex)
      if(tarIndex == -1 || srcIndex == -1){
        break;
      }
      console.log("Condition1 " + (Math.abs(tempArr[srcIndex].amount) > priorityTable[i].amount) )
      console.log("Condition2 " + (tempArr[tarIndex].amount > 0))
      console.log("val1 " + tempArr[tarIndex].amount)
      console.log("val2 " + typeof(priorityTable[i].amount))
      console.log("Condition3 " + (tempArr[tarIndex].amount < priorityTable[i].amount))

      if(parseInt(Math.abs(tempArr[srcIndex].amount)) > parseInt(priorityTable[i].amount) && parseInt(tempArr[tarIndex].amount) > 0 && parseInt(tempArr[tarIndex].amount) > parseInt(priorityTable[i].amount)){
      
        tempArr[srcIndex].amount += priorityTable[i].amount
        tempArr[tarIndex].amount -= priorityTable[i].amount
      }else{
        console.log("FALSE CONDITION")
        isError = true; 
      }
    }
    if(isError){
      return -1
    }else{
      console.log("TEMP " + tempArr)

      return tempArr
    } 
  }

  const settleBalances = (priorityTable, balanceTable) => {
    console.log("PRIORITY " + priorityTable.length )
      if (priorityTable.length != 0){
        let newBalanceArr = prioritizeBalances(priorityTable, balanceTable)
        console.log("test" + newBalanceArr)
        if (newBalanceArr != -1){
          balanceTable = newBalanceArr


        }else{
          setPriorityErr(true)
        }


      }
    
      //split into two arrays neg and pos
      for(var i = 0; i < balanceTable.length; i++){
        if(balanceTable[i].amount < 0){
          negArr.push(
            {
              name: balanceTable[i].name,
              amount: balanceTable[i].amount
            }
          )
          negAmt += balanceTable[i].amount
        }else{
          posArr.push({
            name: balanceTable[i].name,
            amount: balanceTable[i].amount
          }
          )
          posAmt += balanceTable[i].amount
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
              amount: parseInt(posArr[i].amount)
            })
            negArr[j].amount = negArr[j].amount + posArr[i].amount
            break
          }else if (posArr[i].amount == Math.abs(negArr[j].count)){
            outputArr.push({
              source: posArr[i].name,
              target: negArr[j].name,
              amount: parseInt(posArr[i].amount)

            })
            posArr[i].amount = parseInt(0) 
            negArr[j].amount = parseInt(0)
            break
          }else{
            outputArr.push({
              source: posArr[i].name,
              target: negArr[j].name,
              amount: parseInt(Math.abs(negArr[j].amount))
            })
            posArr[j].amount = posArr[i].amount + negArr[j].amount
            negArr[j] = 0
          }
        }
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
            {outputTable.map((value) =>(
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

          
          <button onClick={() => handleSettleClick()}>
            Settle
          </button>
          {
            (outputTable.length != 0 ? (
              <div className="App-table">
          
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
        
            {outputTable.map((row) => (
                    <tr><td>{row.source}</td><td>{row.target}</td> <td>
                    {row.amount}
                  </td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
         

          </div>
  

            ) : <div> </div>)

          }
          {
            (isPriorityError &&
              <div>Error</div>
              )
          }
          
  
  
  
        </div>
        
  
      </div>
    );
  }
export default App;
