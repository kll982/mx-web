
import { createStore } from 'redux'

function counter1(state = { count: ['item_0'],selectedKeys:["main/home"] }, action) {
  const count = state.count
  switch (action.type) {
  case 'increase':
      return { count: action.filter,selectedKeys:state.selectedKeys }
	case 'decrease':
  return { count: state.count,selectedKeys:action.selectedKeys }
  case 'normal':
  var openKeys=sessionStorage.getItem("openKeys");
  var selectedKeysUpperKey=sessionStorage.getItem("selectedKeysUpperKey");
  if(selectedKeysUpperKey==openKeys){
    return { count: action.filter,selectedKeys:action.selectedKeys }
  }else{
    return { count: action.filter}
  }
  
  default:
      return state
  }
}

// Store
const store = createStore(counter1)

export default store