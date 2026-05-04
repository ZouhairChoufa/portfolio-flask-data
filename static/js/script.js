/* ═══════════════════════════════════════════════════════════
   Portfolio V2 — Zouhair Choufa — Premium JavaScript
   ═══════════════════════════════════════════════════════════ */

/* ─── 1. Dark / Light Mode ────────────────────────────────── */
(function initTheme() {
  const root   = document.documentElement;
  const saved  = localStorage.getItem('zc-theme') || 'dark';
  root.classList.toggle('dark',  saved === 'dark');
  root.classList.toggle('light', saved === 'light');
})();

function setTheme(mode) {
  const root  = document.documentElement;
  const thumb = document.getElementById('theme-thumb');
  root.classList.toggle('dark',  mode === 'dark');
  root.classList.toggle('light', mode === 'light');
  localStorage.setItem('zc-theme', mode);
  if (thumb) {
    thumb.textContent = mode === 'dark' ? '🌙' : '☀️';
    thumb.style.left  = mode === 'dark' ? '2px' : 'calc(100% - 28px)';
  }
  // Update Three.js background brightness
  if (window._threeScene) window._threeScene.updateTheme(mode);
}

document.getElementById('theme-toggle')?.addEventListener('click', () => {
  const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// Apply thumb position on load
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('zc-theme') || 'dark';
  setTheme(saved);
});

/* ─── 2. AOS Init ─────────────────────────────────────────── */
AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });

/* ─── 3. Navbar scroll ────────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── 4. Mobile menu ──────────────────────────────────────── */
document.getElementById('mobile-toggle')?.addEventListener('click', () => {
  document.getElementById('mobile-menu')?.classList.toggle('hidden');
});
document.querySelectorAll('.mobile-link').forEach(l =>
  l.addEventListener('click', () => document.getElementById('mobile-menu')?.classList.add('hidden'))
);

/* ─── 5. Typed title ──────────────────────────────────────── */
(function typedRole() {
  const roles = [
    'Data Scientist & IA',
    'Développeur Fullstack',
    'Architecte Multi-Agents',
    'Master BI & Big Data Analytics',
    'En stage @ OCP Group',
  ];
  let idx = 0, char = 0, del = false;
  const el = document.getElementById('typed-role');
  if (!el) return;
  function tick() {
    const cur = roles[idx];
    el.textContent = del ? cur.slice(0, --char) : cur.slice(0, ++char);
    let delay = del ? 40 : 90;
    if (!del && char === cur.length) { delay = 2200; del = true; }
    else if (del && char === 0) { del = false; idx = (idx + 1) % roles.length; delay = 400; }
    setTimeout(tick, delay);
  }
  setTimeout(tick, 800);
})();

/* ─── 6. Custom Cursor ────────────────────────────────────── */
(function cursor() {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  let rx = 0, ry = 0;
  window.addEventListener('mousemove', e => {
    dot.style.left  = e.clientX + 'px';
    dot.style.top   = e.clientY + 'px';
    rx += (e.clientX - rx) * .18;
    ry += (e.clientY - ry) * .18;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
  });
  function lerp() { rx += (parseFloat(dot.style.left||0) - rx) * .12; ry += (parseFloat(dot.style.top||0) - ry) * .12; ring.style.left = rx+'px'; ring.style.top = ry+'px'; requestAnimationFrame(lerp); }
  lerp();
})();

