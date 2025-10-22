window.onload
{
  dailyAffirmation();

}
// export
let currentDate = new Date();
// userdata
let streak = 0;
let dailyjournal = "Placeholder"
let victoryletter = ""
let userrelapse= ""
let readonly = true;
let catcher = ""
let hidden = false;
let prevjourn = catcher;

let goals = [
]
let badges = [
  dayone = false,
  oneweek = false,
  month = false,
  threemonth  = false,
  sixmonth =false,
  year = false,

]

let mood = [
  meh = false,
  happy = false,
  sad = false,
  angry = false,
]
function streakcheck()
{
  if (streak == 1) {
    alert("The first step is always the hardest. Pat yourself on the back for giving this new lifestyle a go.")
  }
  else if (streak == 7) {
    alert("Great job, keep going.")
  }
  else if (streak == 30) {

    alert("You've made it to one month. Good on you! Reflect on your progress! Pretty hard right??? ")
  }
  else if (streak == 90) {
    enableEditVic();
    alert("This is a huge milestone. By now, you should be able to manage yourself in a healthy manner. keep going!")
  }
  else if (streak == 180) {

    alert("You've checked in for six months?????")
  }
  else if (streak == 360) {
   
    alert("Absolute Chad. Congratulations for making it to one year!")
  }
  
}

function letter()
{}


function checkbadges() {
  let badgeText = "";

  if (streak >= 1) {
    dayone = true;
    badgeText += "🏅 Day One Badge<br>";
  }
  if (streak >= 7) {
    oneweek = true;
    badgeText += "🥉 One Week Badge<br>";
    
  }
   if (streak >= 30) {
    month = true;
    badgeText += "🥈 One Month Badge<br>";
  }
   if (streak >= 90) {
    threemonth = true;
    badgeText += "🥇 Three Month Badge<br>";
    enableEditVic();
  }
   if (streak >= 180) {
    sixmonth = true;
    badgeText += "🏆 Six Month Badge<br>";
    
  }
   if (streak >= 360) {
    year = true;
    badgeText += "🎖️ One Year Badge<br>";
  }

  // Display badges under Victory Wall
  document.getElementById("badgeDisplay").innerHTML = badgeText;
}

function displayGoals() {
  const goalList = document.getElementById("goalList");
  goalList.innerHTML = ""; // clear existing goals

  if (!goals || goals.length === 0) {
    goalList.innerHTML = "<li>No goals added yet.</li>";
    return;
  }

  goals.forEach((goalText, index) => {
    const li = document.createElement("li");
    li.textContent = goalText; // show the goal text

    goalList.appendChild(li);
  });
}


