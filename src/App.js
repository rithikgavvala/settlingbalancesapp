import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import BalanceTable from './BalanceTable';
import PriorityTable from './PriorityTable'
import { unstable_renderSubtreeIntoContainer } from 'react-dom';


function App() {
  let _default = []
  let outputArr = []
  const [balanceTable, setBalanceRow] = useState(_default)
  const [outputTable, setOutputTable] = useState(outputArr)
  const [priorityTable, setPriorityRow] = useState(_default)
  const [errMessage, setErrMessage] = useState([])
  const [settleCount, setSettleCount] = useState(0);

  const increment = () => {
    setSettleCount(settleCount + 1)
  }

  const addErrMessage = (err) => {
    setErrMessage([...err])
  }
    
  const handleBalanceChange = event => {
      const _temp = [...balanceTable]
      _temp[event.target.dataset.id][event.target.name] = event.target.value;
      setBalanceRow(_temp)
  }

  const clearOutputTable = () => {
    setOutputTable([])
  }

  const clearErrors = () => {
    setErrMessage([])
  }



  const addNewBalanceRow = () => {
      setBalanceRow(prevRows => [...prevRows, {name: "", balance: parseInt(0)}])
  }

  const handleSettleClick = () => {
    console.log(settleCount)
    if(settleCount > 0){

      clearErrors()
    } 

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
      setPriorityRow(prevRows => [...prevRows, {from: "", to:  "", amount: parseInt(0)}])
  }


  const negArr = []
  const posArr = []

  let posAmt = 0
  let negAmt = 0
  let totalTrans = 0 

  const [isPriorityError, setPriorityErr] = useState(false)

  // const prioritizeBalances = (priorityTable, balanceTable ) => {
  //   let isError = false
  //   const tempArr = balanceTable
  //   console.log("GOING INTO PRIORITY" + priorityTable)
    
  //   for(var i = 0 ; i < priorityTable.length; i++){
  //     console.log("GOING INTO LOOP")
  //     let srcIndex = balanceTable.findIndex(obj => obj.name == priorityTable[i].source)
  //     let tarIndex = balanceTable.findIndex(obj => obj.name == priorityTable[i].target)
  //     console.log("SRC"  + srcIndex)
  //     console.log("TAR" + tarIndex)
  //     if(tarIndex == -1 || srcIndex == -1){
  //       break;
  //     }
  //     console.log("Condition1 " + (Math.abs(tempArr[srcIndex].amount) > priorityTable[i].amount) )
  //     console.log("Condition2 " + (tempArr[tarIndex].amount > 0))
  //     console.log("val1 " + tempArr[tarIndex].amount)
  //     console.log("val2 " + typeof(priorityTable[i].amount))
  //     console.log("Condition3 " + (tempArr[tarIndex].amount < priorityTable[i].amount))

  //     if(parseInt(Math.abs(tempArr[srcIndex].amount)) > parseInt(priorityTable[i].amount) && parseInt(tempArr[tarIndex].amount) > 0 && parseInt(tempArr[tarIndex].amount) > parseInt(priorityTable[i].amount)){
      
  //       tempArr[srcIndex].amount += priorityTable[i].amount
  //       tempArr[tarIndex].amount -= priorityTable[i].amount
  //     }else{
  //       console.log("FALSE CONDITION")
  //       isError = true; 
  //     }
  //   }
  //   if(isError){
  //     return -1
  //   }else{
  //     console.log("TEMP " + tempArr)

  //     return tempArr
  //   } 
  // }

  const settleBalances = (preferences, finances) => {
    //This is input1
//     let finances = [
//     {
//         name: 'Aditya',
//         balance: -861
//     },
//     {
//         name: 'Manish',
//         balance: 0
//     },
//     {
//         name: 'Nara',
//         balance: -2725
//     },
//     {
//         name: 'Sumanth',
//         balance: -387
//     },
//     {
//         name: 'Madu',
//         balance: 397
//     },
//     {
//         name: 'Chary',
//         balance: 1256
//     },
//     {
//         name: 'Uma',
//         balance: 3100
//     },
//     {
//         name: 'Siva',
//         balance: -796
//     },
//     {
//         name: 'Venum',
//         balance: 383
//     },
//     {
//         name: 'Praveen',
//         balance: 240
//     },
//     {
//         name: 'Satish',
//         balance: -607
//     }
//     ];

// // This is input2
// let preferences = [
//     {
//         from: 'Nara',
//         to: 'Uma',
//         amount: 0
//     },

//     {
//         from: 'Satish',
//         to: 'Venum',
//         amount: 0
//     },

//     {
//         from: 'Sumanth',
//         to: 'Madu',
//         amount: 0
//     }


// ];


//------------
let validationErrors = [];
let winners = []
let losers = []
if(finances.length < 2){
  validationErrors.push("ERROR: Input table size invalid.")
}else{
  winners = finances.filter( player => player.balance > 0 );
  losers  = finances.filter( player => player.balance < 0 ).map( player => { return { name: player.name, balance: -1*player.balance}  });
  if(winners.length == 0 || losers.length == 0){
    validationErrors.push("ERROR: There are either no winners or no losers in the game")
  }else{
    let winnerBalanceTotal =
        winners.reduce( (total, person) => {
            return { name: person.name, balance: total.balance + person.balance };
        } );

    let loserBalanceTotal =
        losers.reduce( (total, person) => {
            return { name: person.name, balance: total.balance + person.balance };
        } );

    if (winnerBalanceTotal.balance != loserBalanceTotal.balance) {
      validationErrors.push('The winner totals ['+winnerBalanceTotal.balance+'] do not add up to loser totals ['+loserBalanceTotal.balance+']');
    }

  }
}
console.log(JSON.stringify(finances))

console.log("WIN  " + JSON.stringify(winners))


//
// Validation Checks
//

//
// Rule 1: Winner balance total should equal to losers balance total
//


//
// Rule 2: Preference.from: must be a loser and the Preference.amount must be a smaller quantity than his loss
//
preferences.forEach( pref => {
    let source = losers.find(x => x.name == pref.from);
    if (source == null) {
        validationErrors.push(pref.from+' does not appear to have lost any money in the game. Yet, there is a preference to transfer money from this person');
    } else if (source.balance < pref.amount ) {
        validationErrors.push('The preference entry for '+pref.from+' has amount exceeding what he has actually lost in the game');
    }
});

//
// Rule 3: Preference.to: must be a winner and the Preference.amount must be a smaller quantity than his wins
//
preferences.forEach( pref => {
    let source = winners.find(x => x.name == pref.to);
    if (source == null) {
        validationErrors.push(pref.to+' does not appear to have won any money in the game. Yet, there is a preference to transfer money to this person');
    } else if (source.balance < pref.amount ) {
        validationErrors.push('The preference entry for '+pref.to+' has amount exceeding what he has actually won in the game');
    }
});

// function
// subtract dollar amount from the player kitty
// arrange the records in descending order
//
let adjustDollarAmounts = function(list, name, amount) {
    let tempList = [];
    list.forEach( player => {
        if (player.name == name) {
            let newBalance = player.balance - amount;
            if (newBalance > 0) {
                tempList.push({ name: name, balance:  newBalance })
            }
        } else {
            tempList.push(player);
        }
    });

    // if there are any entries in the list sort them.
    if (tempList.length > 0) {
        return tempList.sort( (x, y) => (x.balance < y.balance) ? 1 : -1);
    } else {
        return tempList;
    }

}

//
// Perform one transaction
// move the said amount from one player to another
// refresh the winner and loser lists
//
let transact = function(from, to, amount) {
    // from the winner list remove subtract the amount
    return {
        winners: adjustDollarAmounts(winners, to, amount),
        losers: adjustDollarAmounts(losers, from, amount),
        transaction: { from: from, to: to, amount: amount }
    }
}
//
// Do validation checks here first
//


let transactions = [];


if (validationErrors.length <= 0 ) {
// perform preferred transactions
    preferences.forEach( preference => { // take one preference at a time
        let theLoser = losers.find( player => player.name == preference.from );
        let theWinner = winners.find( player => player.name == preference.to );

        // protect from over-transfer
        // does the winner really have pending balance exceeding the preferred transfer amount
        // if not cap it
        let amountToTransfer = Math.min( theLoser.balance, theWinner.balance);
        if (preference.amount > 0) {
            // we have a preference amount given
            amountToTransfer = Math.min(amountToTransfer, preference.amount); // pick the lower of the two
        }
        let tx = transact(preference.from, preference.to, amountToTransfer);
        winners = tx.winners;
        losers = tx.losers;
        transactions.push(tx.transaction);
    });

// perform the greedy moves
    while( losers.length > 0 && winners.length > 0 ) {
        let firstLoser = losers[0];
        let firstWinner = winners[0];
        let amount = (firstLoser.balance > firstWinner.balance) ? firstWinner.balance : firstLoser.balance;

        let tx = transact( firstLoser.name, firstWinner.name, amount);
        winners = tx.winners;
        losers = tx.losers;
        transactions.push(tx.transaction);
    }
    //console.log(JSON.stringify(transactions, null, '\t'));

    if (winners.length > 0) {
        validationErrors.push('ERROR: there are some winners left. Something is not right');
    }
    if (losers.length > 0) {
        validationErrors.push('ERROR: there are some losers left. Something is not right');
    }

    let sendTotals = {};
    let receiveTotals = {};

    // find the send and receive totals
    transactions.forEach(tx => {
        sendTotals[tx.from] = (sendTotals[tx.from] ?  sendTotals[tx.from] : 0) + tx.amount;
        receiveTotals[tx.to] = (receiveTotals[tx.to] ? receiveTotals[tx.to] : 0) + tx.amount;
    });

    console.log('Transactions');
    console.log('---------------');
    transactions.sort( (x, y) => x.from > y.from ? 1 : -1 ).forEach( tx => {
        console.log(tx.from + ' --> ' + tx.to + ' :\t\t\t'+tx.amount);
    });

    console.log('People Sending Money');
    console.log('---------------');
    let totalMoneySent = 0;
    let totalMoneyReceived = 0;
    Object.keys(sendTotals).forEach( key => {
        console.log(key+ ' sending a total of:\t\t\t '+sendTotals[key]);
        totalMoneySent += sendTotals[key];
    });
    console.log('People Receiving Money');
    console.log('---------------');
    Object.keys(receiveTotals).forEach( key => {
        console.log(key+ ' receiving a total of:\t\t\t '+receiveTotals[key]);
        totalMoneyReceived += receiveTotals[key];
    });
    console.log('---------------');
    console.log('Total Money Sent: '+totalMoneySent);
    console.log('Total Money Received: '+totalMoneyReceived);

} else {
    setErrMessage(validationErrors)
    clearOutputTable()
    console.log(JSON.stringify(validationErrors, null, '\t'));
}

    return transactions
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
                    <tr> <td>{row.name}</td><td>{row.balance}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="table-2">
              <table>
                <thead>
                  <tr>
                    <th>
                      From
                    </th>
                    <th>
                      To
                    </th>
                    <th>
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {priorityTable.map((row) => (
                    <tr><td>{row.from}</td><td>{row.to}</td> <td>
                    {row.amount}
                  </td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
  
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
            ((outputTable.length != 0) ? (
              <div className="App-output-table">
          
              <table>
                <thead>
                  <tr>
                    <th>
                      From
                    </th>
                    <th>
                      To
                    </th>
                    <th>
                      Amount
                    </th>
                  </tr>  
                </thead>
                <tbody>
        
            {outputTable.map((row) => (
              <tr>
                    <td>{row.from}</td>
                    <td>{row.to}</td>
                    <td>
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
          {errMessage.length > 0 ? 
          
          <div className="App-output-table"> 
          <table>
            <thead>
              <tr>
                <th>Error(s)</th></tr>
            </thead>
            <tbody>
              {errMessage.map((row) => (
                <tr><td>{row}</td></tr>
              ))}
            </tbody>
          </table>

        </div>
          
          
           : <div></div>}
        
          
  
  
  
        </div>
        
  
      </div>
    );
  }
export default App;
