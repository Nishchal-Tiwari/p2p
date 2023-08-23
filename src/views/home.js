import React from 'react'
import {connect} from 'react-redux'
function home(props) {
  props.socket.joinRoom('test')
  return (
    <div>{} hello ohi</div>
  )
}

const mapStateToProps = (state) => ({
  webrtc: state.webrtc,
  socket: state.socket,
})
export default connect(mapStateToProps,null)(home)