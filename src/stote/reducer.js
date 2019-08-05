import {CHANGE_STATUS} from './loginAction'
//初始化state
let initState= {
    status:false,
}

let reducer = (state=initState,action) =>{

    switch(action.type){
        case CHANGE_STATUS :
            return{
                status:action.playload
            }
        default : 
        return state
    }
}


export default reducer;