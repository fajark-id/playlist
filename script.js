/* ==========================================================
   PLAYLIST COVERFLOW — script.js
   ========================================================= */

const PLAYLISTS = [
  { title: "Beatology",    cover: "images/beatology.webp",    link: "https://music.youtube.com/watch?list=PLNX3yqsLvVd7q3i1dkOrfemfXD_wyti7H" },
  { title: "Blus",         cover: "images/blus.webp",         link: "https://music.youtube.com/watch?list=PLNX3yqsLvVd7yJBv_a3KcMIAbQKu6s4N9" },
  { title: "Campur Es",    cover: "images/campur-es.webp",    link: "https://music.youtube.com/watch?list=PLNX3yqsLvVd5JY8KUFKlyknmTUMiQpRx1" },
  { title: "Classick",     cover: "images/classick.webp",     link: "https://music.youtube.com/watch?list=PLNX3yqsLvVd5WpepxMrcHLKarqaTQHxJB" },
  { title: "Danska",       cover: "images/danska.webp",       link: "https://music.youtube.com/watch?list=PLNX3yqsLvVd5g4bVacOSw-3HvYfGaR6Be" },
  { title: "Indienesia",   cover: "images/indienesia.webp",   link: "https://music.youtube.com/watch?list=PLNX3yqsLvVd6ZHlgAazpmajE-0LkP07G8" },
  { title: "Jukebox",      cover: "images/jukebox.webp",      link: "https://music.youtube.com/watch?list=PLNX3yqsLvVd4lAr9mD8gxanqbQqxrDQYc" },
  { title: "Karokoe",      cover: "images/karokoe.webp",      link: "https://music.youtube.com/watch?list=PLNX3yqsLvVd57jhcRepJxQDJxHc8-hCbW" },
  { title: "Kroncong",     cover: "images/kroncong.webp",     link: "https://music.youtube.com/watch?list=PLNX3yqsLvVd6edphqz2lkbbuAuU0J7ygn" },
  { title: "La France",    cover: "images/la-france.webp",    link: "https://music.youtube.com/watch?list=PLNX3yqsLvVd4hyHrVnemEr5gTI5nfQK5A" },
  { title: "Lounge",       cover: "images/lounge.webp",       link: "https://music.youtube.com/watch?list=PLNX3yqsLvVd5OugRH8gA6ioEOoPN4NK6K" },
  { title: "Reverie",      cover: "images/reverie.webp",      link: "https://music.youtube.com/watch?list=PLNX3yqsLvVd5CxMRAN-Ign3bKHMN5RfbG" },
  { title: "Seroja",       cover: "images/seroja.webp",       link: "https://music.youtube.com/watch?list=PLNX3yqsLvVd794ryngGH0tSDKo-azLR_V" },
  { title: "Sitipop",      cover: "images/sitipop.webp",      link: "https://music.youtube.com/watch?list=PLNX3yqsLvVd6OMO2Zv9FvgrjOtdCHAaLv" },
  { title: "Uyeee",        cover: "images/uyeee.webp",        link: "https://music.youtube.com/watch?list=PLNX3yqsLvVd6_n1TRNiwTjU3F47JmMImY" },
  { title: "Warnet",       cover: "images/warnet.webp",       link: "https://music.youtube.com/watch?list=PLNX3yqsLvVd4Kwy0uD1d4rZlrJM8mQwvZ" },
];

/* ========================================================= */

