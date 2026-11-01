/* Shared widgets for the RNN / LSTM / GRU lessons */
(function () {
  const GATES = { RNN: 1, GRU: 3, LSTM: 4 };

  // Parameter calculator (formula verified against torch.nn.RNN/GRU/LSTM)
  window.DLP_paramCalc = function (rootId, defaultKind) {
    const root = document.getElementById(rootId);
    root.innerHTML = `
      <div class="seg" data-k></div>
      <div class="controls" style="margin-top:12px">
        <div class="control"><label>input_size <b data-v="I"></b></label><input type="range" data-i="I" min="1" max="512" value="32"></div>
        <div class="control"><label>hidden_size <b data-v="H"></b></label><input type="range" data-i="H" min="1" max="1024" value="128"></div>
        <div class="control"><label>num_layers <b data-v="L"></b></label><input type="range" data-i="L" min="1" max="4" value="2"></div>
        <div class="control"><label>bidirectional</label><select data-i="B"><option value="0">False</option><option value="1">True</option></select></div>
      </div>
      <div class="readout" data-out></div>`;
    let kind = defaultKind;
    const seg = root.querySelector("[data-k]");
    Object.keys(GATES).forEach(k => {
      const b = document.createElement("button"); b.textContent = "nn." + k;
      b.onclick = () => { kind = k; calc(); }; seg.appendChild(b);
    });
    const val = k => +root.querySelector(`[data-i="${k}"]`).value;
    function calc() {
      [...seg.children].forEach(b => b.classList.toggle("on", b.textContent === "nn." + kind));
      ["I", "H", "L"].forEach(k => (root.querySelector(`[data-v="${k}"]`).textContent = val(k)));
      const I = val("I"), H = val("H"), L = val("L"), D = val("B") ? 2 : 1, g = GATES[kind];
      let total = 0, rows = [];
      for (let l = 0; l < L; l++) {
        const inp = l === 0 ? I : H * D;
        const per = g * (inp * H + H * H + 2 * H);
        total += per * D;
        rows.push(`layer ${l}: ${D}×${g}×(${inp}·${H} + ${H}·${H} + 2·${H}) = ${(per * D).toLocaleString()}`);
      }
      const others = Object.keys(GATES).filter(k => k !== kind).map(k => {
        let t = 0; for (let l = 0; l < L; l++) { const inp = l === 0 ? I : H * D; t += D * GATES[k] * (inp * H + H * H + 2 * H); } return `${k}: ${t.toLocaleString()}`;
      }).join(" · ");
      root.querySelector("[data-out]").innerHTML =
        `<b>${kind}</b> total parameters = <b>${total.toLocaleString()}</b><br><span style="color:var(--muted)">${rows.join("<br>")}</span><br>` +
        `Same configuration as ${others}<br>` +
        `Output shapes with batch_first=True, input (B, T, ${I}): <b>output</b> (B, T, ${H * D}) · <b>h_n</b> (${L * D}, B, ${H})${kind === "LSTM" ? ` · <b>c_n</b> (${L * D}, B, ${H})` : ""}`;
    }
    root.querySelectorAll("input,select").forEach(e => e.addEventListener("input", calc));
    calc();
  };

  // Bar/line chart of several series over time steps
  window.DLP_seriesChart = function (canvas, series, opts) {
    opts = opts || {};
    const { ctx, w, h, col } = DLP_canvas(canvas, opts.height || 230);
    ctx.clearRect(0, 0, w, h);
    const T = series[0].values.length, lo = opts.min ?? -1, hi = opts.max ?? 1;
    const top = 10 + series.length * 15, X = t => 40 + (t + 0.5) * (w - 60) / T, Y = v => top + (hi - v) / (hi - lo) * (h - top - 30);
    ctx.strokeStyle = col("--line"); ctx.lineWidth = 1; ctx.font = "11px ui-monospace,monospace"; ctx.fillStyle = col("--muted");
    [hi, (hi + lo) / 2, lo].forEach(v => { ctx.beginPath(); ctx.moveTo(36, Y(v)); ctx.lineTo(w - 14, Y(v)); ctx.stroke(); ctx.fillText(v.toFixed(1), 2, Y(v) + 4); });
    for (let t = 0; t < T; t += Math.max(1, Math.ceil(T / 15))) ctx.fillText("t" + (t + 1), X(t) - 8, h - 6);
    series.forEach((s, k) => {
      const c = s.color === "accent" ? col("--accent") : s.color;
      ctx.strokeStyle = c; ctx.fillStyle = c; ctx.lineWidth = 2.5; ctx.setLineDash(s.dash || []);
      if (s.bars) {
        const bw = Math.max(2, (w - 60) / T * 0.6 / (opts.nbars || 1));
        s.values.forEach((v, t) => { const x = X(t) - ((opts.nbars || 1) * bw) / 2 + (s.barIndex || 0) * bw; ctx.globalAlpha = .75; ctx.fillRect(x, Math.min(Y(0), Y(v)), bw - 1, Math.abs(Y(v) - Y(0))); ctx.globalAlpha = 1; });
      } else {
        ctx.beginPath(); s.values.forEach((v, t) => t ? ctx.lineTo(X(t), Y(v)) : ctx.moveTo(X(t), Y(v))); ctx.stroke();
        s.values.forEach((v, t) => { ctx.beginPath(); ctx.arc(X(t), Y(v), 2.5, 0, 7); ctx.fill(); });
      }
      ctx.setLineDash([]);
      ctx.fillText("■ " + s.name, 44 + k * Math.min(170, (w - 60) / series.length), 12);
    });
  };
  window.DLP_sig = z => 1 / (1 + Math.exp(-z));
})();
