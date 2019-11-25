  // Create a client instance
var srv = "test.mosquitto.org"
var port = 8080
console.log(srv)
console.log(port)

  // Create a client instance
client = new Paho.MQTT.Client(srv, Number(port), "");


// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;


// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("tempmonitor");
  message = new Paho.MQTT.Message("Hello");
  message.destinationName = "World";
  client.send(message);
}


// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}


// called when a message arrives

  function onMessageArrived(message) {
    //console.log("Temperatura; Humidade:"+message.payloadString);
    var menssagem = message.payloadString;
    //console.log("Temperatura/Humidade: "+menssagem);
    var temperatura  = menssagem.slice(0, 4);
    console.log("Temperatura: "+temperatura+"°C");
    var umidade =  menssagem.slice(5, 9);
    console.log("Umidade: "+umidade+"%");

    document.getElementById("minhatemp").innerHTML = temperatura+"°C";
    document.getElementById("minhaumidade").innerHTML = umidade+"%";

  } 
  //alert(tempatual);
