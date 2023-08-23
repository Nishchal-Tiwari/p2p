import * as handler from './handleStateChange.js'
export default function newPeerConnections(newsocket) {
    const socket=newsocket
  this.peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:global.stun.twilio.com:3478",
        ],
      },
    ],
  });

  const peer=this.peer
  this.dataChannel=peer.createDataChannel('dataChannel')
  // Eventlistners for following events
  peer.onicecandidate =e=> handler.handleIceCandidate(e,socket);
  peer.onconnectionstatechange = e => handler.handleConnectionStateChange(peer.connectionState);
  // peer.onconnectionstatechange = e => console.log(peer.connectionState);
  peer.ontrack = e => handler.handleTrack;
  peer.onnegotiationneeded = e => handler.handleNegotiation;
  peer.ondatachannel = e => handler.handleDataChannel;


  this.createOffer = async () => { 
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const localDescription={
        type:'offer',
        sdp:offer.sdp
    }
    socket.toRoom(localDescription);
    console.log('offer created')
    return localDescription;
  };
  this.createAnswer = async (offer) => {   
    peer.setRemoteDescription(offer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    const localDescription={
        type:'answer',
        sdp:answer.sdp
    }
    socket.toRoom(localDescription);
    console.log('answer created')
    return localDescription;
  };
  this.verifyAnswer = async (answer) => {  
    console.log(peer.signalingState,peer.connectionState) 
    if (peer.signalingState !== "stable") {   // have-local-offer is normal state
      await peer.setRemoteDescription(answer);
      console.log('answer verified',peer.signalingState,peer.connectionState)
      return true;
    }
    console.error('User trying to answer twice || trying answer in stable state');
    return false;
  };
  // exchanges important information like ip address of peer
  this.handleCandidate=(ice)=>{
    console.log('candidate received')
    if(ice.candidate){
        peer.addIceCandidate(ice);
    }
    else{
        peer.addIceCandidate(null);
    }
}
this.checkConectionState = () => {
  console.log(peer.connectionState);
}
}

// local description for answer  looks like this
// const localDescription={
//     type:'answer',
//     sdp:answer.sdp
// }
// local description for offer looks like this
// const localDescription={
//     type:'offer',
//     sdp:offer.sdp
// }
