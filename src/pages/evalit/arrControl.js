
//返回分隔的id数组
var arrCon1=function(arr){
  　console.log(arr)
    let firstArray=[];
    let secondArray=[];
    let thirdArray=[];
    if(arr[0].length==1){
        for(var index1=0;index1<arr.length; index1++){
            firstArray.push(arr[index1][0])
        }
        console.log(firstArray)
        return [firstArray]
    }
    if(arr[0].length==2){
        for(var index1=0;index1<arr.length; index1++){
            firstArray.push(arr[index1][0])
            secondArray.push(arr[index1][0]+"-"+arr[index1][1])
        }
        console.log(firstArray)
        console.log(secondArray)
        return [firstArray,secondArray]
    }
    if(arr[0].length==3){
        for(var index1=0;index1<arr.length; index1++){
            firstArray.push(arr[index1][0])
            secondArray.push(arr[index1][0]+"-"+arr[index1][1])
            thirdArray.push(arr[index1][0]+"-"+arr[index1][1]+"-"+arr[index1][2])
        }
        console.log(firstArray)
        console.log(secondArray)
        console.log(thirdArray)
        return [firstArray,secondArray,thirdArray]
    }
}

//这是数组里不同的值的集合
var findEqualTtem=function(arr){
    // 　　console.log(arr)
    let str1=[];
    for(var i=0;i<arr.length;i++){
    }
    for(i=0;i<arr.length;i++){
        if(str1.indexOf(arr[i])<0){
            str1.push(arr[i])
        }
    }
    console.log(str1)
    return str1;
 
}

//传入数组和指定的值，获取它在数组里的第一次出现的位置；并返回
var findEqualValueInArray=function(arr,arrValue){
    // 　　console.log(arr)
    let str1=[];
    var firstIndex=0;
    var lastIndex=0;
    for(var i=0;i<arr.length;i++){
        if(arr[i]==arrValue){
            firstIndex=i
            break
        }
    }
    for(var j=arr.length-1;j>=0;j--){
        if(arr[j]==arrValue){
            lastIndex=j
            break
        }
    }
    //console.log(firstIndex,lastIndex)
    return [firstIndex,lastIndex];
 
}
var findColInArray=function(arr,index){
    // 　　console.log(arr)
    let str1=[];
    var firstIndex=0;
    var lastIndex=0;
    for(var i=0;i<arr.length;i++){
        return arr[index]
    }
    for(var j=arr.length-1;j>=0;j--){
        if(arr[j]==arrValue){
            lastIndex=j
            break
        }
    }
    console.log(firstIndex,lastIndex)
    return [firstIndex,lastIndex];
 
}
export {arrCon1,findEqualTtem,findEqualValueInArray}
