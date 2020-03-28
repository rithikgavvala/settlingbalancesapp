import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const balanceArr = {
    name: ["John", "Peter", "Russell", "Smith", "Adam"],
    amount: [-700, 500, -200, 700, -300]
  }

  const priorityArr = {
    source: ["John", "John"],
    target: ["Peter", "Smith"],
    amount: [200, 100]
  }

  const outputArr = []
  const negArr = {
    name: [],
    amount: []

  }
  const posArr = {
    name: [],
    amount: []
  }

  let posAmt = 0
  let negAmt = 0
  let totalTrans = 0 
  let noMoreTransactions = false
  let balanceTable = []
  let priorityTable = []
  
  const [isPriorityError, setPriorityErr] = useState(false)

  const prioritizeBalances = (priorityArr, balanceArr) => {
    let isError = false
    const tempArr = balanceArr
    for(var i = 0; priorityArr.source.length; i++){
      let srcIndex = tempArr.name.indexOf(priorityArr.source[i])
      let tarIndex = tempArr.name.indexOf(priorityArr.target[i])
      
      if(tarIndex == -1 || srcIndex == -1){
        break;
      }
      if(Math.abs(tempArr.amount[srcIndex]) > priorityArr.amount[i] && tempArr.amount[tarIndex] > 0 && tempArr.amount[tarIndex] > priorityArr.amount[i]) {
        console.log("SRC"  + srcIndex)
        console.log("TAR" + tarIndex)
        tempArr.amount[srcIndex] += priorityArr.amount[i]
        tempArr.amount[tarIndex] -= priorityArr.amount[i]
      }else{
        isError = true;
      }


    }
    if(isError){
      return -1
    }else{
      return tempArr
    }
    console.log(balanceArr)
      
  }

  const settleBalances = () => {


      //prioritize transactions
      let newBalanceArr = prioritizeBalances(priorityArr, balanceArr)
      
      console.log("ARR" + newBalanceArr)
      if (newBalanceArr != -1){
        // split arrays into two dicts neg and pos
        for (var i = 0; i < balanceArr.name.length; i++){
          if (balanceArr.amount[i] < 0) {
            negArr.name.push(balanceArr.name[i])
            negArr.amount.push(balanceArr.amount[i])
            negAmt += balanceArr.amount[i]
      
          }else if (balanceArr.amount[i] > 0){
            posArr.name.push(balanceArr.name[i])
            posArr.amount.push(balanceArr.amount[i])
            posAmt += balanceArr.amount[i]
      
          }
          totalTrans++;
       }
      }else{
        setPriorityErr(true)
      }


      //distribute money
      for(var i = 0 ; i < posArr.name.length; i++){
        for(var count = 0; count < negArr.name.length; count++){
            if (posArr.amount[i] < Math.abs(negArr.amount[count])){ 
              outputArr.push(posArr.name[i] + " -> " + negArr.name[count] + ": " +  posArr.amount[i])
              negArr.amount[count] = negArr.amount[count] + posArr.amount[i]
              posArr.amount[i] = 0
              break
            }
            else if (posArr.amount[i] == Math.abs(negArr.amount[count])){
              outputArr.push(posArr.name[i] + " -> " + negArr.name[count] + ": " +  posArr.amount[i])
              posArr.amount[i] = 0
              negArr.amount[count] = 0
              break
            }
            else{
              outputArr.push(posArr.name[i] + " -> " + negArr.name[count] + ": " +  Math.abs(negArr.amount[count]))
              posArr.amount[count] = posArr.amount[i] + negArr.amount[count]
              negArr.amount[count] = 0
              
            }
     
        }
    
      }
      console.log(outputArr)
      return outputArr
    }

    //generate rows for body
    for ( var i = 0 ; i < balanceArr.name.length; i++){
      balanceTable.push(<tr> <td>{balanceArr.name[i]}</td><td>{balanceArr.amount[i]}</td></tr>)
    }
    for (var j = 0; j < priorityArr.source.length; j++){
      priorityTable.push(<tr><td>{priorityArr.source[j]}</td><td>{priorityArr.target[j]}</td> <td>
        {priorityArr.amount[j]}
      </td>
        </tr>)
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
                {balanceTable}
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
                {priorityTable}
              </thead>
            </table>
          </div>

        </div>




      </div>
      {/* <div className="App-header">
        <div className="App-header-content">
          Settling Balances
        </div>
      </div>
      <div className="App-body">
       
        <button onClick={() => settleBalances()}>
           Settle 
        </button>
        {isPriorityError &&
          <div> Error </div>
        
        }

      </div>
      */}
    </div>
  );
}

export default App;
