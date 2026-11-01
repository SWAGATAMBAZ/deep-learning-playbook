/* Deep Learning Playbook — shared behaviour: sidebar, progress, code blocks, tabs */
(function () {
  const PAGES = [
    { id: "index", file: "index.html", title: "Start here & Roadmap", group: "Start" },
    { id: "foundations", file: "foundations.html", title: "Neural net foundations", group: "Core" },
    { id: "training", file: "training.html", title: "Training & improving models", group: "Core" },
    { id: "tabular", file: "tabular.html", title: "Deep learning on tabular data", group: "Architectures" },
    { id: "cnn", file: "cnn.html", title: "CNNs & computer vision", group: "Architectures" },
    { id: "cv-detection", file: "cv-detection.html", title: "CV II: Detection & segmentation", group: "Architectures" },
    { id: "cv-performance", file: "cv-performance.html", title: "CV III: Vision performance playbook", group: "Architectures" },
    { id: "rnn", file: "rnn.html", title: "RNN, LSTM, GRU", group: "Architectures" },
    { id: "transformers", file: "transformers.html", title: "Attention & Transformers", group: "Architectures" },
    { id: "nlp", file: "nlp.html", title: "Embeddings & NLP", group: "Architectures" },
    { id: "recsys", file: "recsys.html", title: "Recommender systems", group: "Applied" },
    { id: "timeseries", file: "timeseries.html", title: "Time-series forecasting", group: "Applied" },
    { id: "anomaly", file: "anomaly.html", title: "Anomaly detection & GNNs", group: "Applied" },
    { id: "genai", file: "genai.html", title: "Generative AI & LLMs", group: "Applied" },
    { id: "industry", file: "industry.html", title: "Industry playbook", group: "Decide" },
    { id: "chooser", file: "chooser.html", title: "Which model when?", group: "Decide" },
    { id: "models", file: "models.html", title: "Model encyclopedia (62 models)", group: "Decide" },
    { id: "production", file: "production.html", title: "Production & explainability", group: "Decide" },
    { id: "interview", file: "interview.html", title: "Interview question bank", group: "Interview" },
  ];
  window.DLP_PAGES = PAGES;

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  };
  window.DLP_STORE = store;

  // theme
  const theme = store.get("dlp-theme", null) || (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);

  let current = "index", done = {};

  function buildSidebar() {
    const aside = document.createElement("aside");
    aside.className = "sidebar";
    let html = `<a class="brand" href="index.html"><span class="logo">∂</span>DL Playbook</a>
      <div class="brand-sub">Deep learning for Data Scientist II interviews</div>
      <div class="progress-wrap"><div class="progress-bar"><span id="pbar"></span></div><div class="progress-label" id="plabel"></div></div>
      <nav class="nav">`;
    let g = "";
    PAGES.forEach((p, i) => {
      if (p.group !== g) { g = p.group; html += `<div class="nav-group">${g}</div>`; }
      html += `<a href="${p.file}" class="${p.id === current ? "active" : ""} ${done[p.id] ? "done" : ""}" data-id="${p.id}"><span class="num"><span>${String(i).padStart(2, "0")}</span></span>${p.title}</a>`;
    });
    html += `</nav><div class="side-tools"><button class="btn small" id="themeBtn">◐ Theme</button><button class="btn small" id="resetBtn">Reset progress</button></div>`;
    aside.innerHTML = html;
    return aside;
  }

  function updateProgress() {
    const d = store.get("dlp-done", {});
    const n = PAGES.filter(p => d[p.id]).length;
    const pct = Math.round((n / PAGES.length) * 100);
    const bar = document.getElementById("pbar"); if (bar) bar.style.width = pct + "%";
    const lab = document.getElementById("plabel"); if (lab) lab.textContent = `${n} of ${PAGES.length} topics done · ${pct}%`;
    document.querySelectorAll(".nav a").forEach(a => a.classList.toggle("done", !!d[a.dataset.id]));
    document.querySelectorAll("[data-step]").forEach(s => s.classList.toggle("done", !!d[s.dataset.step]));
  }
  window.DLP_updateProgress = updateProgress;

  // Python-ish syntax highlighter
  const KW = new Set("def class return if elif else for while in not and or import from as with try except finally raise lambda yield None True False pass break continue is assert global nonlocal async await".split(" "));
  const BUILTIN = new Set("self print len range super nn torch F np pd optim int float str list dict tuple zip enumerate sum max min abs".split(" "));
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function highlight(src) {
    const re = /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|#[^\n]*|\b\d+\.?\d*(?:e-?\d+)?\b|\b[A-Za-z_][A-Za-z0-9_]*\b)/g;
    let out = "", last = 0, m;
    while ((m = re.exec(src))) {
      out += esc(src.slice(last, m.index));
      const t = m[0];
      let cls = null;
      if (t[0] === "#") cls = "c";
      else if (t[0] === '"' || t[0] === "'") cls = "s";
      else if (/^\d/.test(t)) cls = "n";
      else if (KW.has(t)) cls = "k";
      else if (BUILTIN.has(t)) cls = "b";
      else if (src[re.lastIndex] === "(") cls = "f";
      out += cls ? `<span class="tok-${cls}">${esc(t)}</span>` : esc(t);
      last = re.lastIndex;
    }
    return out + esc(src.slice(last));
  }

  function dedent(s) {
    s = s.replace(/^\n+|\s+$/g, "");
    const lines = s.split("\n");
    const ind = Math.min(...lines.filter(l => l.trim()).map(l => l.match(/^ */)[0].length));
    return lines.map(l => l.slice(ind)).join("\n");
  }

  function buildCode() {
    document.querySelectorAll('script[type="text/plain"].snippet').forEach(sc => {
      const src = dedent(sc.textContent);
      const wrap = document.createElement("div");
      wrap.className = "code";
      wrap.innerHTML = `<div class="code-head"><span>${esc(sc.dataset.title || "python")}</span><button class="copy">Copy</button></div><pre><code>${highlight(src)}</code></pre>`;
      wrap.querySelector(".copy").addEventListener("click", e => {
        const b = e.currentTarget;
        const ok = () => { b.textContent = "Copied ✓"; setTimeout(() => (b.textContent = "Copy"), 1400); };
        if (navigator.clipboard) navigator.clipboard.writeText(src).then(ok, ok); else ok();
      });
      sc.replaceWith(wrap);
    });
  }

  function buildTabs() {
    document.querySelectorAll("[data-tabs]").forEach(root => {
      const btns = root.querySelectorAll(".tabs button");
      const panels = root.querySelectorAll(".tab-panel");
      btns.forEach((b, i) => b.addEventListener("click", () => {
        btns.forEach(x => x.classList.remove("on")); panels.forEach(x => x.classList.remove("on"));
        b.classList.add("on"); panels[i].classList.add("on");
      }));
    });
  }

  function buildPager() {
    const main = document.querySelector("main");
    const i = PAGES.findIndex(p => p.id === current);
    const row = document.createElement("div");
    row.className = "done-row";
    row.innerHTML = `<button class="btn primary" id="doneBtn"></button><span style="color:var(--muted);font-size:14px">Tick this off once you can explain the 🎯 interview points out loud without notes.</span>`;
    main.appendChild(row);
    const btn = row.querySelector("#doneBtn");
    const paint = () => { const d = store.get("dlp-done", {}); btn.textContent = d[current] ? "✓ Done — click to undo" : "Mark this topic as done"; };
    btn.addEventListener("click", () => { const d = store.get("dlp-done", {}); d[current] = !d[current]; store.set("dlp-done", d); paint(); updateProgress(); });
    paint();
    const pager = document.createElement("div");
    pager.className = "pager";
    const prev = PAGES[i - 1], next = PAGES[i + 1];
    pager.innerHTML = (prev ? `<a href="${prev.file}"><small>← Previous</small>${prev.title}</a>` : "<span></span>") +
      (next ? `<a class="next" href="${next.file}"><small>Next →</small>${next.title}</a>` : "");
    main.appendChild(pager);
  }

  document.addEventListener("DOMContentLoaded", () => {
    current = document.body.dataset.page || "index";
    done = store.get("dlp-done", {});
    const main = document.querySelector("main");
    const layout = document.createElement("div");
    layout.className = "layout";
    const side = buildSidebar();
    main.parentNode.insertBefore(layout, main);
    layout.appendChild(side);
    layout.appendChild(main);
    const mt = document.createElement("button");
    mt.className = "btn menu-toggle"; mt.textContent = "☰ Topics";
    mt.addEventListener("click", () => side.classList.toggle("open"));
    document.body.appendChild(mt);
    document.getElementById("themeBtn").addEventListener("click", () => {
      const t = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", t); store.set("dlp-theme", t);
      window.dispatchEvent(new Event("dlp-theme"));
    });
    document.getElementById("resetBtn").addEventListener("click", () => { store.set("dlp-done", {}); updateProgress(); const b = document.getElementById("doneBtn"); if (b) b.textContent = "Mark this topic as done"; });
    buildCode();
    buildTabs();
    buildPager();
    updateProgress();
  });

  // tiny canvas helper used by widgets
  window.DLP_canvas = function (canvas, h) {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth || 600;
    canvas.width = w * dpr; canvas.height = h * dpr; canvas.style.height = h + "px";
    const ctx = canvas.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cs = getComputedStyle(document.documentElement);
    const col = n => cs.getPropertyValue(n).trim();
    return { ctx, w, h, col };
  };
})();
