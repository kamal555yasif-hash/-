const up=document.getElementById('up');addEventListener('scroll',()=>up.classList.toggle('on',scrollY>400),{passive:true});up.onclick=()=>scrollTo({top:0,behavior:'smooth'});
