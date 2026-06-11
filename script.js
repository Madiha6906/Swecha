// =========================
// THE 12TH MAN
// script.js
// =========================

// Game Data

const players = [
{
id:1,
name:"Aarav",
bat:80,
bowl:70,
fitness:75
},
{
id:2,
name:"Rohan",
bat:90,
bowl:60,
fitness:80
},
{
id:3,
name:"Ayaan",
bat:75,
bowl:85,
fitness:82
},
{
id:4,
name:"Vivek",
bat:88,
bowl:78,
fitness:74
},
{
id:5,
name:"Kabir",
bat:82,
bowl:72,
fitness:77
},
{
id:6,
name:"Sameer",
bat:78,
bowl:88,
fitness:79
},
{
id:7,
name:"Dev",
bat:85,
bowl:65,
fitness:90
},
{
id:8,
name:"Ishaan",
bat:70,
bowl:80,
fitness:86
},
{
id:9,
name:"Nikhil",
bat:76,
bowl:81,
fitness:74
},
{
id:10,
name:"Rajat",
bat:91,
bowl:67,
fitness:72
},
{
id:11,
name:"Anil",
bat:68,
bowl:88,
fitness:85
},
{
id:12,
name:"Karan",
bat:83,
bowl:76,
fitness:80
},
{
id:13,
name:"Milan",
bat:79,
bowl:83,
fitness:78
},
{
id:14,
name:"Sahil",
bat:86,
bowl:69,
fitness:84
},
{
id:15,
name:"Tariq",
bat:72,
bowl:87,
fitness:81
}
];

// Calculate totals

players.forEach(p=>{
p.total=p.bat+p.bowl+p.fitness;
});

// Game State

let score=0;
let fairness=100;
let selectedPlayers=[];

const screen=document.getElementById("gameScreen");

// Update Fairness Meter

function updateMeter(){

document.getElementById("meterFill").style.width=fairness+"%";

document.getElementById("meterText").innerHTML=
fairness+"%";

}

// Load Template

function loadTemplate(id){

const temp=document.getElementById(id);

screen.innerHTML=temp.innerHTML;

}

// Start

window.onload=function(){

loadTemplate("startTemplate");

updateMeter();

}

// Story

function showStory(){

loadTemplate("storyTemplate");

}

// Player Trials

function showTrials(){

loadTemplate("trialTemplate");

loadTrialTable();

}

function showAnnouncement(){

loadTemplate("announcementTemplate");

const list = document.getElementById("announcementList");

const sorted = [...players].sort((a, b) => b.total - a.total);

const selectedIds = new Set(sorted.slice(0, 11).map(p => p.id));

list.innerHTML = players.map(player => {

    const mark = selectedIds.has(player.id) ? " ✅" : "";

    return `<li>${player.name}${mark}</li>`;

}).join("");

}

function showSelectorsReason(){

loadTemplate("selectorsTemplate");

}

function showDiscriminationReveal(){

loadTemplate("discriminationTemplate");

}

function showFairSelectionIntro(){

loadTemplate("selectionTemplate");

loadPlayers();

}

// Load Trial Table

function loadTrialTable(){

const body=document.getElementById("trialTable");

body.innerHTML="";

players.forEach(player=>{

body.innerHTML+=`

<tr>

<td>${player.name}</td>

<td>${player.bat}</td>

<td>${player.bowl}</td>

<td>${player.fitness}</td>

<td>${player.total}</td>

</tr>

`;

});

}
// ==========================
// TEAM SELECTION
// ==========================

function showSelection() {

    loadTemplate("selectionTemplate");

    loadPlayers();

}

function loadPlayers() {

    const list = document.getElementById("playerList");

    list.innerHTML = "";

    players.forEach(player => {

        list.innerHTML += `

        <div class="playerCard">

            <label>

            <input
            type="checkbox"
            value="${player.id}"
            class="playerCheck">

            <h3>${player.name}</h3>

            ⭐ Total : ${player.total}

            <br>

            🏏 Batting : ${player.bat}

            <br>

            🎯 Bowling : ${player.bowl}

            <br>

            💪 Fitness : ${player.fitness}

            </label>

        </div>

        `;

    });

}

// ==========================
// SUBMIT TEAM
// ==========================

function submitSelection() {

    selectedPlayers = [];

    const checks = document.querySelectorAll(".playerCheck");

    checks.forEach(box => {

        if (box.checked) {

            selectedPlayers.push(parseInt(box.value));

        }

    });

    if (selectedPlayers.length != 11) {

        alert("Please select exactly 11 players.");

        return;

    }

    evaluateSelection();

}

