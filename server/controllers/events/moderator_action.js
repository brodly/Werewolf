/* eslint-disable no-multi-spaces */
/* eslint-disable switch-colon-spacing */
const controller = require('../');

module.exports = (io, action) => {
  switch (action) {
    case 'start timer'  : controller.Events.StartTimer(io); break;
    case 'stop timer'   : controller.Events.StopTimer(io); break;
    case 'reset timer'  : controller.Events.ResetTimer(io); break;
    case 'next round'   : controller.Events.NextRound(io); break;
    case 'tally'        : controller.Events.TallyAllActions(io); break;
    default             : console.log(`'${action}' does not exist`);
  }
};
