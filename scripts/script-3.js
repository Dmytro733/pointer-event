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

  moon_icon: ".tools .tool-bg-color .moon",
  sun_icon: ".tools .tool-bg-color .sun"
}

function defaultValueWindow(){
  device.style.height = `${deviceParent.clientHeight}px`;

  deviceParent.style.setProperty('--screen-height',`${device.clientHeight - 100}px`);
  deviceParent.style.setProperty('--screen-width',`${device.clientWidth - 20}px`);

  canvas.height = screen.clientHeight;
  canvas.width = screen.clientWidth;
  action();
};

function resizeWindow() {
  window.addEventListener("resize", () => {
    device.style.height = `${deviceParent.clientHeight}px`;

    deviceParent.style.setProperty('--screen-height',`${device.clientHeight - 100}px`);
    deviceParent.style.setProperty('--screen-width',`${device.clientWidth - 20}px`);

    canvas.height = screen.clientHeight;
    canvas.width = screen.clientWidth;
  })
};

defaultValueWindow();

canvas.addEventListener('pointerdown', () => {
  action();
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

function actionBackgroundColor(){
  let chooseBtn = screen.querySelector(tools.bg_color_tool);
  chooseBtn.addEventListener('click', () => {
    setBackgroundColor();
  })
}

function setBackgroundColor(){
  let chooseBtn = screen.querySelector(tools.bg_color_tool);

  switch (chooseBtn.getAttribute('bg-color')) {
    case "black":
      chooseBtn.setAttribute('bg-color', "white");
      chooseBtn.style.borderColor = "black";
      chooseBtn.style.background = "black";
      screen.querySelector('.tools').style.setProperty('--tools-color',"black");
      break;
  
    case "white":
      chooseBtn.setAttribute('bg-color', "black");
      chooseBtn.style.borderColor = "white";
      chooseBtn.style.background = "white";
      screen.querySelector('.tools').style.setProperty('--tools-color',"white");
      break;
  }
  deviceParent.style.setProperty('--main-background',chooseBtn.getAttribute('bg-color'));
}

function action(){
  resizeWindow();
  setBrushValue();
  actionBackgroundColor();
}

