const deviceParent = document.querySelector('.device-parent');
const device = deviceParent.querySelector('.device');
const screenWrap = deviceParent.querySelector('.screen-wrap');
const screenBg = deviceParent.querySelector('.screen-bg');
const screen = deviceParent.querySelector('.screen');

function defaultValueWindow(){
  device.style.height = `${deviceParent.clientHeight}px`;

  deviceParent.style.setProperty('--screen-height',`${device.clientHeight - 100}px`);
  deviceParent.style.setProperty('--screen-width',`${device.clientWidth - 20}px`);
};

function resizeWindow() {
  window.addEventListener("resize", () => {
    device.style.height = `${deviceParent.clientHeight}px`;

    deviceParent.style.setProperty('--screen-height',`${device.clientHeight - 100}px`);
    deviceParent.style.setProperty('--screen-width',`${device.clientWidth - 20}px`);
  })
};

defaultValueWindow();
resizeWindow();

screen.addEventListener('pointerdown', event => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.id = event.pointerId;

  screen.setPointerCapture(event.pointerId)
  positionDot(event, dot);
  screen.append(dot)
})

screen.addEventListener('pointermove', event => {
  const dot = document.getElementById(event.pointerId)
  if(dot == null) return;
  positionDot(event, dot)
})

screen.addEventListener('pointerup', event => {
  const dot = document.getElementById(event.pointerId)
  if(dot == null) return;
  dot.remove()
})

function positionDot(event, dot){
  dot.style.width = `${event.width * 5}px`;
  dot.style.height = `${event.height * 5}px`;
  dot.style.left = `${event.offsetX}px`;
  dot.style.top = `${event.offsetY}px`;
}
