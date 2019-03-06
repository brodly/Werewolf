/* eslint-disable key-spacing */
/*
  Defines role information --
  role: internal name for role, used by server/client
  title: String which displays the name of the role on components
  actions: Array which holds strings for role specific actions
*/

module.exports = {
  moderator: {
    role:    'moderator',
    title:   'Moderator',
    actions: ['Start Timer', 'Next Round', 'Tally'],
  },
  villager: {
    role:    'villager',
    title:   'Villager',
    actions: ['Kill'],
  },
  wolf: {
    role:    'wolf',
    title:   'Wolf',
    actions: ['Kill'],
  },
  seer: {
    role:    'seer',
    title:   'Seer',
    actions: ['Reveal'],
  },
  doctor: {
    role:    'doctor',
    title:   'Doctor',
    actions: ['Save'],
  },
};
