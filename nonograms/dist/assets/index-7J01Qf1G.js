var O=Object.defineProperty;var G=(o,s,t)=>s in o?O(o,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[s]=t;var i=(o,s,t)=>(G(o,typeof s!="symbol"?s+"":s,t),t);(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&e(c)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function e(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();class l{constructor(s,t,e){this.create(s,t,e)}create(s,t,e){const n=document.createElement(s);Object.keys(e).forEach(a=>{n.setAttribute(a,e[a])}),t&&(n.textContent=t),this.element=n}getElement(){return this.element}setContent(s){this.element.textContent=s}setListeners(s){s.forEach(t=>{this.element.addEventListener(t.event,t.handler)})}mountComponents(s,t="append"){this.element[t](...s.map(e=>e.getElement()))}}const h={fieldChange:"fieldchange",gameStart:"gamestart",gameEnd:"gameend",gameReset:"gamereset",difficultyChange:"difficultychange"};class A{constructor(){i(this,"events",{})}emit(s,...t){const e=this.events[s];e&&e.forEach(n=>n(...t))}on(s,t){this.events[s]||(this.events[s]=[]),this.events[s].push(t)}remove(s,t){const e=this.events[s];e&&(this.events[s]=e.filter(n=>n.name!==t))}}const d=new A,C=()=>Math.floor(Date.now()/1e3),_=o=>`${Math.floor(o/60).toString().padStart(2,"0")}:${(o%60).toString().padStart(2,"0")}`;class m extends l{constructor(t,e){super("button",t,e);i(this,"state",{disabled:!1})}setDisabled(t){this.state.disabled=t,this.element.disabled=t}}const b=()=>({gameActive:!1,nonogram:{},time:0,field:[],horizontalHints:[],verticalHints:[]});class ${constructor(){i(this,"state",b());i(this,"setStateOfCollection",(s,t,e)=>{this.state[s][t]=e})}updateState(s){this.state={...this.state,...s}}setState(s,t){this.state[s]=t}getState(s){return s!==void 0?this.state[s]:this.state}getStore(s){return this[s]}resetState(){this.state=b()}}const r=new $,I={0:"",1:"fill",8:"cross"};class M extends l{constructor(t,e){super("li",t,e);i(this,"state",0);i(this,"disableCell",()=>{this.cellActive=!1});i(this,"reset",()=>{this.setState(0),this.cellActive=!0});this.cellActive=!0,d.on(h.gameEnd,this.disableCell),d.on(h.gameReset,this.reset)}setView(){this.element.dataset.view=I[this.state]}setState(t){this.state=t,r.setStateOfCollection(this.type,this.index,t),this.setView()}}class z extends M{constructor(s){super("",{class:"cell field-cell"}),this.type="field",this.index=s,this.element.dataset.index=s,r.setStateOfCollection(this.type,this.index,this.state)}}class F extends M{constructor(s,t,e){super(e,{class:"cell hint-cell"}),this.type=s,this.index=t,this.element.dataset.index=t,r.setStateOfCollection(this.type,this.index,this.state)}}class k extends l{constructor(s){super("p","",s)}setText(s){this.element.textContent=s}}class P extends l{constructor(){super("div","",{class:"timer"});i(this,"startTime");i(this,"interval");i(this,"startTimer",()=>{this.startTime=C()-r.getState("time"),this.interval||(this.interval=setInterval(()=>{const t=C()-this.startTime;r.setState("time",t),this.element.textContent=_(t),console.log("tick"),console.log("state",r.getState("time"))},1e3))});i(this,"stopTimer",()=>{clearInterval(this.interval),this.interval=0});i(this,"reset",()=>{this.stopTimer(),this.setState(0)});this.setState(0),d.on(h.gameStart,this.startTimer),d.on(h.gameEnd,this.stopTimer),d.on(h.gameReset,this.reset)}setState(t){r.setState("time",t),this.element.textContent=_(t)}}class y extends l{constructor(t){super("li","",{class:t});i(this,"name");i(this,"difficulty");i(this,"time");this.render()}render(){this.name=new l("span","",{class:"result__name"}),this.difficulty=new l("span","",{class:"result__difficulty"}),this.time=new l("span","",{class:"result__time"}),this.mountComponents([this.name,this.difficulty,this.time])}setRow({name:t,difficulty:e,time:n}){this.name.setContent(t),this.difficulty.setContent(e),this.time.setContent(n)}}class L extends l{constructor(t,e){super("div","",{class:"dropdown-btn"});i(this,"handleDropDown",()=>{this.list.open===!0?(this.list.element.classList.remove("dropdown-btn__list_open"),this.list.open=!1):(this.list.open=!0,this.list.element.classList.add("dropdown-btn__list_open"))});i(this,"changeState",(t,e)=>{this.state=t,this.button.setContent(t),this.list.element.classList.remove("dropdown-btn__list_open"),this.list.open=!1,d.emit(this.changeEvent,e)});[this.state]=t,this.changeEvent=e,this.render(t)}render(t){this.button=new m(this.state,{class:"dropdown-btn__btn btn"}),this.list=new l("ul","",{class:"dropdown-btn__list"}),this.renderList(t),this.mountComponents([this.button,this.list])}renderList(t){this.items=t.map(e=>{const n=new l("li",e,{class:"dropdown-btn__item"});return n.state=e,n.setListeners([{event:"click",handler:this.changeState.bind(this,n.state,!0)}]),n}),this.button.setListeners([{event:"click",handler:this.handleDropDown}]),this.list.mountComponents(this.items,"replaceChildren")}getState(){return this.state}}class W extends l{constructor(t,e){super("div","",{class:"game__field"});i(this,"field",[]);this.createFieldBlock(t,e),this.render()}render(){this.field.forEach(t=>{const e=new l("ul","",{class:"cells-wrapper"});t.forEach(n=>e.mountComponents([n])),this.mountComponents([e])})}createFieldBlock(t,e){let n=0;for(let a=0;a<t;a+=1){const c=[];for(let g=0;g<e;g+=1){const u=new z(n);u.setListeners([{event:"click",handler:this.handleClick.bind(u)},{event:"contextmenu",handler:this.handleRightClick.bind(u)}]),c.push(u),n+=1}this.field.push(c)}}handleClick(){this.cellActive&&(r.getState("gameActive")||(d.emit(h.gameStart),r.setState("gameActive",!0)),this.state===1?this.setState(0):this.setState(1),d.emit(h.fieldChange))}handleRightClick(t){t.preventDefault(),this.cellActive&&(this.state===8?this.setState(0):this.setState(8))}setState(t){this.field.flat().forEach((e,n)=>{e.setState(t[n])})}}class B extends l{constructor(t,e){super("div","",{class:`hints hints_${t}`});i(this,"hints",[]);this.type=`${t}Hints`,this.createHintsBlock(e),this.render()}render(){this.hints.forEach(t=>{const e=new l("ul","",{class:"cells-wrapper"});t.forEach(n=>e.mountComponents([n])),this.mountComponents([e])})}createHintsBlock(t){const e=Math.max(...t.map(c=>c.length)),n=e<3?3:e;let a=0;t.forEach(c=>{const g=[];for(let u=0;u<n;u+=1){const T=c[c.length-n+u]||"",x=new F(this.type,a,T);x.setListeners([{event:"click",handler:this.handleClick.bind(x)},{event:"contextmenu",handler:D=>{D.preventDefault()}}]),g.push(x),a+=1}this.hints.push(g)})}handleClick(t){if(!this.cellActive)return;const{target:e}=t;e.textContent&&(this.state===8?this.setState(0):this.setState(8))}setState(t){this.hints.flat().forEach((e,n)=>{e.setState(t[n])})}}class J extends l{constructor(t){super("section","",{class:"game"});i(this,"timer",new P);i(this,"field");i(this,"horizontalHints");i(this,"verticalHints");i(this,"setState",t=>{this.field.setState(t.field),t.time!==void 0&&this.timer.setState(t.time),t.horizontalHints&&this.horizontalHints.setState(t.horizontalHints),t.verticalHints&&this.verticalHints.setState(t.verticalHints)});this.render(t)}render(t){this.field=new W(t.rows,t.cols),this.horizontalHints=new B("horizontal",t.horizontalHints),this.verticalHints=new B("vertical",t.verticalHints),t.cols<=5?this.element.classList.add("game_small"):t.cols<=10&&this.element.classList.add("game_medium"),this.mountComponents([this.field,this.horizontalHints,this.verticalHints,this.timer],"replaceChildren")}}const j=[{id:"001",name:"heart",rows:5,cols:5,scheme:`
    1o,1x,1o,1x,1o,
    5x,
    5x,
    1o,3x,1o,
    2o,1x,2o
    `},{id:"002",name:"camel",rows:5,cols:5,scheme:`
    1o,1x,3o,
    3x,1o,1x,
    4x,1o,
    1x,1o,1x,2o,
    1x,1o,1x,2o
    `},{id:"003",name:"dinosaur",rows:5,cols:5,scheme:`
    3o,2x,
    3o,1x,1o,
    1o,3x,1o,
    1o,3x,1o,
    2x,1o,1x,1o
    `},{id:"004",name:"skull",rows:5,cols:5,scheme:`
    1o,3x,1o,
    5x,
    1x,1o,1x,1o,1x,
    5x,
    1o,1x,1o,1x,1o
    `},{id:"005",name:"snowflake",rows:5,cols:5,scheme:`
    1x,1o,1x,1o,1x,
    1o,3x,1o,
    2x,1o,2x,
    1o,3x,1o,
    1x,1o,1x,1o,1x
    `},{id:"006",name:"",rows:10,cols:10,scheme:""},{id:"007",name:"",rows:10,cols:10,scheme:""},{id:"008",name:"",rows:10,cols:10,scheme:""},{id:"009",name:"",rows:10,cols:10,scheme:""},{id:"010",name:"",rows:10,cols:10,scheme:""},{id:"011",name:"duck",rows:15,cols:15,scheme:`
      4o,4x,7o,
      3o,2x,2o,2x,6o,
      2o,2x,1o,1x,2o,2x,5o,
      4x,5o,1x,1o,2x,2o,
      3o,3x,2o,2x,2o,2x,1o,

      4o,2x,1o,2x,3o,3x,
      3o,2x,1o,2x,3o,4x,
      2o,2x,1o,2x,2o,6x,
      1o,2x,1o,2x,1o,8x,
      2x,1o,12x,

      1x,2o,10x,1o,1x,
      2x,2o,8x,1o,2x,
      1o,2x,2o,6x,1o,2x,1o,
      2o,2x,7o,2x,2o,
      3o,9x,3o
      `},{id:"012",name:"",rows:15,cols:15,scheme:""},{id:"013",name:"",rows:15,cols:15,scheme:""},{id:"014",name:"",rows:15,cols:15,scheme:""},{id:"015",name:"",rows:15,cols:15,scheme:""}],K=o=>Math.floor(Math.random()*o),V=o=>{const s=Array.from(new Array(o[0].length),()=>[]);return o.forEach((t,e)=>{t.forEach((n,a)=>{s[a][e]=n})}),s},q=o=>{const s=o.scheme.split(",").map(e=>e.trim()).map(e=>Array(Number.parseInt(e,10)).fill(e.at(-1)==="x"?1:0)).flat(),t=[];return s.forEach((e,n)=>{const a=Math.floor(n/o.rows);return t[a]||(t[a]=[]),t[a].push(e),t}),t},E=o=>o.map(s=>s.join("").split("0").filter(t=>t.length).map(t=>t.length)),Y=o=>{const s=`${o.cols} x ${o.rows}`,t=q(o),e=E(t),n=E(V(t)),a={...o,difficulty:s,field:t,horizontalHints:e,verticalHints:n};return delete a.scheme,a};class Q{constructor(){i(this,"nonograms",j.filter(s=>s.scheme).map(Y));i(this,"getNonogram",(s="011")=>{const t={...this.nonograms.find(e=>e.id===s)};return delete t.field,t});i(this,"getNonogramList",()=>{const s={};return this.nonograms.forEach(t=>{const{difficulty:e,id:n,name:a}=t;s[e]||(s[e]=[]),s[e].push({id:n,name:a})}),s});i(this,"getSolution",s=>this.nonograms.find(t=>t.id===s).field.flat());i(this,"check",(s,t)=>{const e=this.getSolution(s);return JSON.stringify(e)===JSON.stringify(t)});i(this,"getRandomNonogram",()=>this.getNonogram(this.nonograms[K(this.nonograms.length)].id))}}const f=new Q,w="riariver_nonogram",S="riariver_nonogramResults",v=o=>JSON.parse(localStorage.getItem(o)),R=(o,s)=>localStorage.setItem(o,JSON.stringify(s)),p={saveGame:o=>{R(w,o)},loadGame:()=>v(w),saveResult(o){const s=this.loadResults(S)||[];s.length===5&&s.shift(),s.push(o),R(S,s)},loadResults:()=>v(S),hasSave:()=>!!v(w)};class H extends l{constructor(t){super("dialog","",{class:"modal"});i(this,"show",()=>{this.updateContent&&this.updateContent(),this.element.showModal()});i(this,"close",()=>{this.element.close()});i(this,"closeOnBackdrop",t=>{t.target===this.element&&this.close()});this.render(t)}render(t){const e=new l("div","",{class:"modal__container"}),n=new l("h3",t,{class:"modal__title"});this.modalContent=new l("div","",{class:"modal__content"});const a=new m("Close",{class:"modal__close btn"});this.setListeners([{event:"click",handler:this.closeOnBackdrop}]),a.setListeners([{event:"click",handler:this.close}]),e.mountComponents([n,this.modalContent,a]),this.mountComponents([e])}setContent(t){this.modalContent.mountComponents(t,"replaceChildren")}}class U extends H{constructor(){super("Results"),this.updateContent()}updateContent(){const s=new y("results__header result"),t=p.loadResults()||[];if(t.sort((e,n)=>e.time-n.time),t.length){this.resultRows=[];const e=new l("ul","",{class:"modal__table results"}),n={name:"Name",difficulty:"Difficulty",time:"Time"};s.setRow(n),this.resultRows.push(s),t.forEach(a=>{const c=new y("results__row result");c.setRow(a),this.resultRows.push(c)}),e.mountComponents([...this.resultRows]),this.setContent([e])}else{const e=new k({class:"modal__text"});e.setText("No results yet!"),this.setContent([e])}}}class X extends l{constructor(){super("div","",{class:"select-menu"});i(this,"updateNames",t=>{const e=this.difficultyBtn.getState();this.namesBtn.renderList(this.nonogramList[e].map(n=>n.name)),t&&this.updateName(this.nonogramList[e][0].name)});i(this,"updateSelects",()=>{const{difficulty:t}=r.getState("nonogram");this.difficultyBtn.changeState(t),this.updateName(r.getState("nonogram").name)});i(this,"updateName",t=>{this.namesBtn.changeState(t)});i(this,"getSelected",()=>({difficulty:this.difficultyBtn.getState(),name:this.namesBtn.getState()}));this.nonogramList=r.getStore("nonogramList"),this.render(),d.on(h.difficultyChange,this.updateNames)}render(){this.difficultyBtn=new L(Object.keys(this.nonogramList),h.difficultyChange);const t=this.nonogramList[this.difficultyBtn.getState()].map(e=>e.name);this.namesBtn=new L(t),this.mountComponents([this.difficultyBtn,this.namesBtn])}}class Z extends H{constructor(){super("Great!"),this.updateContent()}updateContent(){this.text=new k({class:"modal__text"}),this.text.setText(`You have solved the nonogram in ${r.getState("time")} seconds!`),this.setContent([this.text])}}const tt=()=>{const o=document.documentElement,{theme:s}=o.dataset;o.dataset.theme=s==="light"?"dark":"light"},et=()=>{const{time:o,nonogram:{name:s,cols:t,rows:e}}=r.getState();p.saveResult({name:s,difficulty:`${t}x${e}`,time:o})};class st extends l{constructor(){super("main","",{class:"main"});i(this,"saveBtn");i(this,"loadBtn");i(this,"winModal");i(this,"gameContainer");i(this,"resetGame",()=>{r.setState("gameActive",!1),this.saveBtn.setDisabled(!1),this.selectMenu.updateSelects()});i(this,"saveGame",()=>{p.saveGame(r.getState()),this.loadBtn.setDisabled(!1)});i(this,"loadGame",()=>{const{nonogram:{id:t},...e}=p.loadGame(),n=f.getNonogram(t);r.setState("nonogram",n),d.emit(h.gameReset),this.selectMenu.updateSelects(),this.gameContainer.render(n),this.gameContainer.setState(e)});i(this,"showSolution",()=>{d.emit(h.gameEnd),this.selectMenu.updateSelects();const t=f.getSolution(r.getState("nonogram").id);this.gameContainer.setState({field:t})});i(this,"startGame",(t,e)=>{this.saveBtn.setDisabled(!1),d.emit(h.gameReset);const n=e?f.getNonogram(e):f.getRandomNonogram();r.resetState(),r.setState("nonogram",n),this.selectMenu.updateSelects(),this.gameContainer.render(n)});i(this,"checkSolution",()=>{const{nonogram:{id:t},field:e}=r.getState(),n=e.map(c=>c!==1?0:c);f.check(t,n)&&(d.emit(h.gameEnd),this.winModal.show(),et())});i(this,"endGame",()=>{this.saveBtn.setDisabled(!0),r.setState("gameActive",!1)});i(this,"getSelectedId",()=>{const t=r.getStore("nonogramList"),{difficulty:e,name:n}=this.selectMenu.getSelected();return t[e].find(a=>a.name===n).id});r.nonogramList=f.getNonogramList(),this.render(),d.on(h.gameEnd,this.endGame),d.on(h.gameReset,this.resetGame),d.on(h.fieldChange,this.checkSolution)}render(){this.renderHeader(),this.renderSelectMenu(),r.setState("nonogram",f.getNonogram(this.getSelectedId())),this.renderControlMenu(),this.winModal=new Z;const t=r.getState("nonogram");this.gameContainer=new J(t),this.mountComponents([this.gameContainer,this.winModal])}renderHeader(){const t=new l("header","",{class:"header"}),e=new l("h1","Nonograms",{class:"header__title"}),n=new m("Theme",{class:"btn btn_theme"}),a=new m("Results",{class:"btn results"}),c=new U;n.setListeners([{event:"click",handler:tt}]),a.setListeners([{event:"click",handler:c.show}]),t.mountComponents([e,n,a]),this.mountComponents([c,t])}renderSelectMenu(){this.selectMenu=new X,this.selectBtn=new m("Select",{class:"btn btn_select"});const t=new m("Random",{class:"btn btn_random"});this.selectBtn.setListeners([{event:"click",handler:e=>{this.startGame(e,this.getSelectedId())}}]),t.setListeners([{event:"click",handler:this.startGame}]),this.selectMenu.mountComponents([this.selectBtn,t]),this.mountComponents([this.selectMenu])}renderControlMenu(){const t=new l("div","",{class:"control-menu"}),e=new m("Reset",{class:"btn btn_reset"});this.saveBtn=new m("Save",{class:"btn btn_save"}),this.loadBtn=new m("Load",{class:"btn btn_load"});const n=new m("Solution",{class:"btn btn_solution"});e.setListeners([{event:"click",handler:()=>{d.emit(h.gameReset)}}]),this.saveBtn.setListeners([{event:"click",handler:this.saveGame}]),this.loadBtn.setDisabled(!p.hasSave()),this.loadBtn.setListeners([{event:"click",handler:this.loadGame}]),n.setListeners([{event:"click",handler:this.showSolution}]),t.mountComponents([this.saveBtn,this.loadBtn,e,n]),this.mountComponents([t])}}const N=new l("div","",{id:"app"});N.mountComponents([new st]);document.body.append(N.getElement());