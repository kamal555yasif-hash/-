(()=>{
const g=id=>document.getElementById(id),TAU=Math.PI*2,rnd=(a,b)=>Math.random()*(b-a)+a;
const cols=['#38d6e8','#a78bfa','#f5bd61','#42d6a4','#ff7185','#638cff','#65c7dc','#ffa66b'];
const extra='Git,GitHub,Docker,Linux,Figma,Jira,Notion,Slack,Teams,Trello,AWS,Azure,Google Cloud,Java,JavaScript,C#,R,PHP,MySQL,PostgreSQL,Oracle,MongoDB,Redis,SAP,Visio,VS Code,Postman,Looker,Snowflake,Spark,Hadoop,Airflow,Jupyter,TensorFlow,Pandas,NumPy,React,Node.js,Kubernetes,Salesforce,Odoo,Zoom,Canva,Photoshop,Wireshark,Power Automate,Confluence,Excel VBA,Kali'.split(',');
const bi=[...tools.map(t=>({k:'t',id:t.id,e:t.logo,c:t.color,n:t.ar,en:t.name})),...jobs.map((j,i)=>({k:'j',id:j.id,e:j.icon,c:cols[i%8],n:j.ar,en:j.name}))];
const flow=[...tools.map(t=>({n:t.name,c:t.color})),...extra.map((n,i)=>({n,c:cols[i%8]})),...jobs.map((j,i)=>({n:j.ar,c:cols[(i+3)%8]}))];
const cv=document.createElement('canvas');cv.id='bhc';document.body.appendChild(cv);
const x=cv.getContext('2d');let W,H,run=false,T=0,boost=1,want=1,mx=0,my=0,last=0,fl=[],st=[],ds=[],cur='t';const LOW=(navigator.hardwareConcurrency||8)<=4||innerWidth<500,DUR=11,B=110,PI=Math.PI;
const mk=s=>{const c=document.createElement('canvas');c.width=c.height=s;return c};
const disk=(()=>{const S=B*9,c=S/2,back=mk(S),front=mk(S),a=back.getContext('2d'),f=front.getContext('2d');
 const gl=a.createRadialGradient(c,c,B,c,c,B*4.4);gl.addColorStop(0,'rgba(255,150,70,.28)');gl.addColorStop(1,'rgba(255,120,40,0)');a.fillStyle=gl;a.fillRect(0,0,S,S);
 for(let i=0;i<24;i++){a.strokeStyle=`rgba(255,${190-i*4},${120-i*3},${.5*Math.pow(1-i/24,2)})`;a.lineWidth=2;a.beginPath();a.arc(c,c,B*(1.04+i*.035),0,TAU);a.stroke()}
 for(let i=0;i<70;i++){const t=i/70,rx=B*(1.15+t*3.2),col=`rgba(255,${230-t*150|0},${200-t*170|0},${.55*Math.pow(1-t,1.4)+.03})`;
  for(const q of[a,f]){q.strokeStyle=col;q.lineWidth=2.2;q.beginPath();q.ellipse(c,c,rx,rx*.13,0,0,q===a?TAU:PI);q.stroke()}}
 for(const q of[a,f]){const d=q.createLinearGradient(0,0,S,0);d.addColorStop(0,'rgba(0,0,0,1)');d.addColorStop(1,'rgba(0,0,0,.35)');q.globalCompositeOperation='destination-in';q.fillStyle=d;q.fillRect(0,0,S,S)}
 return{back,front,S}})();
const fit=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};fit();addEventListener('resize',fit);
const rr=(w,h,r)=>{x.beginPath();x.moveTo(-w/2+r,-h/2);x.arcTo(w/2,-h/2,w/2,h/2,r);x.arcTo(w/2,h/2,-w/2,h/2,r);x.arcTo(-w/2,h/2,-w/2,-h/2,r);x.arcTo(-w/2,-h/2,w/2,-h/2,r);x.closePath()};
function spawn(o,full){const m=Math.min(W,H)/2;o.R=m*rnd(1.6,2.6);o.r=full?o.R*rnd(.3,1):o.R;o.a=rnd(0,TAU);o.v=rnd(.8,1.2);o.ox=o.oy=null;return o}
function init(){x.font='700 15px Cairo,Inter,sans-serif';
 fl=flow.map(f=>{const o=spawn({...f},true);o.w=x.measureText(f.n).width+32;return o});
 st=Array.from({length:LOW?100:220},()=>({a:rnd(0,TAU),r:Math.min(W,H)/2*rnd(.2,3.2),o:rnd(.2,.8)}));
 ds=Array.from({length:LOW?120:280},()=>({a:rnd(0,TAU),r:rnd(1.2,4.2)}))}
function dust(f,cx,cy,sc){x.globalCompositeOperation='lighter';
 for(const d of ds){const s=Math.sin(d.a);if((s>0)!==f)continue;const t=(d.r-1.2)/3;
  x.fillStyle=`rgba(255,${210-t*130|0},${160-t*130|0},${.75-t*.5})`;x.fillRect(cx+Math.cos(d.a)*d.r*B*sc,cy+s*d.r*B*sc*.13,1.7,1.7)}
 x.globalCompositeOperation='source-over'}
function frame(now){if(!run)return;requestAnimationFrame(frame);
 const dt=Math.min((now-last)/1000||.016,.05);last=now;boost+=(want-boost)*Math.min(1,dt*3);T+=dt*boost;
 const p=Math.min(T/DUR,1),m=Math.min(W,H)/2,cx=W/2+mx*m*.12,cy=H/2+my*m*.08,hr=m*(.15+1.6*p**5),sc=hr/B;
 x.globalCompositeOperation='source-over';x.globalAlpha=1;x.fillStyle='#02030a';x.fillRect(0,0,W,H);
 x.lineWidth=1;
 for(const s of st){s.r-=dt*boost*(s.r*.06+6);if(s.r<hr){s.r=m*rnd(2,3.2);s.a=rnd(0,TAU)}
  const c=Math.cos(s.a),n=Math.sin(s.a),k=1+.012*boost;x.strokeStyle=`rgba(200,215,255,${s.o})`;x.beginPath();x.moveTo(cx+c*s.r,cy+n*s.r);x.lineTo(cx+c*s.r*k,cy+n*s.r*k);x.stroke()}
 for(const d of ds)d.a+=dt*boost*.8/Math.pow(d.r,1.5);
 if(sc<8)x.drawImage(disk.back,cx-disk.S*sc/2,cy-disk.S*sc/2,disk.S*sc,disk.S*sc);
 dust(false,cx,cy,sc);
 x.font='700 15px Cairo,Inter,sans-serif';x.textAlign='center';x.textBaseline='middle';
 for(const o of fl){if(o.r<0)continue;
  o.r-=dt*boost*(16+170*Math.pow(m/o.r,2))*o.v;o.a+=dt*boost*.11*Math.pow(m/o.r,1.4)*o.v;
  if(o.r<hr*1.08){if(p<.8)spawn(o,false);else o.r=-1;continue}
  const px=cx+Math.cos(o.a)*o.r,py=cy+Math.sin(o.a)*o.r*.5;
  let ang=o.ox==null?0:Math.atan2(py-o.oy,px-o.ox);if(Math.abs(ang)>PI/2)ang+=PI;o.ox=px;o.oy=py;
  const f=Math.min(1,o.r/(m*1.2)),s=1+2*Math.pow(1-f,2),z=1.05+.35*(1-Math.min(1,o.r/(m*2))),
  al=Math.min(1,(o.r-hr*1.08)/(hr*.9))*Math.min(1,(o.R-o.r)/(m*.4)+.15);
  x.save();x.globalAlpha=Math.max(0,al);x.translate(px,py);x.rotate(ang);x.scale(s*z,z/Math.sqrt(s));
  rr(o.w,32,16);x.fillStyle='rgba(8,16,28,.78)';x.fill();x.strokeStyle=o.c;x.lineWidth=1.3;x.stroke();
  x.fillStyle='#edf5ff';x.fillText(o.n,0,1);x.restore()}
 x.globalAlpha=1;
 x.fillStyle='#000';x.beginPath();x.arc(cx,cy,hr,0,TAU);x.fill();
 if(sc<8)x.drawImage(disk.front,cx-disk.S*sc/2,cy-disk.S*sc/2,disk.S*sc,disk.S*sc);
 dust(true,cx,cy,sc);
 if(p>.85){x.fillStyle=`rgba(2,3,10,${(p-.85)/.15})`;x.fillRect(0,0,W,H)}
 if(p>=1)finish()}
function start(){g('wl').classList.remove('on');cv.style.cssText='opacity:1;pointer-events:auto';
 g('bht').style.opacity=1;g('sk').style.opacity=1;g('sk').style.pointerEvents='auto';
 init();T=0;boost=want=1;run=true;if(matchMedia('(prefers-reduced-motion:reduce)').matches){finish();return}last=performance.now();requestAnimationFrame(frame)}
function finish(){if(!run)return;run=false;cv.style.opacity=0;cv.style.pointerEvents='none';
 g('bht').style.opacity=0;g('sk').style.opacity=0;g('sk').style.pointerEvents='none';g('wl').classList.add('on')}
cv.addEventListener('pointerdown',()=>want=3.5);
['pointerup','pointercancel'].forEach(t=>cv.addEventListener(t,()=>want=1));
cv.addEventListener('pointermove',e=>{mx=e.clientX/W*2-1;my=e.clientY/H*2-1});
g('sk').onclick=finish;
g('wgo').onclick=g('wsk').onclick=()=>{g('wl').classList.remove('on');window.scrollTo(0,0)};
const b=document.createElement('button');b.className='btn ghost';b.id='bh';b.title='ثقب أسود';b.textContent='🕳';b.onclick=start;
document.querySelector('.top-actions').prepend(b);
start();
})();
