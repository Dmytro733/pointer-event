const deviceParent = document.querySelector('.device-parent');
const device = deviceParent.querySelector('.device');
const screenWrap = deviceParent.querySelector('.screen-wrap');
const screenBg = deviceParent.querySelector('.screen-bg');
const screen = deviceParent.querySelector('.screen');
const canvas = deviceParent.querySelector('.paint');
const ctx = canvas.getContext("2d");

const tools = {
  color_tool: ".tools .tool-color input",
  size_tool: ".tools .tool-size input",
  bg_color_tool: ".tools .tool-bg-color input",
  clear_screen_tool: ".tools .tool-clear-screen input"
}

function startApp(){
  device.style.height = `${deviceParent.clientHeight}px`;

  deviceParent.style.setProperty('--screen-height',`${device.clientHeight - 100}px`);
  deviceParent.style.setProperty('--screen-width',`${device.clientWidth - 20}px`);

  canvas.height = screen.clientHeight;
  canvas.width = screen.clientWidth;
  action();
};

startApp();

function resizeWindow() {
  window.addEventListener("resize", () => {
    device.style.height = `${deviceParent.clientHeight}px`;

    deviceParent.style.setProperty('--screen-height',`${device.clientHeight - 100}px`);
    deviceParent.style.setProperty('--screen-width',`${device.clientWidth - 20}px`);

    canvas.height = screen.clientHeight;
    canvas.width = screen.clientWidth;
  })
};

canvas.addEventListener('pointerdown', () => {
  setBrushValue();
  canvas.addEventListener('pointermove', event => {
    positionDot(event)
  })
})

canvas.addEventListener('pointerup', () => {
  canvas.removeEventListener('pointermove', positionDot)
})

function positionDot(event){
  if(event.pressure > 0){
    let pos = relativePos(event, ctx.canvas)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
  }
}

function relativePos(event, element) {
  var rect = element.getBoundingClientRect();
  return {x: Math.floor(event.clientX - rect.left),
          y: Math.floor(event.clientY - rect.top)};
}

function setBrushValue(){
  ctx.lineWidth = screen.querySelector(tools.size_tool).value;
  ctx.lineCap = "round";
  ctx.strokeStyle = screen.querySelector(tools.color_tool).value;
}
  

function setBackgroundColor(target){
  switch (target.getAttribute('bg-color')) {
    case "black":
      target.setAttribute('bg-color', "white");
      target.style.borderColor = "black";
      target.style.background = "black";
      screen.querySelector('.tools').style.setProperty('--tools-color',"black");
      break;
  
    case "white":
      target.setAttribute('bg-color', "black");
      target.style.borderColor = "white";
      target.style.background = "white";
      screen.querySelector('.tools').style.setProperty('--tools-color',"white");
      break;
  }
  deviceParent.style.setProperty('--main-background',target.getAttribute('bg-color'));
}
 
function сlearScreen(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function action(){

  resizeWindow();
  setBrushValue();

  screen.querySelector(tools.bg_color_tool).addEventListener('click', (event) => setBackgroundColor(event.target))
  screen.querySelector(tools.clear_screen_tool).addEventListener('click', () => сlearScreen())
}

