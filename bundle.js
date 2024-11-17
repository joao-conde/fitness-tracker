var l=class extends Chart{constructor({canvasId:o,datasets:e,scales:a}){let s=document.getElementById(o).getContext("2d"),n={type:"line",options:{plugins:{legend:{display:!1}},scales:{x:a.x,y:a.y}},data:{datasets:e}};super(s,n);this._originalDatasets=e}filter(o){this.data.datasets=this._originalDatasets.filter(e=>e.label?.includes(o)),this.update()}};var x=class extends l{constructor({canvasId:r,datasets:o}){super({canvasId:r,datasets:o,scales:x.SCALES})}},c=x;c.SCALES={x:{title:{display:!0,text:"Date"},type:"time",time:{unit:"day",tooltipFormat:"DD/MM/YYYY",displayFormats:{day:"DD/MM/YYYY"}}},y:{title:{display:!0,text:"Total Load (all sets sum of weights * repetitions)"},beginAtZero:!0}};var g=class extends l{constructor({canvasId:r,datasets:o}){super({canvasId:r,datasets:o,scales:g.SCALES})}},d=g;d.SCALES={x:{title:{display:!0,text:"Date"},type:"time",time:{unit:"day",tooltipFormat:"DD/MM/YYYY",displayFormats:{day:"DD/MM/YYYY"}}},y:{title:{display:!0,text:"Repetitions"},beginAtZero:!0}};var L=class extends l{constructor({canvasId:r,datasets:o}){super({canvasId:r,datasets:o,scales:L.SCALES})}},u=L;u.SCALES={x:{type:"time",time:{unit:"day",tooltipFormat:"DD/MM/YYYY",displayFormats:{day:"DD/MM/YYYY"}},title:{display:!0,text:"Date"}},y:{title:{display:!0,text:"Weight (kg)"},beginAtZero:!0}};function p({rows:i,label:r,x:o,y:e}){let a=i.reduce((s,n)=>{let m=n[r],M=n[o],O=n[e];return s[m]||(s[m]={label:m,data:[]}),s[m].data.push({x:M,y:O}),s},{});return Object.values(a)}function C(i){let r=i.reduce((e,a)=>{let t=a.date;e[t]||(e[t]={});let s=a.exercise;return e[t][s]||(e[t][s]={...a,weight:-1/0}),a.weight>=e[t][s].weight&&(e[t][s]=a),e},{});return Object.keys(r).flatMap(e=>Object.values(r[e]))}function w(i){let r=i.reduce((e,a)=>{let t=a.date;e[t]||(e[t]={});let s=a.exercise;return e[t][s]||(e[t][s]={load:0,...a}),e[t][s].load+=a.weight*a.volume,e},{});return Object.keys(r).flatMap(e=>Object.values(r[e]))}function b(i){let r=i.reduce((e,a)=>{let t=a.date;return e[t]||(e[t]={load:0,...a}),e[t].load+=a.weight*a.volume,e},{});return Object.values(r)}var E=["bench","squat","deadlift","pull up","bicep","tricep"],R=["decline","bodyweight","close grip","assisted","cable","rope tricep pushdown"],D=50;function S({rows:i,label:r,minFrequency:o}){let a=p({rows:i,label:r,x:"date",y:"weight"}).reduce((t,s)=>(t[s.label]=s.data.length,t),{});return i.filter(t=>a[t[r]]>=o)}function v({rows:i,label:r,includes:o=[],excludes:e=[]}){return i.filter(a=>o.some(t=>a[r].toString().includes(t))&&e.every(t=>!a[r].toString().includes(t)))}function A(i){i=S({rows:i,label:"exercise",minFrequency:D}),i=v({rows:i,label:"exercise",includes:E,excludes:R});let r=C(i),o=p({rows:r,label:"exercise",x:"date",y:"weight"}),e=p({rows:r,label:"exercise",x:"date",y:"volume"}),a=p({rows:w(i),label:"exercise",x:"date",y:"load"}),t=p({rows:b(i),label:"date",x:"date",y:"load"});return{labels:i.map(s=>s.exercise),weights:o,volumes:e,exercisesLoad:a,workoutLoad:t}}var h=class{constructor({selectId:r,options:o,onChange:e}){let a=document.getElementById(r);a.onchange=s=>e(s.target.value);let t=document.createElement("option");t.value="",t.textContent="(no filter)",a.appendChild(t),[...new Set(o)].sort().forEach(s=>{let n=document.createElement("option");n.value=s,n.textContent=s,a.appendChild(n)})}};var f=class{parse(r){let o=r.split(`
`),e=o[0].split(";");return o.slice(1).map(t=>this.buildRow(e,t,";"))}buildRow(r,o,e){let a=o.split(e),t={};for(let s=0;s<r.length;s++){let n=f.HEADERS_MAP[r[s]];n&&(t[n]=this.sanitizeValue(a[s]))}return t}sanitizeValue(r){return r.trim().replaceAll('"',"").toLowerCase()}},y=f;y.HEADERS_MAP={Date:"date","Exercise Name":"exercise",Weight:"weight",Reps:"volume"};async function Y(i){return await(await fetch(i)).text()}async function I(){let i=await Y("data/workouts.csv"),o=new y().parse(i),e=A(o),a=new u({canvasId:"heaviest-sets-weight-chart",datasets:e.weights}),t=new d({canvasId:"heaviest-sets-volume-chart",datasets:e.volumes}),s=new c({canvasId:"exercises-load-chart",datasets:e.exercisesLoad});new c({canvasId:"workout-load-chart",datasets:e.workoutLoad}),new h({selectId:"exercises-filter",options:e.labels,onChange:n=>{a.filter(n),t.filter(n),s.filter(n)}})}document.addEventListener("DOMContentLoaded",async()=>await I());
