function PlaySound(soundobj) {
  var thissound = document.getElementById(soundobj);
  console.log("hover");
  thissound.play();
}

function StopSound(soundobj) {
  var thissound = document.getElementById(soundobj);
  thissound.pause();
  thissound.currentTime = 0;
}

function PlaySong(song) {
  var thissound = document.getElementById(song);
  var allAudios = document.getElementsByTagName("audio");

  if (thissound.currentTime > 0) {
    thissound.pause();
    thissound.currentTime = 0;
  } else {
    for (var i = 0; i < allAudios.length; i++) {
      allAudios[i].pause();
      allAudios[i].currentTime = 0;
    }
    thissound.play();
  }
}
