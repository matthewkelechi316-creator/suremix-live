const $=id=>document.getElementById(id);
let state={preview:1,program:1,black:false,overlay:null,levels:{master:80,mic:75,music:60}};
const names={1:"Camera 1",2:"Camera 2",3:"Camera 3",4:"Media Player"};
function save(){localStorage.setItem("suremix-state",JSON.stringify(state))}
function load(){try{const s=JSON.parse(localStorage.getItem("suremix-state"));if(s)state={...state,...s}}catch(e){}}
function toast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),1900)}
function render(){
 $("previewName").textContent=names[state.preview];$("programName").textContent=state.black?"BLACK":names[state.program];
 $("programScreen").style.background=state.black?"#000":"linear-gradient(135deg,#182c3b,#101722 60%,#1a2935)";
 document.querySelectorAll(".source-chip").forEach(b=>b.classList.toggle("active",Number(b.dataset.source)===state.preview));
 document.querySelectorAll(".input-tile").forEach(b=>b.classList.toggle("active",Number(b.dataset.source)===state.preview));
 const ov=$("programOverlay");ov.classList.toggle("show",!!state.overlay&&!state.black);
 if(state.overlay){ov.innerHTML=`<strong>${escapeHtml(state.overlay.title)}</strong><small>${escapeHtml(state.overlay.body)}</small>`}
 ["master","mic","music"].forEach(k=>{ $(k).value=state.levels[k];$(k+"Val").textContent=state.levels[k]+"%"});
 save();
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function choose(n){state.preview=n;state.black=false;render()}
function switchProgram(){state.program=state.preview;state.black=false;render();toast("Program switched")}
function makeInputs(){
 const holder=$("sourceButtons"),grid=$("inputGrid");
 [1,2,3,4].forEach(n=>{
  const b=document.createElement("button");b.className="source-chip";b.dataset.source=n;b.textContent=""+n;b.title=names[n];b.onclick=()=>choose(n);holder.appendChild(b);
  const tile=document.createElement("button");tile.className="input-tile";tile.dataset.source=n;tile.innerHTML=`<span class="num">INPUT 0${n}</span><b>${names[n]}</b><small>${n===4?"Media / graphics":"Camera source slot"}</small>`;tile.onclick=()=>choose(n);grid.appendChild(tile);
 });
}
$("cutBtn").onclick=switchProgram;
$("fadeBtn").onclick=()=>{switchProgram();$("programScreen").animate([{opacity:.25},{opacity:1}],{duration:450});toast("Fade transition simulated")};
$("blackBtn").onclick=()=>{state.black=!state.black;render();toast(state.black?"Output is black":"Program restored")};
["master","mic","music"].forEach(k=>$(k).addEventListener("input",e=>{state.levels[k]=Number(e.target.value);$(k+"Val").textContent=e.target.value+"%";save()}));
$("showGraphic").onclick=()=>{const title=$("graphicTitle").value.trim(),body=$("graphicBody").value.trim();if(!title&&!body){toast("Enter some text first");return}state.overlay={type:$("graphicType").value,title:title||"Church Media",body};render();toast("Graphic shown on program preview")};
$("hideGraphic").onclick=()=>{state.overlay=null;render();toast("Graphic hidden")};
document.querySelectorAll(".scene").forEach(b=>b.onclick=()=>{const s=b.dataset.scene;const setups={Worship:{source:2,type:"lyrics",title:"WORSHIP",body:"Let everything that has breath praise the Lord."},Sermon:{source:1,type:"lower",title:"THE WORD",body:"Sunday Message"},Announcement:{source:4,type:"notice",title:"CHURCH ANNOUNCEMENT",body:"Please take note of the announcements."},Prayer:{source:3,type:"verse",title:"PRAYER SESSION",body:"Pray without ceasing. — 1 Thessalonians 5:17"}};const x=setups[s];choose(x.source);$("graphicType").value=x.type;$("graphicTitle").value=x.title;$("graphicBody").value=x.body;state.overlay={type:x.type,title:x.title,body:x.body};render();$("sceneMessage").textContent=s+" scene loaded. Press CUT to take the selected source to program.";toast(s+" scene loaded")});
load();makeInputs();render();
if("serviceWorker" in navigator && location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}))}
let deferredPrompt=null;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;$("installBtn").classList.remove("hidden")});
$("installBtn").onclick=async()=>{if(!deferredPrompt){toast("Use browser menu → Add to Home screen");return}deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$("installBtn").classList.add("hidden")};
if(window.matchMedia("(display-mode: standalone)").matches){$("installBtn").classList.add("hidden")}
