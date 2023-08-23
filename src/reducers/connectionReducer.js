import { useMemo } from "react"



const socket=null
const webrtc=null
const stream=null
const initalState ={
    socket,
    webrtc,
    
}
export default function streamReducer(state=initalState,action){
    switch(action.type){
        case 'SET_SOCKET':
            console.log(action.payload)
            return {...state,socket:action.payload}
        case 'SET_WEBRTC':
            return {...state,webrtc:action.payload}
        case 'SET_STREAM':
            return {...state,stream:action.payload}
        default:
            return state
    }
}