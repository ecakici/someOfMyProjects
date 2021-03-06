function webSocketClicked(){
	if (remoteme.isWebSocketConnected()) {
		remoteme.disconnectWebSocket();
	}else{
		remoteme.connectWebSocket();
	}
}

function webRtcClicked(){
	if (remoteme.isWebRTCConnected()) {
		remoteme.disconnectWebRTC();
	}else{
		remoteme.connectWebRTC();
	}
}

function setup(){
	remoteme = new RemoteMe({
		automaticlyConnectWS: true,
		automaticlyConnectWebRTC:false,
		webSocketConnectionChange: webSocketConnectionChange,
		webRTCConnectionChange: webRtcConnectionChange,
		mediaConstraints: {'mandatory': {'OfferToReceiveAudio': false, 'OfferToReceiveVideo': false}}
	});
}

function onLedClick(thiz){
	var ledId=parseInt($(thiz).attr("ledId"));
	var nextState;
	if ($(thiz).hasClass("on")){
		$(thiz).removeClass( "on" );
		nextState=0;
	}else{
		$(thiz).addClass( "on" );
		nextState=1;
	}


	remoteme.sendUserMessageByFasterChannel (pythonScriptDeviceId,[ledId,nextState]);

}


function webSocketConnectionChange(state){
	if (state==ConnectingStatusEnum.CONNECTED){
		$("#websocketButton").html("Websocket - connected");
	}else if (state==ConnectingStatusEnum.DISCONNECTED){
		$("#websocketButton").html("Websocket - disconnected");
	}else if (state==ConnectingStatusEnum.ERROR){
		$("#websocketButton").html("Websocket - error");
	}

}

function webRtcConnectionChange(state){

	if (state==ConnectingStatusEnum.CONNECTED) {
		$("#webRtcButton").html("WebRTC - connected");
		$("#webRtcButton").prop("disabled",!true)
	}else if (state==ConnectingStatusEnum.CONNECTING) {
		$("#webRtcButton").html("WebRTC - connecting");
		$("#webRtcButton").prop("disabled",!false);
	}else if (state==ConnectingStatusEnum.DISCONNECTING) {
		$("#webRtcButton").html("WebRTC - disconnecting");
		$("#webRtcButton").prop("disabled",!false);
	}else if (state==ConnectingStatusEnum.CHECKING) {
		$("#webRtcButton").html("WebRTC - checking");
		$("#webRtcButton").prop("disabled",!false);
	}else if (state==ConnectingStatusEnum.DISCONNECTED) {
		$("#webRtcButton").html("WebRTC - disconected");
		$("#webRtcButton").prop("disabled",!true);
	}else if (state==ConnectingStatusEnum.FAILED) {
		$("#webRtcButton").html("WebRTC - failed");
		$("#webRtcButton").prop("disabled",!true);
	}
}

