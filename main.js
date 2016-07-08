'use strict';


var socket = io('http://192.168.178.40:3030');


document.getElementById('controls').addEventListener('input', () => {
  socket.emit('control', {
    changerId:socket.id,
    elev:document.getElementById('elev').value,
    aile:document.getElementById('aile').value,
    thro:document.getElementById('thro').value,
    rudd:document.getElementById('rudd').value,
    aux1:document.getElementById('aux1').value,
    aux2:document.getElementById('aux2').value,
  })
})

socket.on('control', (data) => {
  if (socket.id != data.changerId) {
    document.getElementById('elev').value = data.elev
    document.getElementById('aile').value = data.aile
    document.getElementById('thro').value = data.thro
    document.getElementById('rudd').value = data.rudd
    document.getElementById('aux1').value = data.aux1
    document.getElementById('aux2').value = data.aux2
  }
  document.getElementById('elevDisplay').innerHTML = data.elev
  document.getElementById('aileDisplay').innerHTML = data.aile
  document.getElementById('throDisplay').innerHTML = data.thro
  document.getElementById('ruddDisplay').innerHTML = data.rudd
  document.getElementById('aux1Display').innerHTML = data.aux1
  document.getElementById('aux2Display').innerHTML = data.aux2
})






//GAMEPAD START

function noGamepad() {
  console.log("NO GAMEPAD FOUND");
  //Setzt alle werte so das die Drone stehen bleibt
}

function gamepadLoop() {
  if (navigator.getGamepads()[0] !== undefined) {
    window.requestAnimationFrame(() => gamepadLoop());
    //GAMEPADSTUFF
    console.log(navigator.getGamepads()[0].buttons);
    console.log(navigator.getGamepads()[0].axes);
    //console.log(navigator.getGamepads()[0]);
  } else {noGamepad()}

}
gamepadLoop();
window.addEventListener("gamepadconnected", () => gamepadLoop());

//GAMEPAD END