(function () {
  const track = document.getElementById("coverflowTrack");
  const openLink = document.getElementById("openLink");
  const stage = document.getElementById("coverflowStage");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const n = PLAYLISTS.length;
  let activeIndex = 0; 

  // Perbaikan Poin 1: Nonaktifkan double-tap zoom bawaan browser HP & seleksi teks yang mengganggu
  document.documentElement.style.touchAction = "manipulation";
  prevBtn.style.userSelect = "none";
  nextBtn.style.userSelect = "none";
  stage.style.userSelect = "none";

  function getConfig() {
    const w = window.innerWidth;
    if (w <= 520) {
      return { size: 160, offset: 75, step: 45, angle: 35, depth: 35, maxVisible: 2 };
    } else if (w <= 860) {
      return { size: 205, offset: 100, step: 58, angle: 38, depth: 40, maxVisible: 3 };
    }
    return { size: 270, offset: 150, step: 82, angle: 44, depth: 48, maxVisible: 4 };
  }

  let cfg = getConfig();

  const items = PLAYLISTS.map((pl, i) => {
    const el = document.createElement("div");
    el.className = "cover-item";
    el.dataset.index = i;

    const img = document.createElement("img");
    img.src = pl.cover;
    img.alt = pl.title;
    img.draggable = false;
    el.appendChild(img);

    el.addEventListener("click", (e) => {
      // Jika user baru saja melakukan drag/geser, abaikan trigger click link internal
      if (axisLock === "x") return;
      if (i === Math.round(activeIndex)) {
        window.open(pl.link, "_blank", "noopener");
      } else {
        goTo(i);
      }
    });

    track.appendChild(el);
    return { el, img };
  });

  function circularDiff(i, active) {
    let diff = i - active;
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    return diff;
  }

  // Perbaikan Poin 2: Menambahkan parameter isDragging untuk mematikan transisi secara dinamis
  function render(isDragging = false) {
    items.forEach(({ el, img }, i) => {
      const diff = circularDiff(i, activeIndex);
      const abs = Math.abs(diff);
      const sign = Math.sign(diff);
      const isActive = abs < 0.5; // Penyesuaian deteksi active saat nilai berupa float desimal

      el.style.width = cfg.size + "px";
      el.style.height = cfg.size + "px";
      el.style.marginLeft = -cfg.size / 2 + "px";
      el.style.marginTop = -cfg.size / 2 + "px";

      let tx, tz, rot, scale, overlayOp;
      
      // Rumus transformasi linear mulus mengikuti pergerakan jari desimal
      tx = sign * (cfg.offset * Math.min(1, abs) + (Math.max(0, abs - 1)) * cfg.step);
      tz = -cfg.depth * abs + (isActive ? (1 - abs * 2) * 40 : 0);
      rot = -sign * cfg.angle * Math.min(1, abs);
      scale = Math.max(0.5, 1 - abs * 0.14);
      overlayOp = Math.min(0.75, abs * 0.25);

      const visible = abs <= cfg.maxVisible;

      // Matikan transisi jika sedang digeser tangan agar sinkron 1:1 tanpa jeda animasi
      if (isDragging) {
        el.style.transition = "none";
      } else {
        el.style.transition = ""; 
      }

      el.style.transform = "translate3d(" + tx + "px, 0, " + tz + "px) rotateY(" + rot + "deg) scale(" + scale + ")";
      el.style.zIndex = Math.round(100 - abs).toString();
      el.style.pointerEvents = visible ? "auto" : "none";
      el.classList.toggle("active", Math.round(activeIndex) === i);

      el.style.opacity = visible ? 1 : 0;
      el.style.setProperty('--overlay-op', overlayOp);
    });

    const currentRounded = Math.round(activeIndex);
    openLink.href = PLAYLISTS[((currentRounded % n) + n) % n].link;
  }

  function goTo(i) {
    activeIndex = ((i % n) + n) % n;
    render(false);
  }

  function next() { goTo(Math.round(activeIndex) + 1); }
  function prev() { goTo(Math.round(activeIndex) - 1); }

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });

  // Manajemen state pointer baru untuk Real-time Tracking
  let dragStartX = null;
  let dragStartY = null;
  let baseIndex = 0;
  let axisLock = null;
  let isDragging = false;

  stage.addEventListener("pointerdown", (e) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    baseIndex = activeIndex;
    isDragging = true;
    axisLock = null;
  });

  window.addEventListener("pointermove", (e) => {
    if (!isDragging || dragStartX === null) return;

    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;

    if (axisLock === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      axisLock = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }

    if (axisLock === "x") {
      // Sensitivitas pergeseran stack. Menggunakan basis ukuran cover terhitung.
      const sensitivity = cfg.size * 1.5; 
      let targetIndex = baseIndex - (dx / sensitivity);
      
      activeIndex = ((targetIndex % n) + n) % n;
      render(true); // Render real-time dalam kondisi true (tanpa animasi css lag)
    }
  });

  window.addEventListener("pointerup", (e) => {
    if (!isDragging) return;
    isDragging = false;

    if (axisLock === "x") {
      // Mengunci posisi cover secara otomatis ke index bulat terdekat saat jari lepas dari layar
      let snappedIndex = Math.round(activeIndex);
      goTo(snappedIndex);
      
      // Delay singkat untuk mereset deteksi sumbu geser agar tidak bentrok dengan klik link
      setTimeout(() => { axisLock = null; }, 50);
    } else {
      render(false);
      dragStartX = null;
      dragStartY = null;
      axisLock = null;
    }
  });

  let wheelLocked = false;
  stage.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (wheelLocked) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 5) return; 
    delta > 0 ? next() : prev();
    wheelLocked = true;
    setTimeout(() => { wheelLocked = false; }, 200); 
  }, { passive: false });

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cfg = getConfig();
      render(false);
    }, 100);
  });

  render(false);
})();
