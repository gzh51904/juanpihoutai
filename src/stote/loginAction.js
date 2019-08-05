export const CHANGE_STATUS = 'CHANGE_STATUS';

export function statusAction (boolen){
    return {
        type : CHANGE_STATUS,
        playload : boolen
    }
}

export default{
    statusAction
}