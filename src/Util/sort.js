const insertSort = (origArray, sortProperty = null) => {
    let arr = [...origArray]

    for(var i = 1; i < arr.length; i++) {
  
        var val = arr[i]
        var j = i - 1
        
        while(j >= 0 && arr[j] > val) {
          arr[j + 1] = arr[j]
          j--
        }
        
        arr[j + 1] = val
      }
    return arr
}

export {insertSort}