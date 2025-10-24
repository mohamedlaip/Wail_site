// ===== helpers =====
const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));

// update year
document.getElementById('year').textContent = new Date().getFullYear();

// ===== particles background =====
(function particlesInit(){
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w=canvas.width=window.innerWidth, h=canvas.height=window.innerHeight;
  window.addEventListener('resize',()=>{w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight;});

  const colors = ['#006233','#ffffff','#d60000'];
  const count = Math.floor((w*h)/45000);
  const parts = [];
  for(let i=0;i<count;i++){
    parts.push({
      x: Math.random()*w,
      y: Math.random()*h,
      r: 0.7+Math.random()*2.6,
      vx: (Math.random()-0.5)*0.3,
      vy: -0.1 - Math.random()*0.6,
      col: colors[Math.floor(Math.random()*colors.length)],
      alpha: 0.2+Math.random()*0.8
    });
  }

  function draw(){
    ctx.clearRect(0,0,w,h);
    parts.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if(p.y < -10) { p.y = h + 10; p.x = Math.random()*w; }
      if(p.x < -20) p.x = w + 20;
      if(p.x > w +20) p.x = -20;
      ctx.beginPath();
      ctx.fillStyle = p.col;
      ctx.globalAlpha = p.alpha;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();

// ===== flag overlay (crescent + star) =====
(function drawFlag(){
  const c = document.getElementById('flagOverlay');
  const ctx = c.getContext('2d');
  function resize(){ c.width = window.innerWidth; c.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);

  let t = 0;
  function loop(){
    const W = c.width, H = c.height;
    ctx.clearRect(0,0,W,H);

    // flag positioned center-left
    const cx = Math.min(220, W*0.28);
    const cy = H*0.28;
    const h = Math.min(220, W*0.35);
    const w = h*1.5;

    // half green, half white rectangle (subtle, low opacity)
    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = '#006233';
    ctx.fillRect(cx - w/2, cy - h/2, w/2, h);
    ctx.fillStyle = '#fff';
    ctx.fillRect(cx, cy - h/2, w/2, h);
    ctx.restore();

    // crescent
    const crescentR = h*0.28;
    ctx.save();
    ctx.translate(cx + 10, cy);
    ctx.rotate(Math.sin(t*0.7)*0.06);
    ctx.beginPath();
    ctx.fillStyle = '#d60000';
    ctx.arc(0,0,crecentR, -0.6*Math.PI, 0.6*Math.PI, false);
    ctx.fill();

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(8,0,crecentR*0.7, -0.6*Math.PI, 0.6*Math.PI, false);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    ctx.restore();

    // star (5-point)
    ctx.save();
    ctx.translate(cx + 28, cy);
    ctx.rotate(t*0.6);
    ctx.fillStyle = '#d60000';
    const R = h*0.11;
    ctx.beginPath();
    for(let i=0;i<5;i++){
      ctx.lineTo(Math.cos((18+i*72)/180*Math.PI)*R, -Math.sin((18+i*72)/180*Math.PI)*R);
      ctx.lineTo(Math.cos((54+i*72)/180*Math.PI)*(R*0.5), -Math.sin((54+i*72)/180*Math.PI)*(R*0.5));
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    t += 0.02;
    requestAnimationFrame(loop);
  }
  loop();
})();

// ===== scroll reveal =====
(function scrollReveal(){
  const reveals = qsa('.reveal');
  function check(){
    const H = window.innerHeight;
    reveals.forEach(el=>{
      const r = el.getBoundingClientRect();
      if(r.top < H - 80) el.classList.add('visible');
    });
  }
  window.addEventListener('scroll', check);
  window.addEventListener('resize', check);
  window.addEventListener('load', check);
  check();
})();

// ===== gallery swipe/keyboard support (mobile friendly) =====
(function galleryNav(){
  const track = document.getElementById('galleryTrack');
  let isDown=false, startX=0, scrollLeft=0;
  track.addEventListener('pointerdown', e=>{
    isDown=true; startX=e.clientX; scrollLeft=track.scrollLeft; track.setPointerCapture(e.pointerId);
  });
  track.addEventListener('pointermove', e=>{
    if(!isDown) return;
    const dx = (startX - e.clientX);
    track.scrollLeft = scrollLeft + dx;
  });
  track.addEventListener('pointerup', e=>{ isDown=false; try{track.releasePointerCapture(e.pointerId)}catch(e){} });
  track.addEventListener('pointerleave', ()=>{ isDown=false; });

  // keyboard arrows
  track.addEventListener('keydown', e=>{
    if(e.key === 'ArrowLeft') track.scrollBy({left:-300,behavior:'smooth'});
    if(e.key === 'ArrowRight') track.scrollBy({left:300,behavior:'smooth'});
  });
})();