// ==========================
// FAIRNESS CHECK
// ==========================

function evaluateSelection() {

    let sorted = [...players];

    sorted.sort((a, b) => b.total - a.total);

    const bestPlayers = sorted.slice(0, 11).map(player => player.id);

    let fair = true;

    bestPlayers.forEach(id => {

        if (!selectedPlayers.includes(id)) {

            fair = false;

        }

    });

    if (fair) {

        recordFairChoice();

        recordMatch(true);

        score += 10;

        fairness = 100;

        updateMeter();

        showFairScene();

    }

    else {

        recordBiasedChoice();

        recordMatch(false);

        score -= 5;

        fairness = 40;

        updateMeter();

        showPrejudice();

    }

}

// ==========================
// FAIR SCENE
// ==========================

function showFairScene() {

    loadTemplate("messageTemplate");

    document.getElementById("messageTitle").innerHTML =
    "😊 Fair Choice";

    document.getElementById("messageEmoji").innerHTML =
    "🏆";

    document.getElementById("messageText").innerHTML =

    "Great job! You selected players based on their performance and gave everyone a fair opportunity.";

    window.nextStep = function () {

        simulateMatch(true);

    };

}

// ==========================
// PREJUDICE SCENE
// ==========================

function showPrejudice() {

    loadTemplate("messageTemplate");

    document.getElementById("messageTitle").innerHTML =
    "🤔 Prejudice";

    document.getElementById("messageEmoji").innerHTML =
    "😟";

    document.getElementById("messageText").innerHTML =

    "Maybe we should choose someone we already know... This is called prejudice because the decision was based on assumptions instead of performance.";

    window.nextStep = function () {

        showDiscrimination();

    };

}

// ==========================
// DISCRIMINATION SCENE
// ==========================

function showDiscrimination() {

    loadTemplate("messageTemplate");

    document.getElementById("messageTitle").innerHTML =
    "😢 Discrimination";

    document.getElementById("messageEmoji").innerHTML =
    "🙍";

    document.getElementById("messageText").innerHTML =

    "\"My scores were better... Why wasn't I selected?\"";

    window.nextStep = function () {

        simulateMatch(false);

    };

}
// ==========================
// MATCH SIMULATION
// ==========================

function simulateMatch(isFair){

loadTemplate("messageTemplate");

if(isFair){

document.getElementById("messageTitle").innerHTML=
"🏏 Match Simulation";

document.getElementById("messageEmoji").innerHTML=
"🏆🎉";

document.getElementById("messageText").innerHTML=

`
Your team showed excellent teamwork!

✅ Strong batting

✅ Amazing bowling

✅ Brilliant catches

🎉 The crowd cheers!

🏆 Your team wins the match.
`;

window.nextStep=function(){

showAnalysis(true);

};

}

else{

document.getElementById("messageTitle").innerHTML=
"🏏 Match Simulation";

document.getElementById("messageEmoji").innerHTML=
"😢";

document.getElementById("messageText").innerHTML=

`
❌ Weak batting

❌ Dropped catches

❌ Poor teamwork

😞 The team loses the match.

Unfair choices hurt everyone.
`;

window.nextStep=function(){

showAnalysis(false);

};

}

}

// ==========================
// CONSEQUENCE ANALYSIS
// ==========================

function showAnalysis(isFair){

loadTemplate("analysisTemplate");

const result=document.getElementById(
"analysisResult"
);

const actionBtn = document.querySelector("#gameScreen button");

const selectedNames = selectedPlayers
    .map(id => players.find(p => p.id === id).name)
    .join(", ");

const rejectedNames = players
    .filter(p => !selectedPlayers.includes(p.id))
    .map(p => p.name)
    .join(", ");

if(isFair){

result.innerHTML=`

<h3 style="margin-top:20px">

❤️ Fairness Score : 100%

</h3>

<p>

Selected players (${selectedPlayers.length}):<br>
${selectedNames.split(', ').join('<br>')}

</p>

<p>

Rejected players (${players.length - selectedPlayers.length}):<br>
${rejectedNames.split(', ').join('<br>')}

</p>

<p>

Your fair team performed well and won the match.

</p>

`;

actionBtn.innerHTML = "▶ Continue";

actionBtn.onclick = showReward;

}

else{

result.innerHTML=`

<h3 style="margin-top:20px">

💔 Fairness Score : 40%

</h3>

<p>

Selected players (${selectedPlayers.length}):<br>
${selectedNames.split(', ').join('<br>')}

</p>

<p>

Rejected players (${players.length - selectedPlayers.length}):<br>
${rejectedNames.split(', ').join('<br>')}

</p>

<p>

Some better players were left out and the team lost because of unfair choices.

</p>

`;

actionBtn.innerHTML = "▶ Correct the Decision";

actionBtn.onclick = showFairSelectionIntro;

}

updateDashboard();

}