/* ─── 7. THREE.JS — Neural Network / Data Cloud ──────────── */
(function initThreeJS() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || !window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
  camera.position.z = 120;

  // ── Colors ──────────────────────────────────────────────
  const COLOR_CYAN   = new THREE.Color(0x00e5ff);
  const COLOR_VIOLET = new THREE.Color(0xb44dff);
  const COLOR_GREEN  = new THREE.Color(0x00ff88);

  // ── Nodes (spheres) ──────────────────────────────────────
  const NODE_COUNT = 90;
  const nodes = [];
  const nodeMeshes = [];

  const nodeGeo = new THREE.SphereGeometry(0.5, 8, 8);

  for (let i = 0; i < NODE_COUNT; i++) {
    const colorPick = [COLOR_CYAN, COLOR_VIOLET, COLOR_GREEN][Math.floor(Math.random() * 3)];
    const mat = new THREE.MeshBasicMaterial({ color: colorPick, transparent: true, opacity: 0.6 });
    const mesh = new THREE.Mesh(nodeGeo, mat);

    const pos = new THREE.Vector3(
      (Math.random() - .5) * 260,
      (Math.random() - .5) * 160,
      (Math.random() - .5) * 120
    );
    mesh.position.copy(pos);
    mesh.scale.setScalar(0.4 + Math.random() * 0.8);

    const vel = new THREE.Vector3(
      (Math.random() - .5) * 0.06,
      (Math.random() - .5) * 0.04,
      (Math.random() - .5) * 0.03
    );

    nodes.push({ mesh, vel, originalPos: pos.clone() });
    nodeMeshes.push(mesh);
    scene.add(mesh);
  }

  // ── Edges (lines between close nodes) ───────────────────
  const MAX_EDGE_DIST = 55;
  const edgeLines = [];

  function buildEdges() {
    edgeLines.forEach(l => scene.remove(l));
    edgeLines.length = 0;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = nodes[i].mesh.position.distanceTo(nodes[j].mesh.position);
        if (d < MAX_EDGE_DIST) {
          const alpha = 1 - d / MAX_EDGE_DIST;
          const geo   = new THREE.BufferGeometry().setFromPoints([
            nodes[i].mesh.position,
            nodes[j].mesh.position,
          ]);
          const mat = new THREE.LineBasicMaterial({
            color: COLOR_CYAN,
            transparent: true,
            opacity: alpha * 0.12,
          });
          const line = new THREE.Line(geo, mat);
          scene.add(line);
          edgeLines.push(line);
        }
      }
    }
  }

  // ── Mouse influence ──────────────────────────────────────
  const mouse = new THREE.Vector2(0, 0);
  window.addEventListener('mousemove', e => {
    mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  // ── Resize ───────────────────────────────────────────────
  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // ── Theme toggle ─────────────────────────────────────────
  function updateTheme(mode) {
    const opacity = mode === 'light' ? 0.25 : 0.85;
    canvas.style.opacity = opacity;
  }

  // ── Animate ──────────────────────────────────────────────
  let frame = 0;
  const BOUNDS = { x: 130, y: 80, z: 60 };

  function animate() {
    requestAnimationFrame(animate);
    frame++;

    // Update node positions
    nodes.forEach((n, i) => {
      n.mesh.position.add(n.vel);
      // Bounce off bounds
      if (Math.abs(n.mesh.position.x) > BOUNDS.x) n.vel.x *= -1;
      if (Math.abs(n.mesh.position.y) > BOUNDS.y) n.vel.y *= -1;
      if (Math.abs(n.mesh.position.z) > BOUNDS.z) n.vel.z *= -1;
      // Pulse opacity
      n.mesh.material.opacity = 0.3 + 0.3 * Math.sin(frame * 0.02 + i);
    });

    // Rebuild edges every 20 frames
    if (frame % 20 === 0) buildEdges();

    // Camera mouse parallax
    camera.position.x += (mouse.x * 15 - camera.position.x) * 0.02;
    camera.position.y += (mouse.y * 8  - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  buildEdges();
  animate();

  // Expose for theme toggle
  window._threeScene = { updateTheme };
})();

/* ─── 8. Skill bars (Intersection Observer) ──────────────── */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => { e.target.style.width = e.target.dataset.level + '%'; }, 200);
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.skill-bar').forEach(b => skillObserver.observe(b));

/* ─── 9. Project card 3D tilt ─────────────────────────────── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dx = (e.clientX - cx) / (r.width  / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
    card.style.transform = `perspective(600px) rotateY(${dx * 6}deg) rotateX(${-dy * 4}deg) translateZ(8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0)';
    card.style.transition = 'transform .5s cubic-bezier(.23,1,.32,1)';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform .1s ease';
  });
});

/* ─── 10. Project filter tabs ──────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('filter-btn-active');
      b.classList.add('border-white/10', 'text-slate-500');
    });
    btn.classList.add('filter-btn-active');
    btn.classList.remove('border-white/10', 'text-slate-500');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const tags = card.dataset.tags || '';
      const show = filter === 'Tous'
        || tags.toLowerCase().includes(filter.toLowerCase())
        || (filter === 'IA / NLP' && (tags.includes('NLP') || tags.includes('AI') || tags.includes('LLM') || tags.includes('RAG') || tags.includes('Deep Learning')))
        || (filter === 'Fullstack' && (tags.includes('HTML') || tags.includes('JavaScript') || tags.includes('Vue') || tags.includes('Node')))
        || (filter === 'Data' && (tags.includes('Data') || tags.includes('Jupyter') || tags.includes('SaaS') || tags.includes('Finance')));

      card.style.transition = 'opacity .35s, transform .35s';
      if (show) {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.style.pointerEvents = '';
        card.style.display = '';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        card.style.pointerEvents = 'none';
        setTimeout(() => { if (card.style.opacity === '0') card.style.display = 'none'; }, 360);
      }
    });
  });
});

/* ─── 11. Contact form ─────────────────────────────────────── */
async function handleContact(e) {
  e.preventDefault();
  const form   = e.target;
  const btn    = document.getElementById('submit-btn');
  const msg    = document.getElementById('form-msg');
  const data   = { name: form.name.value, email: form.email.value, message: form.message.value };

  btn.disabled    = true;
  btn.textContent = 'Envoi en cours...';

  try {
    const res    = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const result = await res.json();
    msg.classList.remove('hidden');
    if (result.success) {
      msg.textContent  = '✓ ' + result.message;
      msg.className    = 'font-mono text-xs py-2 rounded-lg text-center text-emerald-400 bg-emerald-500/10';
      form.reset();
    } else {
      msg.textContent = '✗ ' + (result.error || 'Erreur.');
      msg.className   = 'font-mono text-xs py-2 rounded-lg text-center text-rose-400 bg-rose-500/10';
    }
  } catch {
    msg.classList.remove('hidden');
    msg.textContent = '✗ Erreur réseau. Réessayez.';
    msg.className   = 'font-mono text-xs py-2 rounded-lg text-center text-rose-400 bg-rose-500/10';
  } finally {
    btn.disabled    = false;
    btn.textContent = 'Envoyer le message';
    setTimeout(() => msg.classList.add('hidden'), 5000);
  }
}

/* ─── 12. Smooth scroll ────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ─── 13. Active nav highlight ─────────────────────────────── */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(l => l.classList.toggle('text-neon-cyan', l.getAttribute('href') === '#' + id));
    }
  });
}, { threshold: 0.45 }).observe && sections.forEach(s =>
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => {
          const active = l.getAttribute('href') === '#' + e.target.id;
          l.style.color = active ? 'var(--cyan)' : '';
        });
      }
    });
  }, { threshold: 0.45 }).observe(s)
);

console.log('%c Zouhair Choufa — Portfolio V2 ', 'background:#00e5ff;color:#03060f;font-weight:700;padding:8px 16px;border-radius:4px;letter-spacing:.1em;');
console.log('%c github.com/ZouhairChoufa ', 'color:#b44dff;');