/* eslint-disable no-multi-spaces */
/* eslint-disable switch-colon-spacing */
const controller = require('../');

module.exports = (io, action) => {
  switch (action) {
    case 'start timer' : controller.Events.StartTimer(io); break;
    case 'next round'  : controller.Events.NextRound(io); break;
    case 'toggle night': controller.Events.ToggleNight(io); break;
    default: console.log(`'${action}' does not exist`);
  }
};
