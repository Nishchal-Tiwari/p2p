import React,{useMemo} from 'react'
import {connect} from 'react-redux'
import Socket from './services/socket'
import Webrtc from './services/webrtc'
import localStream from './services/localStream'
function Init(props) {
    const socket = useMemo(()=>new Socket(),[])
    const webrtc = useMemo(()=>new Webrtc(socket),[])
    // const stream = useMemo(()=>new localStream(),[])
    props.setSocket(socket)
    props.setWebrtc(webrtc)
    // props.setStream(stream)
  return null
}
const updateProps = (dispatch) => ({
    setSocket: (socket) => dispatch({type:'SET_SOCKET',payload:socket}),
    setWebrtc: (webrtc) => dispatch({type:'SET_WEBRTC',payload:webrtc}),
    // setStream: (stream) => dispatch({type:'SET_STREAM',payload:stream}),
})


export default connect(null,updateProps)(Init)