// ==========================
// RESTORE EQUALITY
// ==========================

function restoreEquality(){

fairness=100;

score+=5;

updateMeter();

loadTemplate("messageTemplate");

document.getElementById("messageTitle").innerHTML=
"😊 Equality Restored";

document.getElementById("messageEmoji").innerHTML=
"🤝";

document.getElementById("messageText").innerHTML=

`
You can choose the team fairly again.

Try including the best player this time.
`;

window.nextStep=function(){

showFairSelectionIntro();

};

}

// ==========================
// REWARD SCREEN
// ==========================

function showReward(){

loadTemplate("rewardTemplate");

score+=10;

}

// ==========================
// SUMMARY
// ==========================

function showSummary(){

loadTemplate("summaryTemplate");

}

// ==========================
// PLAY AGAIN
// ==========================

function restartGame(){

score=0;

fairness=100;

selectedPlayers=[];

updateMeter();

loadTemplate("startTemplate");

}

// ======================================
// PART 4
// SCORE • BADGES • ANALYTICS • EFFECTS
// ======================================

// Game Statistics

let gameStats = {

    fairSelections: 0,

    biasedSelections: 0,

    matchesWon: 0,

    matchesLost: 0,

    badges: []

};

// ----------------------------
// Update Dashboard
// ----------------------------

function updateDashboard(){

    const analysis =
    document.getElementById("analysisResult");

    if(!analysis) return;

    analysis.innerHTML += `

    <hr>

    <h3>📊 Game Statistics</h3>

    <p>⭐ Score : ${score}</p>

    <p>❤️ Fairness : ${fairness}%</p>

    <p>✅ Fair Choices : ${gameStats.fairSelections}</p>

    <p>❌ Biased Choices : ${gameStats.biasedSelections}</p>

    <p>🏆 Wins : ${gameStats.matchesWon}</p>

    <p>😢 Losses : ${gameStats.matchesLost}</p>

    `;

}

// ----------------------------
// Record Fair Choice
// ----------------------------

function recordFairChoice(){

    gameStats.fairSelections++;

}

// ----------------------------
// Record Biased Choice
// ----------------------------

function recordBiasedChoice(){

    gameStats.biasedSelections++;

}

// ----------------------------
// Record Match Result
// ----------------------------

function recordMatch(win){

    if(win){

        gameStats.matchesWon++;

    }

    else{

        gameStats.matchesLost++;

    }

}

// ----------------------------
// Award Badges
// ----------------------------

function awardBadges(){

    gameStats.badges=[];

    if(fairness>=90){

        gameStats.badges.push("🏆 Fair Player");

    }

    if(score>=10){

        gameStats.badges.push("⭐ Equality Hero");

    }

    if(gameStats.matchesWon>=1){

        gameStats.badges.push("🎖 Team Builder");

    }

}

// ----------------------------
// Display Badges
// ----------------------------

function displayBadges(){

    const rewards=
    document.querySelector(".rewards");

    if(!rewards) return;

    rewards.innerHTML="";

    gameStats.badges.forEach(badge=>{

        rewards.innerHTML+=`

        <div class="reward">

        ${badge}

        </div>

        `;

    });

}

// ----------------------------
// Celebrate Animation
// ----------------------------

function celebrate(){

    const emojis=[
    "⭐",
    "🏆",
    "🎉",
    "✨"
    ];

    for(let i=0;i<20;i++){

        let span=
        document.createElement("span");

        span.innerHTML=
        emojis[Math.floor(
        Math.random()*emojis.length)];

        span.style.position="fixed";

        span.style.left=
        Math.random()*100+"vw";

        span.style.top="-20px";

        span.style.fontSize="30px";

        span.style.transition="3s";

        document.body.appendChild(span);

        setTimeout(()=>{

            span.style.top="100vh";

        },100);

        setTimeout(()=>{

            span.remove();

        },3200);

    }

}

// ----------------------------
// Progress Level
// ----------------------------

function playerLevel(){

    if(fairness>=90){

        return "🏆 Fair Player";

    }

    if(fairness>=70){

        return "😊 Helpful Player";

    }

    if(fairness>=50){

        return "🙂 Learning Player";

    }

    return "😟 Biased Player";

}

// ----------------------------
// Show Final Report
// ----------------------------

