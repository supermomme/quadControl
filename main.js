'use strict';


var socket = io('http://localhost:3030');
var app = feathers()
.configure(feathers.hooks())
.configure(feathers.socketio(socket))
.configure(feathers.authentication({ storage: window.localStorage }));
var userService = app.service('users');
var controlService = app.service('controls')


function getThrottle() {
  return controlService.find({query:{type:"thro"}}).then((res) => res.data[0]);
}


app.authenticate({
  type: 'local',
  'email': 'momme@juergensen.me',
  'password': 'test'
}).then(function(result){
  return controlService.find()
  .then((res) => res.data)
  .then((controls) => {
    let controlsElement = document.getElementById('controls');
    for (var i = 0; i < controls.length; i++) {
      let control = controls[i];
      let itemDivELement = document.createElement('div');
      let itemELement = document.createElement('input');
      itemELement.type = 'range';
      itemELement.value = control.value;
      itemELement.min = '0'; itemELement.max = '100';
      itemELement.addEventListener('input', () => {
        console.log(itemELement.value);
        controlService.patch(control.id, {value:itemELement.value})
      })
      controlService.on('patched',(res) => {
        if(res.id == control.id) itemELement.value = res.value;
      })
      itemDivELement.appendChild(itemELement);
      console.log(control.type);
      controlsElement.appendChild(itemDivELement);

    }
  })


}).catch(function(error){
  console.error('Error authenticating!', error);
});

/*
userService.create({
email:"momme@juergensen.me",
password:"test"
})
.then((res) => console.log(res))
.catch((err) => console.log(err))*/


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
