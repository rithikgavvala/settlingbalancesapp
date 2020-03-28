import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const settleBalances = () => {
    const balanceArr = {
        name: ["John", "Peter", "Russell", "Smith", "Adam"],
        amount: [-700, 500, -200, 700, -300]
      }
    
      const priorityArr = {
        source: ["John", "John"],
        target: ["Peter", "Smith"],
        amount: [-200, 500]
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
      let totalPpl = 0 
      let noMoreTransactions = false
    
      // split arrays into two dicts neg and pos
      for (var i = 0; i < balanceArr.name.length; i++){
        if (balanceArr.amount[i] < 0) {
          negArr.name.push(balanceArr.name[i])
          negArr.amount.push(balanceArr.amount[i])
          negAmt += balanceArr.amount[i]
    
        }else{
          posArr.name.push(balanceArr.name[i])
          posArr.amount.push(balanceArr.amount[i])
          posAmt += balanceArr.amount[i]
    
        }
        totalPpl++;
      }

      //prioritize transactions
      if(priorityArr){

      }
      //distribute money
      for(var i = 0 ; i < posArr.name.length; i++){
        for(var count = 0; count < negArr.name.length; count++){
            if (posArr.amount[i] < Math.abs(negArr.amount[count])){ 
              console.log("POS "+ posArr.amount[i] + ", " + negArr.amount[count] )
              outputArr.push(posArr.name[i] + " -> " + negArr.name[count] + ": " +  posArr.amount[i])
              negArr.amount[count] = negArr.amount[count] + posArr.amount[i]
              posArr.amount[i] = 0
              break
            }
            else if (posArr.amount[i] == Math.abs(negArr.amount[count])){
              console.log(posArr.amount[i] + ", " + negArr.amount[count])
              outputArr.push(posArr.name[i] + " -> " + negArr.name[count] + ": " +  posArr.amount[i])
              posArr.amount[i] = 0
              negArr.amount[count] = 0
              break
            }
            else{
              console.log("NEG " + posArr.amount[i] + ", " + negArr.amount[count] )

              outputArr.push(posArr.name[i] + " -> " + negArr.name[count] + ": " +  Math.abs(negArr.amount[count]))
              posArr.amount[count] = posArr.amount[i] + negArr.amount[count]
              negArr.amount[count] = 0
              
            }
     
        }
    
      }
      console.log(outputArr)
      return outputArr
    }


  


  return (
    <div className="App">
      <div className="App-header">
        <div className="App-header-content">
          Settling Balances
        </div>
      </div>
      <div className="App-body">
        <button onClick={() => settleBalances()}>
           Settle 
        </button>

      </div>
     
    </div>
  );
}

export default App;
