function handleConnectionStateChange(connectionState) { 
    // types of connectionState
    // 'new' : The connection has been created. This is the initial state of a RTCPeerConnection object.
    // 'connecting' : The RTCPeerConnection is in the process of negotiating a connection. This is the state when the connection is being established.
    // 'connected' : A usable connection has been established.
    // 'disconnected' : The connection has been closed intentionally, either by calling RTCPeerConnection.close() or by the remote peer closing the connection. This is also the initial state.
    // 'failed' : The connection has been closed because the connection attempt has failed or the remote peer rejected the connection.
    // 'closed' : The connection has been closed.
    // TODO : handle connection state change
    console.log(connectionState);
}
function handleIceCandidate(e,socket) {
    // console.log(e)
    const ice={
        type:'candidate',
        candidate:null,
    }
    if(e.candidate){
        ice.candidate=e.candidate.candidate;
        ice.sdpMid=e.candidate.sdpMid;
        ice.sdpMLineIndex=e.candidate.sdpMLineIndex;
    }
    socket.toRoom(ice)
}

function handleTrack(e) {
    // add track to remoteVideo
    print(e)

}
function handleNegotiation() {
    // create offer
}
function handleDataChannel(event) {
    // add data channel to peer
}

export { handleConnectionStateChange, handleIceCandidate, handleTrack, handleNegotiation, handleDataChannel };