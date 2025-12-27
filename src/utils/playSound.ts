const basePath = "/drums";
const tr808 = new Map([
  ["fist", "/808/Clap.mp3"],
  ["four_fingers_up", "/808/Snare.mp3"],
  ["l", "/808/Closed Hat.mp3"],
  ["ok", "/808/Rim Shot.mp3"],
  ["open_palm", "/808/Clave.mp3"],
  ["rock_with_closed_finger", "/808/Cowbell.mp3"],
  ["three_fingers_up", "/808/Open Hat.mp3"],
  ["victory", "/808/Kick.mp3"],
  
  // default model
  ["Open_Palm", "/808/Clap.mp3"],
  ["ILoveYou", "/808/Snare.mp3"],
  ["Pointing_Up", "/808/Closed Hat.mp3"],
  ["Thumb_Down", "/808/Rim Shot.mp3"],
  ["Thumb_Up", "/808/Clave.mp3"],
  // ["rock_with_closed_finger", "/808/Cowbell.mp3"],
  // ["three_fingers_up", "/808/Open Hat.mp3"],
  ["Victory", "/808/Kick.mp3"],
]);
const tr909 = new Map([
  ["fist", "/909/Clap.mp3"],
  ["four_fingers_up", "/909/Snare.mp3"],
  ["l", "/909/Closed Hat.mp3"],
  ["ok", "/909/Rim Shot.mp3"],
  ["open_palm", "/909/Low Tom.mp3"],
  ["rock_with_closed_finger", "/909/High Tom.mp3"],
  ["three_fingers_up", "/909/Open Hat.mp3"],
  ["victory", "/909/Kick.mp3"],

  // default model
  ["Open_Palm", "/909/Clap.mp3"],
  ["ILoveYou", "/909/Snare.mp3"],
  ["Pointing_Up", "/909/Closed Hat.mp3"],
  ["Thumb_Down", "/909/Rim Shot.mp3"],
  ["Thumb_Up", "/909/High Tom.mp3"],
  // ["rock_with_closed_finger", "/808/Cowbell.mp3"],
  // ["three_fingers_up", "/808/Open Hat.mp3"],
  ["Victory", "/909/Kick.mp3"],
]);

export default function playSound(label: string, drumkit: string) {
  let sound: HTMLAudioElement | null = null;

  if (drumkit === '808') {
    sound = new Audio(basePath + tr808.get(label));
  } else {
    sound = new Audio(basePath + tr909.get(label))
  }

  if (sound) {
    sound.play();
    sound.currentTime = 0;
  }
}
