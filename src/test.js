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
    
      //distribute money
      for(var i = 0 ; i < posArr.name.length; i++){
        let count = 0;
        while(posArr.amount[i] > 0 || noMoreTransactions == true){
          if (posArr.amount[i] <= Math.abs(negArr.amount[count])){
            outputArr.push(posArr.name[i] + " -> " + negArr.name[count] + ": " +  posArr.amount[i])
            negArr.amount[count] = negArr.amount[count] + posArr.amount[i]
            posArr.amount[i] = 0
          }
          else{
            outputArr.push(posArr.name[i] + " -> " + negArr.name[count] + ": " +  Math.abs(negArr.amount[i]))
            posArr.amount[count] = posArr.amount[i] + negArr.amount[count]
            negArr.amount[count] = 0
          }
          count++;
    
    
        }
        console.log(outputArr)
    
      }
      return outputArr
}
