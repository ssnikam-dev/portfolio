/* Visual effects layer. Reads the DOM that script.js renders; changes no content. */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* 1. Typing animation for the hero code (same text, typed out) */
  const code = $(".code-window code");
  if (code && !reduce) {
    const pre = code.parentElement;
    pre.style.minHeight = pre.offsetHeight + "px";
    const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    const full = nodes.map(n => n.nodeValue);
    nodes.forEach(n => (n.nodeValue = ""));
    const caret = document.createElement("span"); caret.className = "caret";
    let i = 0, j = 0;
    const step = () => {
      if (i >= nodes.length) return;
      const node = nodes[i], ch = full[i][j++];
      node.nodeValue += ch;
      (node.parentElement === code ? node : node.parentElement).after(caret);
      if (j >= full[i].length) { i++; j = 0; }
      setTimeout(step, ch === "\n" ? 140 : 18 + Math.random() * 32);
    };
    code.append(caret);
    setTimeout(step, 500);
  }

  if (!reduce) document.documentElement.classList.add("js-fx");

  /* 2. Scroll reveal with stagger */
  const targets = $$(".section-heading, .project-card, .skill-group, .timeline-item, .education-card, .about-layout > div, .contact-card");
  targets.forEach(el => {
    const cols = el.parentElement ? getComputedStyle(el.parentElement).gridTemplateColumns.split(" ").length : 1;
    const idx = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
    el.classList.add("reveal");
    el.style.setProperty("--d", ((idx % Math.max(cols, 1)) * 0.09).toFixed(2) + "s");
  });
  $$(".skill-group .tag").forEach((t, n) => t.style.setProperty("--i", [...t.parentElement.children].indexOf(t)));
  $$(".timeline-item li").forEach(li => li.style.setProperty("--i", [...li.parentElement.children].indexOf(li)));
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target; el.classList.add("in"); io.unobserve(el);
    setTimeout(() => { el.style.setProperty("--d", "0s"); el.classList.add("settled"); }, 2200);
  }), { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
  targets.forEach(el => (reduce ? el.classList.add("in") : io.observe(el)));

  /* 3. Scroll progress, header shadow, timeline line */
  const bar = document.createElement("div"); bar.className = "scroll-progress"; document.body.prepend(bar);
  const header = $(".site-header"), timeline = $(".timeline");
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.setProperty("--sp", max > 0 ? (scrollY / max).toFixed(4) : 0);
    header.classList.toggle("scrolled", scrollY > 8);
    if (timeline) {
      const r = timeline.getBoundingClientRect();
      timeline.style.setProperty("--p", clamp((innerHeight * 0.6 - r.top) / r.height, 0, 1).toFixed(3));
    }
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener("resize", onScroll); onScroll();

  /* 4. Nav scroll-spy */
  const links = $$(".nav-links a");
  const spy = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  links.forEach(a => { const s = $(a.getAttribute("href")); if (s) spy.observe(s); });

  /* 5. Toolkit strip: items light up one after another */
  const items = $$(".trust-inner > div");
  if (items.length && !reduce) {
    let k = 0;
    setInterval(() => { items.forEach((d, n) => d.classList.toggle("lit", n === k)); k = (k + 1) % items.length; }, 1100);
  }

  if (reduce) return;

  /* 6. Hero parallax / tilt + card spotlight & tilt (mouse only) */
  if (fine) {
    const hero = $(".hero"), vis = $(".hero-visual");
    if (hero && vis) {
      hero.addEventListener("mousemove", e => {
        const r = vis.getBoundingClientRect();
        vis.style.setProperty("--px", clamp((e.clientX - r.left - r.width / 2) / r.width, -1, 1).toFixed(3));
        vis.style.setProperty("--py", clamp((e.clientY - r.top - r.height / 2) / r.height, -1, 1).toFixed(3));
      });
      hero.addEventListener("mouseleave", () => { vis.style.setProperty("--px", 0); vis.style.setProperty("--py", 0); });
    }
    $$(".project-card, .skill-group, .education-card").forEach(card => {
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        card.style.setProperty("--mx", x + "px"); card.style.setProperty("--my", y + "px");
        if (card.classList.contains("project-card")) {
          card.style.setProperty("--rx", ((y / r.height - 0.5) * -5).toFixed(2) + "deg");
          card.style.setProperty("--ry", ((x / r.width - 0.5) * 5).toFixed(2) + "deg");
        }
      });
      card.addEventListener("pointerleave", () => { card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg"); });
    });
  }

  /* 7. Background: drifting code glyphs + soft cursor glow */
  const c = document.createElement("canvas"); c.className = "bg-canvas"; c.setAttribute("aria-hidden", "true"); document.body.prepend(c);
  const ctx = c.getContext("2d"), glow = document.createElement("div"); glow.className = "cursor-glow"; document.body.prepend(glow);
  const glyphs = ["{ }", "</>", "();", "=>", "[]", "0x1F", "&&", "//", "#", "01", "::", "++", "@", "λ", "$_", "*", "git", "200 OK"];
  const mono = '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace';
  let w, h, parts = [], mx = 0, gx = 0, gy = 0, tx = 0, ty = 0;
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2); w = innerWidth; h = innerHeight;
    c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    parts = Array.from({ length: Math.round(clamp(w / 30, 16, 48)) }, () => ({
      x: Math.random() * w, y: Math.random() * h, v: 0.08 + Math.random() * 0.22, d: 0.1 + Math.random() * 0.5,
      s: 11 + Math.random() * 9, a: 0.05 + Math.random() * 0.11, g: glyphs[(Math.random() * glyphs.length) | 0],
      col: Math.random() < 0.5 ? "139,156,255" : "89,225,194"
    }));
  };
  addEventListener("resize", resize); resize();
  if (fine) addEventListener("pointermove", e => { tx = e.clientX; ty = e.clientY; mx = e.clientX / w - 0.5; glow.classList.add("on"); }, { passive: true });
  const H = () => h + 60;
  const frame = () => {
    ctx.clearRect(0, 0, w, h); ctx.textBaseline = "middle";
    for (const p of parts) {
      p.y -= p.v;
      const y = (((p.y - scrollY * p.d) % H()) + H()) % H() - 30;
      ctx.font = `${p.s}px ${mono}`; ctx.fillStyle = `rgba(${p.col},${p.a})`;
      ctx.fillText(p.g, p.x + mx * p.d * 40, y);
    }
    gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
    glow.style.transform = `translate(${gx}px,${gy}px)`;
    if (!document.hidden) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) requestAnimationFrame(frame); });
})();