function showFinalReport(){

    loadTemplate("messageTemplate");

    document.getElementById(
    "messageTitle"
    ).innerHTML="📜 Final Report";

    document.getElementById(
    "messageEmoji"
    ).innerHTML="🏏";

    document.getElementById(
    "messageText"
    ).innerHTML=`

    Final Score : ${score}

    <br><br>

    Fairness : ${fairness}%

    <br><br>

    Level : ${playerLevel()}

    <br><br>

    Remember:

    Everyone deserves a fair opportunity.

    `;

    celebrate();

}

// ----------------------------
// Reset Statistics
// ----------------------------

function resetStats(){

    score=0;

    fairness=100;

    selectedPlayers=[];

    gameStats.fairSelections=0;

    gameStats.biasedSelections=0;

    gameStats.matchesWon=0;

    gameStats.matchesLost=0;

    gameStats.badges=[];

    updateMeter();

}
// =======================================
// PART 5
// SOUND • COMMENTARY • ANIMATIONS
// FINAL INITIALIZATION
// =======================================

// -----------------------------
// Audio System
// -----------------------------

let soundEnabled = true;

const sounds = {

    cheer: new Audio("assets/sounds/cheer.mp3"),

    bat: new Audio("assets/sounds/bat.mp3"),

    reward: new Audio("assets/sounds/reward.mp3")

};

function playSound(type){

    if(!soundEnabled) return;

    if(sounds[type]){

        sounds[type].currentTime = 0;

        sounds[type].play();

    }

}

// -----------------------------
// Sound Button
// -----------------------------

const soundBtn = document.getElementById("soundBtn");

if(soundBtn){

soundBtn.addEventListener("click",()=>{

soundEnabled = !soundEnabled;

soundBtn.innerHTML = soundEnabled ?

"🔊 Sound ON"

:

"🔇 Sound OFF";

});

}

// -----------------------------
// Commentator Messages
// -----------------------------

const commentary=[

"🎤 Welcome everyone to today's match!",

"🏏 Amazing batting performance!",

"👏 Excellent teamwork!",

"⭐ Fair choices build strong teams!",

"🎉 The crowd is cheering!",

"❤️ Equality makes everyone stronger!"

];

function randomCommentary(){

return commentary[

Math.floor(

Math.random()*commentary.length

)

];

}

// -----------------------------
// Live Commentary
// -----------------------------

function showCommentary(){

const area=document.getElementById(

"analysisResult"

);

if(!area) return;

const msg=document.createElement("p");

msg.innerHTML=randomCommentary();

area.appendChild(msg);

}

// -----------------------------
// Fairness Meter Color
// -----------------------------

function updateMeterColor(){

const fill=document.getElementById(

"meterFill"

);

if(!fill) return;

if(fairness>=90){

fill.style.background="#4CAF50";

}

else if(fairness>=70){

fill.style.background="#FFD54F";

}

else{

fill.style.background="#FF7043";

}

}

// -----------------------------
// Star Animation
// -----------------------------

function createStar(){

const star=document.createElement("div");

star.innerHTML="⭐";

star.style.position="fixed";

star.style.left=Math.random()*100+"vw";

star.style.top="-20px";

star.style.fontSize="28px";

star.style.transition="4s linear";

document.body.appendChild(star);

setTimeout(()=>{

star.style.top="100vh";

},100);

setTimeout(()=>{

star.remove();

},4200);

}

function rewardAnimation(){

for(let i=0;i<25;i++){

setTimeout(()=>{

createStar();

},i*120);

}

playSound("reward");

}

// -----------------------------
// Match Animation
// -----------------------------

function matchAnimation(){

const area=document.getElementById(

"messageEmoji"

);

if(!area) return;

const frames=[

"🏏",

"🏏⚾",

"🏏💥",

"🏆"

];

let i=0;

const interval=setInterval(()=>{

area.innerHTML=frames[i];

i++;

if(i>=frames.length){

clearInterval(interval);

}

},500);

}

// -----------------------------
// Loading Screen
// -----------------------------

function loadingScreen(nextFunction){

screen.innerHTML=

`

<section class="screen">

<h2>

⏳ Loading Match...

</h2>

<div style="font-size:80px">

🏏

</div>

<p>

Players are warming up...

</p>

</section>

`;

setTimeout(()=>{

nextFunction();

},2000);

}

// -----------------------------
// Complete Reward
// -----------------------------

function completeReward(){

awardBadges();

displayBadges();

rewardAnimation();

}

// -----------------------------
// Game End
// -----------------------------

function finishGame(){

completeReward();

showFinalReport();

}

// -----------------------------
// Initialize Game
// -----------------------------

function initializeGame(){

score=0;

fairness=100;

selectedPlayers=[];

updateMeter();

updateMeterColor();

}
