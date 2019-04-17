(function(){
	window.locairirr="locairirr"
	
})()

Array.prototype.includeKey=function(key){
	var arrayCheck = this.valueOf();
	console.log(arrayCheck)
	var time=false;
	for(var kk1=0; kk1<arrayCheck.length; kk1++){
		if(arrayCheck[kk1]==key){
			console.log(arrayCheck[kk1])
			time=true
		}
	}
	return time
}
String.prototype.includeKey=function(key){
	var arrayCheck = this.valueOf();
	console.log(arrayCheck)
	var time=false;
	if(arrayCheck.indexOf(key)>=0){
		time=true;
	}
	return time
}
function e0(arr,items,key){
	if(items.children && items.children.length > 0){
		items.children.map((itemss,indexss) => {
		  if(itemss.id == key){
		      arr.push(itemss);
		  }
		  e0(arr,itemss,key);
		})
	}
}
Array.prototype.equalKeyArray=function(arr,key){
	var departsArr = this.valueOf();
  departsArr.map((item,index) => {
    if(item.id == key){
      arr.push(item);
		}
		console.log(item)
    e0(arr,item,key);
  })
}

