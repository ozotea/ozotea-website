/*
 * Hand-built phone screens for projects that need more than the generic
 * mockup. A project opts in with `mockup: "<key>"` in data.js.
 * phone() returns the main screen; phone(true) returns a second screen
 * shown in the case-study modal.
 */

window.OZ_MOCKUPS = {
  // Expensio, recreated in dark theme from the app's real screens.
  expensio: {
    phone(alt = false) {
      return `
      <div class="phone ex" style="--c1:#2563eb;--c2:#10b981">
        <div class="phone__screen ex__screen">
          ${alt ? this.insights() : this.home()}
          <div class="ex__nav"><i${alt ? "" : ' class="on"'}></i><i></i><b>+</b><i${alt ? ' class="on"' : ""}></i><i></i></div>
        </div>
      </div>`;
    },

    home() {
      return `
          <div class="ex__head">
            <span class="ex__avatar">KS</span>
            <div><b>Krishnav Singh</b><small>Points Collector</small></div>
            <span class="ex__icons"><i></i><i></i></span>
          </div>
          <div class="ex__net">
            <small><i class="ex__live"></i>Net Worth</small>
            <strong>₹4,82,160<span>.61</span></strong>
            <span>Total across all bank accounts</span>
          </div>
          <div class="ex__label">Accounts <em>+ Add Account</em></div>
          <div class="ex__bank">
            <div class="ex__bank-top"><b>ICICI Bank</b><span>•• 7836</span></div>
            <i class="ex__chip"></i>
            <div class="ex__bank-bot"><span>KRISHNAV SINGH</span><span><small>Balance</small>₹1,24,560</span></div>
          </div>
          <div class="ex__io">
            <div class="ex__in"><small>↓ Income</small><b>₹2,94,678</b></div>
            <div class="ex__out"><small>↑ Expenses</small><b>₹2,65,383</b></div>
          </div>
          <div class="ex__ai"><b>✦ Your Aug’26 summary is ready</b><span>₹3,03,875 in incoming, ₹17,711 more than July</span></div>`;
    },

    insights() {
      const bars = [28, 46, 92, 38, 30, 52, 20]
        .map((h, i) => `<div><i style="height:${h}%"${i === 2 ? ' class="on"' : ""}></i><span>${"MTWTFSS"[i]}</span></div>`)
        .join("");
      const tx = [
        ["Family Lunch", "Dining · 11 May", "-₹4,000", "out"],
        ["Salary", "Salary · 01 May", "+₹90,000", "in"],
      ]
        .map(([t, s, v, c]) => `<li><b></b><div><p>${t}</p><small>${s}</small></div><em class="${c}">${v}</em></li>`)
        .join("");
      return `
          <div class="ex__title">Insights</div>
          <div class="ex__seg"><span>Day</span><span class="on">Week</span><span>Month</span><span>Year</span></div>
          <div class="ex__card">
            <small>TOTAL EXPENDITURE</small>
            <strong>₹26,666.00 <em>-40.7%</em></strong>
            <div class="ex__bars">${bars}</div>
          </div>
          <div class="ex__card">
            <small>DISTRIBUTION</small>
            <div class="ex__dist"><i style="flex:77"></i><i style="flex:15"></i><i style="flex:8"></i></div>
            <ul class="ex__legend"><li>Shopping <b>₹20,666</b></li><li>Dining <b>₹4,000</b></li><li>Education <b>₹2,000</b></li></ul>
          </div>
          <div class="ex__card">
            <small>RECENT TRANSACTIONS</small>
            <ul class="ex__tx">${tx}</ul>
          </div>`;
    },
  },

  // Silent Dose, recreated in dark theme from the app's real screens.
  silentdose: {
    phone(alt = false) {
      const tabs = ["Dashboard", "", "", "", ""]
        .map((t, i) => {
          const on = alt ? i === 3 : i === 0;
          return on ? `<b>${alt ? "Adherence" : t}</b>` : "<i></i>";
        })
        .join("");
      return `
      <div class="phone sd" style="--c1:#14b8a6;--c2:#0f766e">
        <div class="phone__screen sd__screen">
          ${alt ? this.adherence() : this.dashboard()}
          <div class="sd__nav">${tabs}</div>
        </div>
      </div>`;
    },

    dashboard() {
      const days = [["MON", 8], ["TUE", 9], ["WED", 10], ["THU", 11], ["FRI", 12]]
        .map(([d, n]) => `<span${n === 10 ? ' class="on"' : ""}><small>${d}</small>${n}</span>`)
        .join("");
      return `
          <div class="sd__head"><b>Silent Dose</b><i class="sd__bell"></i></div>
          <div class="sd__profile">
            <div class="sd__who"><span class="sd__pic"></span><div><b>Soumya</b><small>Male | 39 yr</small></div></div>
            <div class="sd__vitals">
              <span><b>B+ve</b><small>BLOOD</small></span>
              <span><b>180 cm</b><small>HEIGHT</small></span>
              <span><b>71.3 kg</b><small>WEIGHT</small></span>
            </div>
            <div class="sd__cond"><small>CONDITIONS</small>Diabetes Type 2</div>
          </div>
          <div class="sd__days">${days}</div>
          <div class="sd__label">Medication</div>
          <div class="sd__dose sd__dose--missed">
            <i></i>
            <div><small>10:00 am</small><b>Sitagix - 100</b><em>Missed · tap ✓ to mark taken</em></div>
            <span class="sd__check">✓</span>
          </div>
          <div class="sd__dose">
            <i></i>
            <div><small>09:00 pm</small><b>Novastat - Rosuvastatin</b><em>1 tablet · after dinner</em></div>
            <span class="sd__add">+ Add</span>
          </div>`;
    },

    adherence() {
      // June 2026 starts on a Monday; Sunday-first grid.
      const state = (d) => (d === 5 ? "late" : d < 10 ? "taken" : d === 10 ? "today" : "");
      const cells =
        "<span></span>" +
        Array.from({ length: 30 }, (_, i) => `<span class="${state(i + 1)}">${i + 1}</span>`).join("");
      return `
          <div class="sd__title">My Adherence</div>
          <div class="sd__tiles">
            <div class="sd__streak"><small>CURRENT STREAK</small><b>9</b><span>Consecutive days</span></div>
            <div class="sd__rate"><small>ADHERENCE RATE</small><b>98<sup>%</sup></b><span>Last 30 days</span></div>
          </div>
          <div class="sd__label">Monthly Overview</div>
          <div class="sd__cal">
            <div class="sd__month">‹ &nbsp;JUNE 2026&nbsp; ›</div>
            <div class="sd__grid"><em>S</em><em>M</em><em>T</em><em>W</em><em>T</em><em>F</em><em>S</em>${cells}</div>
          </div>
          <div class="sd__legend"><span class="taken">Taken</span><span class="late">Delayed</span><span class="missed">Missed</span><span>None</span></div>`;
    },
  },

  // ToDo, recreated from the app's real (dark) screens.
  todo: {
    phone(alt = false) {
      return `
      <div class="phone td" style="--c1:#c6f432;--c2:#8b5cf6">
        <div class="phone__screen td__screen">
          ${alt ? this.analytics() : this.home()}
          <div class="td__nav"><i${alt ? "" : ' class="on"'}></i><i></i><b>+</b><i${alt ? ' class="on"' : ""}></i><i></i></div>
        </div>
      </div>`;
    },

    home() {
      const task = (title, time, mark, cls = "") =>
        `<div class="td__task ${cls}"><i></i><div><b>${title}</b><small>${time}</small></div>${mark}</div>`;
      return `
          <div class="td__head">
            <span class="td__logo"><b>TO</b><b>DO</b></span>
            <div><small>Thursday</small><b>17 September</b></div>
            <i class="td__bell"></i>
          </div>
          <div class="td__tiles">
            <div class="td__tile td__tile--today"><small>All Tasks today ›</small><b>4</b></div>
            <div class="td__tile td__tile--over"><small>Over Due ›</small><b>0</b></div>
            <div class="td__tile td__tile--all"><small>All Tasks</small><b>59</b></div>
            <div class="td__tile td__tile--done"><small>Completed: This Week ›</small><b>7</b></div>
          </div>
          <div class="td__label">Task Today!</div>
          ${task("Tablet – Weekly sync-up", "9:30 am – 10:00 am", '<span class="td__check td__check--orange">✓</span>', "is-done")}
          ${task("Vidal Insurance Query Submit", "10:30 am – 11:00 am", '<span class="td__check">✓</span>', "is-done")}
          ${task('ZZZ-CAL-TEST <em>• LIVE</em>', "12:15 pm – 1:15 pm", '<span class="td__ring"><svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="none" stroke="#2a2f22" stroke-width="2.5"/><circle cx="10" cy="10" r="8" fill="none" stroke="#c6f432" stroke-width="2.5" stroke-dasharray="21.6 50.3" stroke-linecap="round" transform="rotate(-90 10 10)"/></svg>43%</span>', "is-live")}`;
    },

    analytics() {
      const bars = [[70, 0], [30, 0], [20, 0], [25, 0], [15, 0], [45, 1], [85, 1]]
        .map(([h, on], i) => `<div><i style="height:${h}%"${on ? ' class="on"' : ""}></i><span>${"FSSMTWT"[i]}</span></div>`)
        .join("");
      const cat = (name, n, pct, color) =>
        `<li><div><span>${name}</span><span>${n}</span></div><i style="--w:${pct}%;--c:${color}"></i></li>`;
      return `
          <div class="td__title">Analytics</div>
          <div class="td__stats">
            <div><i style="background:#c6f432"></i><b>59</b><small>Total Tasks</small></div>
            <div><i style="background:#2dd4bf"></i><b>11</b><small>Completed</small></div>
            <div><i style="background:#8b5cf6"></i><b>18%</b><small>Completion</small></div>
          </div>
          <div class="td__label">This Week</div>
          <div class="td__card">
            <div class="td__key"><span class="on">Completed</span><span>Pending</span></div>
            <div class="td__bars">${bars}</div>
            <small>Busiest day: 4 tasks scheduled</small>
          </div>
          <div class="td__label">By Category</div>
          <ul class="td__card td__cats">
            ${cat("Work", 36, 100, "#2dd4bf")}
            ${cat("Meeting", 21, 58, "#fb923c")}
            ${cat("Personal", 2, 6, "#f472b6")}
          </ul>`;
    },
  },

  // dSpree (client: Pixlo AB), recreated in dark theme. Poster art is
  // illustrative; titles are placeholders, not real catalogue items.
  dspree: {
    posters: [
      { t: "Northern Lights", g: "linear-gradient(160deg,#0f766e,#1e1b4b 60%,#0b0b12)" },
      { t: "Fjord Run", g: "linear-gradient(160deg,#1d4ed8,#0f172a 70%)" },
      { t: "The Last Ferry", g: "linear-gradient(160deg,#b45309,#3f1d0b 70%)" },
      { t: "Midnight Sun", g: "linear-gradient(160deg,#f59e0b,#b91c1c 60%,#1c0a0a)" },
      { t: "Snowbound", g: "linear-gradient(160deg,#94a3b8,#1e293b 70%)" },
      { t: "Harbour Nights", g: "linear-gradient(160deg,#7c3aed,#1e1030 70%)" },
    ],

    phone(alt = false) {
      return `
      <div class="phone ds" style="--c1:#e11d2e;--c2:#f59e0b">
        <div class="phone__screen ds__screen">
          ${alt ? this.detail() : this.home()}
        </div>
      </div>`;
    },

    poster(p, cls = "") {
      return `<div class="ds__poster ${cls}" style="background:${p.g}"><span>${p.t}</span></div>`;
    },

    home() {
      const row = (items) => `<div class="ds__row">${items.map((p) => this.poster(p)).join("")}</div>`;
      return `
          <div class="ds__bar"><i class="ds__menu"></i><b class="ds__word">dspree</b><i class="ds__search"></i></div>
          <div class="ds__hero" style="background:${this.posters[0].g}">
            <small>NEW SEASON</small>
            <b>Northern Lights</b>
            <span>Drama · 8 episodes</span>
            <div class="ds__dots"><i class="on"></i><i></i><i></i></div>
          </div>
          <div class="ds__label">Continue watching <em>See all</em></div>
          ${row(this.posters.slice(1, 4))}
          <div class="ds__label">Popular in Norway <em>See all</em></div>
          ${row(this.posters.slice(3, 6))}`;
    },

    detail() {
      const p = this.posters[1];
      return `
          <div class="ds__bar"><i class="ds__back"></i><b>Fjord Run</b><span class="ds__lang">NB</span></div>
          <div class="ds__backdrop" style="background:${p.g}"></div>
          <div class="ds__info">
            ${this.poster(p, "ds__poster--lg")}
            <div>
              <b>Fjord Run</b>
              <small>Thriller / Drama</small>
              <small>2024 · 1h 48m</small>
              <small>Norsk (bokmål)</small>
              <span class="ds__stars">★★★★☆</span>
            </div>
          </div>
          <div class="ds__actions"><b>▶ Play</b><span>+ My List</span></div>
          <p class="ds__syn"><em>Synopsis:</em> A ferry pilot races the winter storm along the western fjords to bring her brother home before the roads close.</p>
          <p class="ds__credits"><em>Med:</em> Ingrid Solberg, Mats Haugen</p>
          <p class="ds__credits"><em>Produksjon:</em> Vestland Film</p>`;
    },
  },

  // Sport Clocky (upcoming), recreated from the app's Timer screen
  // in its default "Midnight Carbon" theme.
  sportclocky: {
    phone() {
      const tab = (label, icon, on) =>
        `<span${on ? ' class="on"' : ""}><i>${icon}</i>${label}</span>`;
      const chips = [1, 5, 10, 15, 30, 60]
        .map((m) => `<b${m === 5 ? ' class="on"' : ""}>${m} min</b>`)
        .join("");
      return `
      <div class="phone sc" style="--c1:#22d3ee;--c2:#0891b2">
        <div class="phone__screen sc__screen">
          <div class="sc__tabs">
            ${tab("Stopwatch", "◷", false)}${tab("Timer", "⧗", true)}${tab("Interval", "⇄", false)}${tab("History", "↺", false)}${tab("Settings", "⚙︎", false)}
          </div>
          <div class="sc__ring"><strong>05:00</strong></div>
          <div class="sc__chips">${chips}</div>
          <div class="sc__adjust">
            <div><small>MIN</small><span><i>−</i><i class="plus">+</i></span></div>
            <div><small>SEC</small><span><i>−</i><i class="plus">+</i></span></div>
          </div>
          <div class="sc__actions"><i>↻</i><b>▶ Start</b></div>
        </div>
      </div>`;
    },
  },

  // Day Leaf (upcoming), recreated from the app's Home screen in its
  // own warm paper theme.
  dayleaf: {
    phone() {
      // Mouth curve per mood: frown → smile.
      const mouths = ["M8 15.5q4-3 8 0", "M8.5 15q3.5-1.6 7 0", "M8.5 14.5h7", "M8.5 13.5q3.5 2.6 7 0", "M8 13q4 4.5 8 0"];
      const labels = ["Difficult", "Low", "Okay", "Good", "Great"];
      const faces = mouths
        .map((d, i) => `<span${i === 3 ? ' class="on"' : ""}><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#e8b93e"/><circle cx="8.8" cy="9.5" r="1.1" fill="#3a2e12"/><circle cx="15.2" cy="9.5" r="1.1" fill="#3a2e12"/><path d="${d}" fill="none" stroke="#3a2e12" stroke-width="1.4" stroke-linecap="round"/></svg>${labels[i]}</span>`)
        .join("");
      return `
      <div class="phone dl" style="--c1:#d4a017;--c2:#f3d98b">
        <div class="phone__screen dl__screen">
          <svg class="dl__logo" viewBox="0 0 48 40" aria-hidden="true"><path d="M3 8c6-2 13-1 19 4v26C16 33 9 32 3 33z" fill="#d4a017"/><path d="M26 12C30 4 38 1 46 1c1 12-4 24-20 36z" fill="#e2b33a"/><path d="M28 34C31 24 36 15 42 8" stroke="#fdf6e3" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>
          <div class="dl__greet"><b>Good Evening, Aanya</b><em>Friday, September 25</em></div>
          <div class="dl__mood"><b>How are you feeling today?</b><div>${faces}</div></div>
          <div class="dl__reflect"><i>✦</i><b>Today’s Reflection</b><p>The pages are waiting for your thoughts. Take a moment to breathe and capture the essence of your day.</p></div>
          <span class="dl__cta">✎ Write Today’s Story</span>
          <div class="dl__streak"><i><svg viewBox="0 0 24 24"><path d="M12 2c1 4 6 6 6 12a6 6 0 01-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-4-1-6 1-9z" fill="#2b2412"/></svg></i><div><b>5 day streak</b><small>Keep the pages turning tonight</small></div></div>
          <div class="dl__nav"><span class="on">Home</span><span>Diary</span><span>Insights</span><span>Mood</span><span>Profile</span></div>
        </div>
      </div>`;
    },
  },

  // Every Log (upcoming), recreated from the app's Home screen in its
  // own white/teal theme.
  everylog: {
    phone() {
      const tile = (n, label, cls) => `<div class="el__tile el__tile--${cls}"><b>${n}</b><span>${label}</span></div>`;
      const row = (name, sub, cls, icon) =>
        `<li><i class="el__ic el__ic--${cls}">${icon}</i><div><b>${name}</b><small>${sub}</small></div><em>›</em></li>`;
      const car = '<svg viewBox="0 0 24 24"><path d="M5 11l1.5-4.5h11L19 11v6h-2v-2H7v2H5z" fill="currentColor"/><circle cx="8" cy="13" r="1" fill="#fff"/><circle cx="16" cy="13" r="1" fill="#fff"/></svg>';
      const gas = '<svg viewBox="0 0 24 24"><rect x="7" y="6" width="10" height="15" rx="4" fill="currentColor"/><rect x="10" y="3" width="4" height="3" fill="currentColor"/></svg>';
      const bolt = '<svg viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" fill="currentColor"/></svg>';
      return `
      <div class="phone el" style="--c1:#14a098;--c2:#0f766e">
        <div class="phone__screen el__screen">
          <div class="el__head"><b>EveryLog</b><span>Good morning — here’s what’s coming up</span></div>
          <div class="el__tiles">
            ${tile(4, "Active trackers", "mint")}${tile(1, "Due this week", "sand")}
            ${tile(0, "Overdue", "rose")}${tile(2, "Scheduled", "lilac")}
          </div>
          <div class="el__label"><b>Tracking now</b><em>See all</em></div>
          <ul class="el__list">
            ${row("Family Car", "Fuel logged yesterday", "car", car)}
            ${row("Scooter", "Service due in 12 days", "car", car)}
            ${row("LPG Cylinder", "Refill expected next week", "gas", gas)}
            ${row("Automations", "Rules that remember things", "auto", bolt)}
          </ul>
          <span class="el__fab">+ Add log</span>
          <div class="el__nav"><span class="on">Home</span><span>Trackers</span><span>Reminders</span><span>Settings</span></div>
        </div>
      </div>`;
    },
  },

  // Filmbib (client: Pixlo AB), recreated in dark theme with the app's
  // Norwegian UI labels. Film titles and art are placeholders.
  filmbib: {
    films: [
      { t: "Vinterlys", d: "En ung fotograf følger lyset gjennom en lang vinter i Finnmark.", g: "linear-gradient(160deg,#9fd3dc,#1f4e5a 70%)" },
      { t: "Havet i oss", d: "Dokumentar om tre generasjoner fiskere på Lofoten.", g: "linear-gradient(160deg,#2563eb,#0c1a2e 70%)" },
      { t: "Nordavind", d: "To søsken møtes igjen etter ti år, på gården der alt startet.", g: "linear-gradient(160deg,#c2410c,#2b1208 70%)" },
      { t: "Byen sover", d: "Kortfilm om nattarbeidere i Oslo sentrum.", g: "linear-gradient(160deg,#7c3aed,#160d2b 70%)" },
      { t: "Siste tog", d: "En pendler og en konduktør på nattoget mot Bergen.", g: "linear-gradient(160deg,#eab308,#3a2a05 70%)" },
      { t: "Fjellet", d: "Arkitektur og natur møtes i en hytte over tregrensen.", g: "linear-gradient(160deg,#64748b,#111827 70%)" },
    ],

    phone(alt = false) {
      return `
      <div class="phone fb" style="--c1:#2f8a9c;--c2:#9fd3dc">
        <div class="phone__screen fb__screen">
          ${alt ? this.search() : this.home()}
        </div>
      </div>`;
    },

    home() {
      const card = (f) => `
        <div class="fb__film"><div class="fb__art" style="background:${f.g}"><i class="fb__play"></i></div><span>${f.t}</span></div>`;
      return `
          <div class="fb__bar"><i class="fb__menu"></i><b class="fb__word"><img src="assets/filmbib/icon.png" alt="" />Filmbib</b><i class="fb__search"></i></div>
          <div class="fb__banner" style="background:${this.films[0].g}">
            <b>Vinterlys</b><span>Ny dokumentar · 2026</span>
          </div>
          <div class="fb__dots"><i></i><i></i><i class="on"></i><i></i><i></i><i></i></div>
          <div class="fb__label">NYHETER <em>Se alt</em></div>
          <div class="fb__row">${this.films.slice(1, 4).map(card).join("")}</div>
          <div class="fb__label">ARKITEKTER OG ARKITEKTUR <em>Se alt</em></div>
          <div class="fb__row">${this.films.slice(3, 6).map(card).join("")}</div>`;
    },

    search() {
      const rows = this.films
        .slice(0, 5)
        .map((f) => `<li><div class="fb__thumb" style="background:${f.g}"></div><div><b>${f.t}</b><small>${f.d}</small></div><i></i></li>`)
        .join("");
      return `
          <div class="fb__bar"><i class="fb__back"></i><div class="fb__field">Søk etter filmer</div></div>
          <div class="fb__count">5 treff</div>
          <ul class="fb__results">${rows}</ul>`;
    },
  },
};
