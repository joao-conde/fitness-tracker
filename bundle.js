var l=class extends Chart{constructor({canvasId:o,datasets:t,scales:s}){let r=document.getElementById(o).getContext("2d"),n={type:"line",options:{plugins:{legend:{display:!1}},scales:{x:s.x,y:s.y}},data:{datasets:t}};super(r,n);this._originalDatasets=t}filter(o){this.data.datasets=this._originalDatasets.filter(t=>t.label?.includes(o)),this.update()}};var g=class extends l{constructor({canvasId:a,datasets:o}){super({canvasId:a,datasets:o,scales:g.SCALES})}},p=g;p.SCALES={x:{title:{display:!0,text:"Date"},type:"time",time:{unit:"day",tooltipFormat:"DD/MM/YYYY",displayFormats:{day:"DD/MM/YYYY"}}},y:{title:{display:!0,text:"Total Load (all sets sum of weights * repetitions)"},beginAtZero:!0}};var x=class extends l{constructor({canvasId:a,datasets:o}){super({canvasId:a,datasets:o,scales:x.SCALES})}},d=x;d.SCALES={x:{title:{display:!0,text:"Date"},type:"time",time:{unit:"day",tooltipFormat:"DD/MM/YYYY",displayFormats:{day:"DD/MM/YYYY"}}},y:{title:{display:!0,text:"Repetitions"},beginAtZero:!0}};var L=class extends l{constructor({canvasId:a,datasets:o}){super({canvasId:a,datasets:o,scales:L.SCALES})}},u=L;u.SCALES={x:{type:"time",time:{unit:"day",tooltipFormat:"DD/MM/YYYY",displayFormats:{day:"DD/MM/YYYY"}},title:{display:!0,text:"Date"}},y:{title:{display:!0,text:"Weight (kg)"},beginAtZero:!0}};function c({rows:i,label:a,x:o,y:t}){let s=i.reduce((r,n)=>{let m=n[a],M=n[o],O=n[t];return r[m]||(r[m]={label:m,data:[]}),r[m].data.push({x:M,y:O}),r},{});return Object.values(s)}function f(i){let a=i.reduce((t,s)=>{let e=s.date;t[e]||(t[e]={});let r=s.exercise;return t[e][r]||(t[e][r]={...s,weight:-1/0}),s.weight>=t[e][r].weight&&(t[e][r]=s),t},{});return Object.keys(a).flatMap(t=>Object.values(a[t]))}function C(i){let a=i.reduce((t,s)=>{let e=s.date;t[e]||(t[e]={});let r=s.exercise;return t[e][r]||(t[e][r]={load:0,...s}),t[e][r].load+=s.weight*s.volume,t},{});return Object.keys(a).flatMap(t=>Object.values(a[t]))}function b(i){let a=i.reduce((t,s)=>{let e=s.date;return t[e]||(t[e]={load:0,...s}),t[e].load+=s.weight*s.volume,t},{});return Object.values(a)}var R=["bench","squat","deadlift","pull up","bicep","tricep"],E=["decline","bodyweight","close grip","assisted","cable","rope tricep pushdown"],D=50;function v({rows:i,label:a,minFrequency:o}){let s=c({rows:i,label:a,x:"date",y:"weight"}).reduce((e,r)=>(e[r.label]=r.data.length,e),{});return i.filter(e=>s[e[a]]>=o)}function S({rows:i,label:a,includes:o=[],excludes:t=[]}){return i.filter(s=>o.some(e=>s[a].toString().includes(e))&&t.every(e=>!s[a].toString().includes(e)))}function A(i){i=v({rows:i,label:"exercise",minFrequency:D}),i=S({rows:i,label:"exercise",includes:R,excludes:E});let a=f(i),o=c({rows:a,label:"exercise",x:"date",y:"weight"}),t=c({rows:a,label:"exercise",x:"date",y:"volume"}),s=c({rows:C(i),label:"exercise",x:"date",y:"load"}),e=c({rows:b(i),label:"date",x:"date",y:"load"});return{labels:i.map(r=>r.exercise),weights:o,volumes:t,exercisesLoad:s,workoutLoad:e}}var h=class{constructor({selectId:a,options:o,onChange:t}){let s=document.getElementById(a);s.onchange=r=>t(r.target.value);let e=document.createElement("option");e.value="",e.textContent="(no filter)",s.appendChild(e),[...new Set(o)].sort().forEach(r=>{let n=document.createElement("option");n.value=r,n.textContent=r,s.appendChild(n)})}};var w=class{constructor(a,o=";"){this._rows=this.buildRows(a,o)}rows(){return this._rows}buildRows(a,o){let t=a.split(`
`),s=t[0].split(o);return t.slice(1).map(r=>this.buildRow(s,r,o))}buildRow(a,o,t){let s=o.split(t),e={};for(let r=0;r<a.length;r++){let n=w.HEADERS_MAP[a[r]];n&&(e[n]=this.sanitizeValue(s[r]))}return e}sanitizeValue(a){return a.trim().replaceAll('"',"").toLowerCase()}},y=w;y.HEADERS_MAP={Date:"date","Exercise Name":"exercise",Weight:"weight",Reps:"volume"};async function Y(i){return await(await fetch(i)).text()}async function I(){let i=await Y("data/workouts.csv"),o=new y(i).rows(),t=A(o),s=new u({canvasId:"heaviest-sets-weight-chart",datasets:t.weights}),e=new d({canvasId:"heaviest-sets-volume-chart",datasets:t.volumes}),r=new p({canvasId:"exercises-load-chart",datasets:t.exercisesLoad});new p({canvasId:"workout-load-chart",datasets:t.workoutLoad}),new h({selectId:"exercises-filter",options:t.labels,onChange:n=>{s.filter(n),e.filter(n),r.filter(n)}})}document.addEventListener("DOMContentLoaded",async()=>await I());
