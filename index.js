let hoursOpt = document.getElementById("hours");
let minsOpt = document.getElementById("minutes");

for (let i = 1; i <= 12; i++) {
  let h = document.createElement("option");
  if (i < 10) {
    h.value = "0" + i;
  } else {
    h.value = i;
  }
  h.innerHTML = i;
  hoursOpt.appendChild(h);
}

for (let j = 0; j < 60; j++) {
  let m = document.createElement("option");
  if (j < 10) {
    m.value = "0" + j;
  } else {
    m.value = j;
  }
  m.innerHTML = j;
  minsOpt.appendChild(m);
}

// Our clock setup

let display = document.getElementsByTagName("h1")[0];
let value1, value2;
[value1, value2] = getCurrentTime();
display.innerHTML = value1;
setInterval(() => {
  [value1, value2] = getCurrentTime();
  display.innerHTML = value1;
  display.id = value2;
}, 1000);

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  val1 = `${formattedHours} : ${formattedMinutes} : ${formattedSeconds} ${ampm}`;
  val2 = `${formattedHours} : ${formattedMinutes} : ${formattedSeconds} : ${ampm}`;
  return [val1, val2];
}

// our alarm setup

let setBtn = document.getElementsByTagName("button")[0];
let clearBtn = document.getElementsByTagName("button")[1];
let hrs = document.getElementById("hours");
let mins = document.getElementById("minutes");
let am_pm = document.getElementById("am_pm");
let errorMsg = document.getElementsByTagName("p")[0];
let select = document.querySelectorAll("select");
let set = document.getElementsByClassName(".set-time")[0];
let displayArray, userArray, intv;
let clockImg = document.getElementsByTagName("img")[0];
let audio = document.getElementsByTagName("audio")[0];

setBtn.addEventListener("click", () => {
  if (hrs.value == "" || mins.value == "" || am_pm.value == "") {
    errorMsg.style.display = "flex";
    errorMsg.innerHTML = "...";
    setTimeout(() => {
      errorMsg.innerHTML = `<ion-icon name="warning"></ion-icon> Please try again !`;
    }, 300);
  } else {
    errorMsg.style.display = "none";
    setBtn.style.display = "none";
    clearBtn.style.display = "block";
    alarm();
  }
});

clearBtn.addEventListener("click", () => {
  newSetup();
});

const newSetup = () => {
  audio.pause();
  clockImg.classList.remove("alarm-img");
  clearInterval(intv);
  for (const k of select) {
    k.disabled = false;
  }
  clearBtn.style.display = "none";
  setBtn.style.display = "block";
  hrs.value = "";
  mins.value = "";
  am_pm.value = "";
};

const alarm = () => {
  for (const k of select) {
    k.disabled = true;
  }
  userArray = (hrs.value + " : " + mins.value + " : " + am_pm.value).split(
    " : "
  );
  intv = setInterval(() => {
    displayArray = display.id.split(" : ");
    if (
      displayArray[0] == userArray[0] &&
      displayArray[1] == userArray[1] &&
      displayArray[3] == userArray[2]
    ) {
      audio.play();
      clockImg.classList.add("alarm-img");
      clearInterval(intv);
    }
  }, 1000);
};
