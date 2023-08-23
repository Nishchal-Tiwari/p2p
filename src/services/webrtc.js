import * as handler from './handleStateChange.js';

class NewPeerConnections {
  constructor(newsocket) {
    const socket = newsocket;
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

    const peer = this.peer;
    this.dataChannel = peer.createDataChannel('dataChannel');
    // Event listeners for following events
    peer.onicecandidate = e => handler.handleIceCandidate(e, socket);
    peer.onconnectionstatechange = e => handler.handleConnectionStateChange(peer.connectionState);
    // peer.onconnectionstatechange = e => console.log(peer.connectionState);
    peer.ontrack = e => handler.handleTrack;
    peer.onnegotiationneeded = e => handler.handleNegotiation;
    peer.ondatachannel = e => handler.handleDataChannel;
  }

  async createOffer() {
    const offer = await this.peer.createOffer();
    await this.peer.setLocalDescription(offer);
    const localDescription = {
      type: 'offer',
      sdp: offer.sdp,
    };
    this.socket.toRoom(localDescription);
    console.log('offer created');
    return localDescription;
  }

  async createAnswer(offer) {
    this.peer.setRemoteDescription(offer);
    const answer = await this.peer.createAnswer();
    await this.peer.setLocalDescription(answer);
    const localDescription = {
      type: 'answer',
      sdp: answer.sdp,
    };
    this.socket.toRoom(localDescription);
    console.log('answer created');
    return localDescription;
  }

  async verifyAnswer(answer) {
    console.log(this.peer.signalingState, this.peer.connectionState);
    if (this.peer.signalingState !== "stable") {
      // have-local-offer is normal state
      await this.peer.setRemoteDescription(answer);
      console.log('answer verified', this.peer.signalingState, this.peer.connectionState);
      return true;
    }
    console.error('User trying to answer twice || trying answer in stable state');
    return false;
  }

  handleCandidate(ice) {
    console.log('candidate received');
    if (ice.candidate) {
      this.peer.addIceCandidate(ice);
    } else {
      this.peer.addIceCandidate(null);
    }
  }

  checkConnectionState() {
    console.log(this.peer.connectionState);
  }
}

export default NewPeerConnections;
