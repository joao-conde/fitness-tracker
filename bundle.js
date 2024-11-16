var l=class extends Chart{constructor({canvasId:o,datasets:t,scales:s}){let a=document.getElementById(o)?.getContext("2d");if(!a)throw Error("no context");let n={type:"line",options:{plugins:{legend:{display:!1}},scales:{x:s.x,y:s.y}},data:{datasets:t}};super(a,n);this._originalDatasets=t}filter(o){this.data.datasets=this._originalDatasets.filter(t=>t.label?.includes(o)),this.update()}};var m=class extends l{constructor({canvasId:e,datasets:o}){super({canvasId:e,datasets:o,scales:m.SCALES})}},d=m;d.SCALES={x:{title:{display:!0,text:"Date"},type:"time",time:{unit:"day",tooltipFormat:"DD/MM/YYYY",displayFormats:{day:"DD/MM/YYYY"}}},y:{title:{display:!0,text:"Total Load (all sets sum of weights * repetitions)"},beginAtZero:!0}};var h=class extends l{constructor({canvasId:e,datasets:o}){super({canvasId:e,datasets:o,scales:h.SCALES})}},u=h;u.SCALES={x:{title:{display:!0,text:"Date"},type:"time",time:{unit:"day",tooltipFormat:"DD/MM/YYYY",displayFormats:{day:"DD/MM/YYYY"}}},y:{title:{display:!0,text:"Repetitions"},beginAtZero:!0}};var x=class extends l{constructor({canvasId:e,datasets:o}){super({canvasId:e,datasets:o,scales:x.SCALES})}},p=x;p.SCALES={x:{type:"time",time:{unit:"day",tooltipFormat:"DD/MM/YYYY",displayFormats:{day:"DD/MM/YYYY"}},title:{display:!0,text:"Date"}},y:{title:{display:!0,text:"Weight (kg)"},beginAtZero:!0}};function c({rows:i,label:e,x:o,y:t}){let s=i.reduce((a,n)=>(a[n[e]]||(a[n[e]]={label:n[e],data:[]}),a[n[e]].data.push({x:n[o],y:n[t]}),a),{});return Object.values(s)}function w(i){let e=i.reduce((t,s)=>{let r=s.date;t[r]||(t[r]={});let a=s.exercise;return t[r][a]||(t[r][a]={...s,weight:-1/0}),s.weight>=t[r][a].weight&&(t[r][a]=s),t},{});return Object.keys(e).flatMap(t=>Object.values(e[t]))}function C(i){let e=i.reduce((t,s)=>{let r=s.date;t[r]||(t[r]={});let a=s.exercise;return t[r][a]||(t[r][a]={load:0,...s}),t[r][a].load+=s.weight*s.volume,t},{});return Object.keys(e).flatMap(t=>Object.values(e[t]))}function L(i){let e=i.reduce((t,s)=>{let r=s.date;return t[r]||(t[r]={load:0,...s}),t[r].load+=s.weight*s.volume,t},{});return Object.values(e)}var E=["bench","squat","deadlift","pull up","bicep","tricep"],b=["decline","bodyweight","close grip","assisted","cable","rope tricep pushdown"],R=50;function v({rows:i,label:e,minFrequency:o}){let s=c({rows:i,label:e,x:"date",y:"weight"}).reduce((r,a)=>(r[a.label]=a.data.length,r),{});return i.filter(r=>s[r[e]]>=o)}function S({rows:i,label:e,includes:o=[],excludes:t=[]}){return i.filter(s=>o.some(r=>s[e].toString().includes(r))&&t.every(r=>!s[e].toString().includes(r)))}function D(i){i=v({rows:i,label:"exercise",minFrequency:R}),i=S({rows:i,label:"exercise",includes:E,excludes:b});let e=w(i),o=c({rows:e,label:"exercise",x:"date",y:"weight"}),t=c({rows:e,label:"exercise",x:"date",y:"volume"}),s=c({rows:C(i),label:"exercise",x:"date",y:"load"}),r=c({rows:L(i),label:"date",x:"date",y:"load"});return{labels:i.map(a=>a.exercise),weights:o,volumes:t,exercisesLoad:s,workoutLoad:r}}var g=class{constructor({selectId:e,options:o,onChange:t}){let s=document.getElementById(e);if(!s)return;s.onchange=a=>t(a.target.value);let r=document.createElement("option");r.value="",r.textContent="",s.appendChild(r),[...new Set(o)].sort().forEach(a=>{let n=document.createElement("option");n.value=a,n.textContent=a,s.appendChild(n)})}};var f=class{constructor(e,o=";"){this._rows=this.buildRows(e,o)}rows(){return this._rows}buildRows(e,o){let t=e.split(`
`),s=t[0].split(o);return t.slice(1).map(a=>this.buildRow(s,a,o))}buildRow(e,o,t){let s=o.split(t),r={};for(let a=0;a<e.length;a++){let n=f.HEADERS_MAP[e[a]];n&&(r[n]=this.sanitizeValue(s[a]))}return r}sanitizeValue(e){return e.trim().replaceAll('"',"").toLowerCase()}},y=f;y.HEADERS_MAP={Date:"date","Exercise Name":"exercise",Weight:"weight",Reps:"volume"};async function A(i){return await(await fetch(i)).text()}async function Y(){let i=await A("data/workouts.csv"),o=new y(i).rows(),t=D(o),s=new p({canvasId:"heaviest-sets-weight-chart",datasets:t.weights}),r=new u({canvasId:"heaviest-sets-volume-chart",datasets:t.volumes}),a=new d({canvasId:"exercises-load-chart",datasets:t.exercisesLoad});new d({canvasId:"workout-load-chart",datasets:t.workoutLoad}),new g({selectId:"exercises-filter",options:t.labels,onChange:n=>{s.filter(n),r.filter(n),a.filter(n)}})}document.addEventListener("DOMContentLoaded",async()=>await Y());
