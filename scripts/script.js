let deviceParent = document.querySelector('.device-parent');
let device = deviceParent.querySelector('.device');
let screen = deviceParent.querySelector('.screen');
let screenBg = deviceParent.querySelector('.screen-bg');
let timeline = screen.querySelector('.timeline');

function defaultValueWindow(){
  device.style.height = `${deviceParent.clientHeight}px`;
  screen.style.width = `${device.clientWidth - 20}px`;
  screen.style.height = `${device.clientHeight - 100}px`;
  screenBg.style.width = `${device.clientWidth - 20}px`;
  screenBg.style.height = `${device.clientHeight - 20}px`;
};


function resizeWindow() {
  window.addEventListener("resize", () => {
    device.style.height = `${deviceParent.clientHeight}px`;
    screen.style.width = `${device.clientWidth - 20}px`;
    screen.style.height = `${device.clientHeight - 100}px`;
    screenBg.style.width = `${device.clientWidth - 20}px`;
    screenBg.style.height = `${device.clientHeight - 20}px`;
  })
};

defaultValueWindow();
resizeWindow();

timeline.addEventListener("pointerdown", (event) => {
  timeline.setPointerCapture(event.pointerId);
  setTimelinePos(event);

  timeline.addEventListener("pointermove", setTimelinePos);
  timeline.addEventListener("pointerup", () => {
    timeline.removeEventListener("pointermove", setTimelinePos)
  }, {once: true})
})

function setTimelinePos (event){
  const rect = timeline.getBoundingClientRect();
  timeline.style.setProperty('--handle-position',`${event.offsetX / rect.width * 100}%`)
}