function importUserData() {
  const fileInput = document.getElementById("importFile");
  const file = fileInput.files[0];

  if (!file) {
    alert("No file selected.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const lines = e.target.result.split("\n");

    lines.forEach(line => {
      const [key, value] = line.split("=");
      if (!key || value === undefined) return;

      switch (key.trim()) {
        case "streak":
          streak = parseInt(value) || 0;
          break;
        case "dailyjournal":
          dailyjournal = value || "";
          break;
        case "victoryletter":
          victoryletter = value || "";
          if(hidden == true)
          break;
        case "lastreplase":
          userrelapse = value || "N/A";
          break;
        case "readonly":
          readonly = value.trim() === "true";
          break;
        case "catcher":
          catcher = value || "";
          prevjourn = catcher;
          break;
        case "hidden":
          hidden = value.trim() === "true";
          break;
        case "goals":
        goals = value ? value.split("|").filter(g => g.trim() !== "") : [];
        break;
        case "badges":
          try {
            badges = JSON.parse(value);
          } catch {
            badges = [];
          }
          break;
      }
    });
    // ✅ Update UI elements after import
    updateUI();

    alert("Data imported successfully and everything updated! Please check in!");
  };

  reader.readAsText(file);
}


function prevEntry()
{
  if(prevjourn !== dailyjournal){
        alert("Previous journal:\n\n" + prevjourn);
    }
}

function saveJournal() {
  catcher = dailyjournal;
  prevjourn = dailyjournal;

  var dailyjournalsave = document.getElementById("Daily")
  var dailyjournalcontent = dailyjournalsave.value;

  dailyjournal = dailyjournalcontent;
  console.log(dailyjournalcontent + " " + dailyjournalsave)
}

function saveVictory()
{
  var viclet = document.getElementById("victor")
  var vicletcon = viclet.value;
    victoryletter = vicletcon;
    console.log(viclet + " " + vicletcon)

    alert("Victory journal saved:\n" + victoryletter);

}

function UpdateDaily()
{
    streak = streak + 1;
    document.getElementById('streak').textContent = `You've checked in for ${streak} Days!`;

}
function RemoveDaily()
{
  if (streak > 0)
    streak = streak - 1;
    document.getElementById('streak').textContent = `You've checked in for ${streak} Days!`;
}

function relapseButton()
{
  relapse = currentDate;
  userrelapse = currentDate;
  document.getElementById('relapselast').textContent = `Your last relapse was on ${relapse}. Hang in there champ.`;

}
  
function exportUserData() {
  const plainText = 
    `streak=${streak}\n` +
    `dailyjournal=${dailyjournal}\n` +
    `victoryletter=${victoryletter}\n` +
    `lastreplase=${userrelapse} \n` +
    `readonly=${readonly} \n` +
    `catcher=${catcher} \n` +
    `hidden=${hidden} \n`+
    `goals=${goals.join('|')}`;
    
    // remember to add in the other vars

  const blob = new Blob([plainText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "journal_export.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
  alert("Data has been exported, check your downloads folder & keep this in a safe place")
}

function disableEditJourn() {
  document.getElementById('Daily').readOnly = true;
}
function enableEditJourn() {
  document.getElementById('Daily').readOnly = false;
}
function enableEditVic() {
  document.getElementById("victor").readOnly = false;
  document.getElementById("victor").hidden = false;
  hidden = false;
}

function disableEditVic() {
  document.getElementById("victor").readOnly = true;
  document.getElementById("victor").hidden = true
  hidden = true
}

  function addGoal() {
    const input = document.getElementById("goalInput");
    const goalText = input.value.trim();
    if (goalText === "") return;
    goals.push(goalText);

    const list = document.getElementById("goalList");
    const item = document.createElement("li");

    // Create goal text span
    const goalSpan = document.createElement("span");
    goalSpan.textContent = goalText;

    // Create Complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✓ Complete";
    completeBtn.onclick = function () {
      goalSpan.style.textDecoration = "line-through";
      goalSpan.style.opacity = "0.6";
    };

    // Create Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "🗑 Remove";
    removeBtn.onclick = function () {
      list.removeChild(item);
    };

    // Style buttons inline
    completeBtn.style.marginLeft = "10px";
    removeBtn.style.marginLeft = "6px";

    item.appendChild(goalSpan);
    item.appendChild(completeBtn);
    item.appendChild(removeBtn);
    list.appendChild(item);

    input.value = "";
  }


function updateUI() {
  // 🧠 Update text content and inputs
  document.getElementById("Daily").value = dailyjournal || "";
  document.getElementById("victor").value = victoryletter || "";
  document.getElementById("streak").textContent = "Days Checked In: " + (streak || 0);
  document.getElementById("relapselast").textContent = "Last Relapse: " + (userrelapse || "N/A");

  // 🧩 Apply readOnly and hidden states
  document.getElementById("Daily").readOnly = readonly;
  document.getElementById("victor").readOnly = readonly;
  document.getElementById("victor").hidden = hidden === true;

  // 🎯 Refresh goal list
// 🎯 Refresh goal list
const goalList = document.getElementById("goalList");
if (goalList) {
  goalList.innerHTML = "";

  goals.forEach((goalText, index) => { // capture index
    const item = document.createElement("li");

    // Create goal text span
    const goalSpan = document.createElement("span");
    goalSpan.textContent = goalText;

    // Create Complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✓ Complete";
    completeBtn.onclick = function () {
      goalSpan.style.textDecoration = "line-through";
      goalSpan.style.opacity = "0.6";
      // Optional: mark as completed in array (if you want)
      // could add a separate array or flag if needed
    };

    // Create Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "🗑 Remove";
    removeBtn.onclick = function () {
      goals.splice(index, 1);  // remove the correct element from array
      updateUI();              // re-render the list
    };

    // Style buttons inline
    completeBtn.style.marginLeft = "10px";
    removeBtn.style.marginLeft = "6px";

    item.appendChild(goalSpan);
    item.appendChild(completeBtn);
    item.appendChild(removeBtn);
    goalList.appendChild(item);
  });
}



  // 🏅 Refresh badges display
  checkbadges();
}
function sendPositiveMessage() {
  const messages = [
    "You're stronger than your urges — keep going!",
    "Every step forward counts. Be proud of your progress.",
    "You are not alone. Healing is possible.",
    "Your worth is not defined by your struggles.",
    "Progress, not perfection. You're doing great.",
    "You have the power to choose a better path.",
    "This moment is a chance to grow. You've got this.",
    "Your future is brighter than your past.",
    "You are resilient, capable, and worthy of love.",
    "Small victories lead to big change. Celebrate them!",
    "You are capable of amazing things.",
  "Believe in yourself and all that you are.",
  "Every day is a new beginning.",
  "You are stronger than you think.",
  "Keep going — you’re doing great!",
  "Your potential is endless.",
  "Small steps every day lead to big results.",
  "You are enough, just as you are.",
  "The best is yet to come.",
  "Stay positive, work hard, and make it happen.",
  "You make a difference in the world.",
  "Focus on progress, not perfection.",
  "Choose joy every single day.",
  "Be proud of how far you’ve come.",
  "You are worthy of love and happiness.",
  "Good things are coming your way.",
  "Your mindset determines your success.",
  "Keep smiling — it looks good on you!",
  "Every challenge is an opportunity to grow.",
  "Your hard work is paying off.",
  "You have what it takes to succeed.",
  "Stay patient — your time is coming.",
  "The world needs your light.",
  "Don’t be afraid to shine.",
  "Success starts with believing you can.",
  "You’re doing better than you think.",
  "Gratitude turns what we have into enough.",
  "Your kindness makes the world brighter.",
  "Dream big and dare to fail.",
  "You are unstoppable when you believe in yourself.",
  "Take a deep breath — you’ve got this.",
  "Even the smallest step forward is progress.",
  "Let go of doubt and trust yourself.",
  "Every mistake is a lesson in disguise.",
  "Be the reason someone smiles today.",
  "Your positivity is contagious.",
  "Great things never come from comfort zones.",
  "Keep your face toward the sunshine.",
  "Believe you can, and you’re halfway there.",
  "You deserve all the good things coming your way."
  
  ];

  const randomIndex = Math.floor(Math.random() * messages.length);
  alert(messages[randomIndex]);
}

function dailyAffirmation()
  {
    const progressAffirmations = [
  "You’re growing every day.",
  "Progress is your priority.",
  "You move forward with purpose.",
  "Small steps lead to big change.",
  "Be proud of your effort.",
  "You improve with each try.",
  "You’re becoming your best self.",
  "Every challenge teaches you something.",
  "You’re consistent and committed.",
  "Trust the process — it’s working.",
  "Embrace growth.",
  "Welcome new lessons.",
  "Be open to change.",
  "You evolve with grace.",
  "Mistakes are part of mastery.",
  "Stay curious — you’re capable.",
  "You adapt and thrive.",
  "You’re a lifelong learner.",
  "Stretch beyond comfort.",
  "Growth comes through action.",
  "You’re driven by progress.",
  "You take action daily.",
  "Stay focused and determined.",
  "Keep showing up.",
  "You’re unstoppable.",
  "Momentum is building.",
  "Your goals energize you.",
  "Push past limits.",
  "Rise with resilience.",
  "You’re making it happen.",
  "Believe in your journey.",
  "You’re capable of great things.",
  "Trust yourself.",
  "You’re worthy of success.",
  "You are enough.",
  "Be confident in your path.",
  "You’re strong and steady.",
  "Be proud of who you’re becoming.",
  "You’re aligned with your purpose.",
  "Your progress matters.",
  "Welcome today with hope.",
  "Choose progress over perfection.",
  "Celebrate small wins.",
  "Be present and powerful.",
  "Radiate positivity.",
  "Be grateful for growth.",
  "Honor your journey.",
  "Find peace in progress.",
  "Move forward with joy.",
  "You’re becoming more every day."
];
  const randomIndex = Math.floor(Math.random() * progressAffirmations.length);
  alert(progressAffirmations[randomIndex]);
} 