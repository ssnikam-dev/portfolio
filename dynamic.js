/* ==========================================================
   dynamic.js — adds the "developer" feel on top of script.js.
   It never edits your text; it only animates and enhances
   what data.js + script.js already rendered.
   ========================================================== */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const data = window.PORTFOLIO_DATA || {};
  const profile = data.profile || {};
  const isMac = /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent || "");
  const isReal = (u) => u && !/YOUR_|example\.com|yourdomain/i.test(u);

  // How many experience bullets stay visible before "Show more". Set to 99 to disable.
  const COLLAPSE_AFTER = 5;

  document.documentElement.classList.add(reduce ? "no-motion" : "js-motion");

  /* ---------- helpers ---------- */
  let toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1900);
  }

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (_) { /* ignore */ }
      ta.remove();
      return ok;
    }
  }

  async function typeInto(el, str, speed = 18) {
    el.classList.add("typing");
    for (let i = 1; i <= str.length; i++) {
      el.textContent = str.slice(0, i);
      await sleep(speed);
    }
    el.classList.remove("typing");
  }

  /* ---------- scroll progress, timeline fill ---------- */
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.prepend(bar);

  const timeline = $(".timeline");
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
      if (timeline) {
        const r = timeline.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
        timeline.style.setProperty("--fill", (p * 100).toFixed(1) + "%");
      }
      ticking = false;
    });
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();

  /* ---------- active nav link ---------- */
  const navLinks = $$('.nav-links a[href^="#"]');
  const linkById = new Map(navLinks.map((a) => [a.getAttribute("href").slice(1), a]));
  const spy = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((l) => l.classList.remove("active"));
      const a = linkById.get(e.target.id);
      if (a && !a.classList.contains("nav-contact")) a.classList.add("active");
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  ["home", ...linkById.keys()].forEach((id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

  /* ---------- scroll reveal ---------- */
  if (!reduce) {
    const targets = $$(".section-heading, .project-card, .skill-group, .timeline-item, .education-card, .about-layout > *, .contact-card");
    const perParent = new Map();
    targets.forEach((el) => {
      const i = perParent.get(el.parentElement) || 0;
      perParent.set(el.parentElement, i + 1);
      el.style.setProperty("--d", Math.min(i, 5) * 70 + "ms");
      el.classList.add("reveal");
    });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        io.unobserve(el);
        el.classList.add("in");
        el.dispatchEvent(new CustomEvent("revealed"));
        // drop the helper classes afterwards so normal hover transitions come back
        setTimeout(() => { el.classList.remove("reveal", "in"); el.style.removeProperty("--d"); }, 1100);
      }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    targets.forEach((el) => io.observe(el));
  }

  /* ---------- hero: caret, cursor-lit grid ---------- */
  const gradient = $(".hero h1 .gradient-text");
  if (gradient) {
    const c = document.createElement("span");
    c.className = "h1-caret";
    c.setAttribute("aria-hidden", "true");
    gradient.after(c);
  }
  const hero = $(".hero");
  if (hero) {
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--hx", e.clientX - r.left + "px");
      hero.style.setProperty("--hy", e.clientY - r.top + "px");
    });
  }

  /* ---------- hero: code window types itself, then "boots" ---------- */
  async function heroSequence() {
    const win = $(".code-window");
    if (!win) return;
    const code = $("pre code", win);
    const pre = code && code.parentElement;
    const footer = $(".code-footer", win);
    if (!code || !footer) return;

    const projects = data.projects || [];
    const skillCount = (data.skills || []).reduce((n, g) => n + (g.items || []).length, 0);

    const consoleEl = document.createElement("div");
    consoleEl.className = "console";
    consoleEl.setAttribute("aria-hidden", "true");
    win.insertBefore(consoleEl, footer);

    // footer words -> cycling highlight
    const pulse = $(".pulse", footer);
    const words = footer.textContent.trim().split("·").map((w) => w.trim()).filter(Boolean);
    footer.textContent = "";
    if (pulse) footer.append(pulse, " ");
    const cycle = words.map((w, i) => {
      const s = document.createElement("span");
      s.className = "cycle";
      s.textContent = w;
      footer.append(s);
      if (i < words.length - 1) footer.append(" · ");
      return s;
    });
    const startCycle = () => {
      if (reduce) { cycle.forEach((s) => s.classList.add("on")); return; }
      let i = 0;
      const tick = () => { cycle.forEach((s, k) => s.classList.toggle("on", k === i)); i = (i + 1) % cycle.length; };
      tick();
      setInterval(tick, 1500);
    };

    const line = (cls, html) => {
      const d = document.createElement("div");
      d.className = "ln " + cls;
      d.innerHTML = html;
      consoleEl.appendChild(d);
      return d;
    };
    const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
    const logLines = (secs) => [
      ["info", "Starting Application using Java 21"],
      ["info", `Loaded ${projects.length} projects, ${skillCount} skills`],
      ["ok", `Started Application in ${secs} seconds`],
    ];

    if (reduce) {
      line("cmd", '<i>$</i>./mvnw spring-boot:run');
      logLines("2.4").forEach(([c, m]) => line(c, `<span class="lv">INFO</span>${esc(m)}`));
      startCycle();
      return;
    }

    // 1) type the existing code (same markup, revealed character by character)
    pre.style.minHeight = pre.offsetHeight + "px";
    pre.setAttribute("role", "img");
    pre.setAttribute("aria-label", code.textContent.trim());
    const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    const full = nodes.map((n) => n.nodeValue);
    nodes.forEach((n) => { n.nodeValue = ""; });
    const caret = document.createElement("span");
    caret.className = "caret";
    code.appendChild(caret);

    const t0 = performance.now();
    for (let i = 0; i < nodes.length; i++) {
      for (let c = 1; c <= full[i].length; c++) {
        nodes[i].nodeValue = full[i].slice(0, c);
        await sleep(full[i][c - 1] === "\n" ? 90 : 16);
      }
    }
    caret.remove();
    await sleep(350);

    // 2) run it
    const cmd = line("cmd", "<i>$</i><span></span>");
    await typeInto($("span", cmd), "./mvnw spring-boot:run", 34);
    await sleep(450);
    const secs = ((performance.now() - t0) / 1000).toFixed(3);
    for (const [cls, msg] of logLines(secs)) {
      line(cls, `<span class="lv">INFO</span>${esc(msg)}`);
      await sleep(420);
    }
    startCycle();
  }

  /* ---------- project cards ---------- */
  $$(".project-card").forEach((card) => {
    const st = $(".project-status", card);
    if (st) {
      const t = st.textContent;
      st.dataset.state = /develop|progress|wip/i.test(t) ? "dev" : /complet|live|shipped/i.test(t) ? "done" : "";
    }

    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });

    // "git clone <repo>" line built from the card's own GitHub link
    const gh = $('.project-links a[href*="github.com"]', card);
    const art = $(".project-art", card);
    if (!gh || !art) return;
    const url = gh.href;
    const shown = "git clone " + url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const name = ($("h3", card) || {}).textContent || "this project";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "clone";
    btn.title = "Click to copy the git clone command";
    btn.setAttribute("aria-label", "Copy git clone command for " + name);
    btn.innerHTML = '<span class="prompt" aria-hidden="true">$</span><span class="clone-text"></span>';
    const txt = $(".clone-text", btn);
    art.appendChild(btn);

    if (reduce) {
      txt.textContent = shown;
    } else {
      card.addEventListener("revealed", async () => {
        txt.textContent = shown;                       // measure final width first -> no layout jump
        btn.style.minWidth = btn.offsetWidth + "px";
        txt.textContent = "";
        await sleep(350);
        typeInto(txt, shown, 16);
      }, { once: true });
    }

    btn.addEventListener("click", async () => {
      const ok = await copy("git clone " + url);
      toast(ok ? "Copied: git clone " + url.replace(/^https?:\/\//, "") : "Couldn't copy — select the text manually");
    });
  });

  /* ---------- experience: long lists collapse ---------- */
  $$(".experience-points").forEach((ul) => {
    const items = $$(":scope > li", ul);
    if (items.length <= COLLAPSE_AFTER + 1) return;
    const extra = items.slice(COLLAPSE_AFTER);
    extra.forEach((li) => { li.hidden = true; });

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "more";
    btn.setAttribute("aria-expanded", "false");
    const label = (open) => (open ? "Show less ↑" : `Show ${extra.length} more ↓`);
    btn.textContent = label(false);
    ul.after(btn);

    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") !== "true";
      extra.forEach((li) => {
        li.hidden = !open;
        li.classList.toggle("li-in", open);
      });
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = label(open);
    });
  });

  /* ---------- hover a technology -> highlight it everywhere ---------- */
  const TECH = ".tag, .trust-inner > div";
  const keyOf = (el) => el.textContent.trim().toLowerCase();
  document.addEventListener("mouseover", (e) => {
    const t = e.target.closest && e.target.closest(TECH);
    if (!t) return;
    const k = keyOf(t);
    $$(TECH).forEach((x) => x.classList.toggle("hl", keyOf(x) === k));
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest && e.target.closest(TECH)) $$(".hl").forEach((x) => x.classList.remove("hl"));
  });

  /* ---------- command palette (Ctrl/⌘ + K) ---------- */
  function initPalette() {
    const trigger = $("#paletteBtn");
    if (trigger) $("kbd", trigger).textContent = isMac ? "⌘ K" : "Ctrl K";

    const go = (h) => () => {
      const el = $(h);
      if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", h);
    };
    const open = (u) => () => window.open(u, "_blank", "noopener");

    const cmds = [];
    [["Projects", "#projects"], ["Skills", "#skills"], ["Experience", "#experience"],
     ["Education", "#education"], ["About", "#about"], ["Contact", "#contact"]]
      .forEach(([label, h]) => cmds.push({ group: "Go to", label, hint: h, run: go(h) }));

    (data.projects || []).forEach((p) => {
      if (isReal(p.demo)) cmds.push({ group: "Projects", label: `${p.title} · live demo`, hint: "open", run: open(p.demo) });
      if (isReal(p.github)) cmds.push({ group: "Projects", label: `${p.title} · source`, hint: "github", run: open(p.github) });
    });

    if (isReal(profile.github)) cmds.push({ group: "Links", label: "GitHub", hint: "open", run: open(profile.github) });
    if (isReal(profile.linkedin)) cmds.push({ group: "Links", label: "LinkedIn", hint: "open", run: open(profile.linkedin) });
    if (profile.resume) cmds.push({ group: "Links", label: "Resume", hint: "pdf", run: open(profile.resume) });
    if (isReal(profile.email)) {
      cmds.push({ group: "Links", label: "Send an email", hint: profile.email, run: () => { location.href = "mailto:" + profile.email; } });
      cmds.push({ group: "Links", label: "Copy email address", hint: "clipboard", run: async () => toast((await copy(profile.email)) ? "Email copied" : "Couldn't copy") });
    }

    const root = document.createElement("div");
    root.className = "palette";
    root.hidden = true;
    root.innerHTML = `
      <div class="palette-backdrop"></div>
      <div class="palette-box" role="dialog" aria-modal="true" aria-label="Quick navigation">
        <div class="palette-input"><span aria-hidden="true">›</span>
          <input type="text" placeholder="Jump to a section, project or link…" autocomplete="off" spellcheck="false"
                 role="combobox" aria-expanded="true" aria-controls="paletteList" aria-label="Search commands">
          <kbd>esc</kbd></div>
        <ul id="paletteList" role="listbox"></ul>
        <div class="palette-foot"><span>↑↓ navigate</span><span>↵ select</span></div>
      </div>`;
    document.body.appendChild(root);
    const input = $("input", root);
    const list = $("#paletteList", root);
    let shown = [], sel = 0, lastFocus = null;

    function render() {
      const q = input.value.trim().toLowerCase();
      shown = cmds.filter((c) => (c.group + " " + c.label).toLowerCase().includes(q));
      sel = Math.min(sel, Math.max(shown.length - 1, 0));
      list.innerHTML = "";
      if (!shown.length) {
        const li = document.createElement("li");
        li.className = "pal-empty";
        li.textContent = "No matching command";
        list.appendChild(li);
        input.removeAttribute("aria-activedescendant");
        return;
      }
      let last = "";
      shown.forEach((c, i) => {
        if (c.group !== last) {
          last = c.group;
          const g = document.createElement("li");
          g.className = "pal-group";
          g.setAttribute("role", "presentation");
          g.textContent = c.group;
          list.appendChild(g);
        }
        const li = document.createElement("li");
        li.className = "pal-item";
        li.id = "cmd-" + i;
        li.setAttribute("role", "option");
        li.innerHTML = "<span></span><small></small>";
        $("span", li).textContent = c.label;
        $("small", li).textContent = c.hint;
        li.addEventListener("mousemove", () => { if (sel !== i) { sel = i; mark(); } });
        li.addEventListener("click", () => run(i));
        list.appendChild(li);
      });
      mark();
    }
    function mark() {
      $$(".pal-item", list).forEach((li, i) => li.setAttribute("aria-selected", String(i === sel)));
      const cur = $("#cmd-" + sel, list);
      if (cur) { input.setAttribute("aria-activedescendant", cur.id); cur.scrollIntoView({ block: "nearest" }); }
    }
    function run(i) {
      const c = shown[i];
      if (!c) return;
      close();
      setTimeout(c.run, 60);
    }
    function openPalette() {
      lastFocus = document.activeElement;
      root.hidden = false;
      document.body.classList.add("palette-open");
      input.value = "";
      sel = 0;
      render();
      input.focus();
    }
    function close() {
      root.hidden = true;
      document.body.classList.remove("palette-open");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    input.addEventListener("input", () => { sel = 0; render(); });
    root.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); if (shown.length) { sel = (sel + 1) % shown.length; mark(); } }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (shown.length) { sel = (sel - 1 + shown.length) % shown.length; mark(); } }
      else if (e.key === "Enter") { e.preventDefault(); run(sel); }
      else if (e.key === "Tab") { e.preventDefault(); }
    });
    $(".palette-backdrop", root).addEventListener("click", close);
    if (trigger) trigger.addEventListener("click", () => {
      $("#navLinks") && $("#navLinks").classList.remove("open");
      openPalette();
    });
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        root.hidden ? openPalette() : close();
      }
    });
  }
  initPalette();

  /* ---------- go ---------- */
  const start = () => setTimeout(heroSequence, 500);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start); else start();
})();
