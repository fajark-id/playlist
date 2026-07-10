/* =========================================================
   PLAYLIST COVERFLOW — script.js
   ========================================================= */

const PLAYLISTS = [
  { title: "Beatology", cover: "https://i.ytimg.com/pl_c/PLNX3yqsLvVd7q3i1dkOrfemfXD_wyti7H/studio_square_thumbnail.jpg?sqp=CJPOwtIG-oaymwEKCOIBEOIBIABIWqLzl_8DBgiPkOnJBg&rs=AMzJL3kKir2o1CzEbHInRIZnTRfL3nsbMg", link: "https://music.youtube.com/playlist?list=PLNX3yqsLvVd7q3i1dkOrfemfXD_wyti7H&si=sHv7aqSaFDIWQKXK" },
  { title: "Blus", cover: "https://i.ytimg.com/pl_c/PLNX3yqsLvVd7yJBv_a3KcMIAbQKu6s4N9/studio_square_thumbnail.jpg?sqp=CJPOwtIG-oaymwEKCOIBEOIBIABIWqLzl_8DBgjgkOnJBg&rs=AMzJL3n3v-_uZaCoLE6bgcaPwwm4Rw2WFQ", link: "https://music.youtube.com/playlist?list=PLNX3yqsLvVd7yJBv_a3KcMIAbQKu6s4N9&si=k7OjJxbVJfRQ6hnU" },
  { title: "Campur Es", cover: "https://i.ytimg.com/pl_c/PLNX3yqsLvVd4Kwy0uD1d4rZlrJM8mQwvZ/studio_square_thumbnail.jpg?sqp=CJPOwtIG-oaymwEKCOIBEOIBIABIWqLzl_8DBgjepOnJBg&rs=AMzJL3kVTlddjFfTeiOw0OiNN1j8RYqQxg", link: "https://music.youtube.com/playlist?list=PLNX3yqsLvVd5JY8KUFKlyknmTUMiQpRx1&si=YmmMtYooJKVH8DBm" },
  { title: "Classick", cover: "https://i.ytimg.com/pl_c/PLNX3yqsLvVd5WpepxMrcHLKarqaTQHxJB/studio_square_thumbnail.jpg?sqp=CJPOwtIG-oaymwEKCOIBEOIBIABIWqLzl_8DBgjBkenJBg&rs=AMzJL3l0fHAZ23Yx0Kl7qjs5te8A007Ucw", link: "https://music.youtube.com/playlist?list=PLNX3yqsLvVd5WpepxMrcHLKarqaTQHxJB&si=wDZcjxJJnR-ChOSC" },
  { title: "Danska", cover: "https://i.ytimg.com/pl_c/PLNX3yqsLvVd5g4bVacOSw-3HvYfGaR6Be/studio_square_thumbnail.jpg?sqp=CJPOwtIG-oaymwEKCOIBEOIBIABIWqLzl_8DBgiskunJBg&rs=AMzJL3lqDwJ0AwvDPMrX9btbeURXXctfTA", link: "https://music.youtube.com/playlist?list=PLNX3yqsLvVd5g4bVacOSw-3HvYfGaR6Be&si=oW624Xs8vNBGcszX" },
  { title: "Indienesia", cover: "https://i.ytimg.com/pl_c/PLNX3yqsLvVd6ZHlgAazpmajE-0LkP07G8/studio_square_thumbnail.jpg?sqp=CJPOwtIG-oaymwEKCOIBEOIBIABIWqLzl_8DBgj3kunJBg&rs=AMzJL3khWQsdpaigiuuMpb6Gx9Lf1ZKSDg", link: "https://music.youtube.com/playlist?list=PLNX3yqsLvVd6ZHlgAazpmajE-0LkP07G8&si=5AzVX20ZfMoTJdSS" },
  { title: "Jukebox", cover: "https://i.ytimg.com/pl_c/PLNX3yqsLvVd4lAr9mD8gxanqbQqxrDQYc/studio_square_thumbnail.jpg?sqp=CJPOwtIG-oaymwEKCOIBEOIBIABIWqLzl_8DBgjSk-nJBg&rs=AMzJL3m1B6BnHo-_uCk8o9zVla9I4jW1tA", link: "https://music.youtube.com/playlist?list=PLNX3yqsLvVd4lAr9mD8gxanqbQqxrDQYc&si=XVJ7jKyfAkZjtDCc" },
  { title: "Karokoe", cover: "https://i.ytimg.com/pl_c/PLNX3yqsLvVd57jhcRepJxQDJxHc8-hCbW/studio_square_thumbnail.jpg?sqp=CJPOwtIG-oaymwEKCOIBEOIBIABIWqLzl_8DBgiZlunJBg&rs=AMzJL3nHn67w2yfpj0TLYnsg3ni_za0kSQ", link: "https://music.youtube.com/playlist?list=PLNX3yqsLvVd57jhcRepJxQDJxHc8-hCbW&si=3Q4G0xrFB3OBM7SK" },
  { title: "Kroncong", cover: "https://i.ytimg.com/pl_c/PLNX3yqsLvVd6edphqz2lkbbuAuU0J7ygn/studio_square_thumbnail.jpg?sqp=CJPOwtIG-oaymwEKCOIBEOIBIABIWqLzl_8DBgjdlunJBg&rs=AMzJL3l5aF9kUliHXslFZ6tmJsNTGZ04wQ", link: "https://music.youtube.com/playlist?list=PLNX3yqsLvVd6edphqz2lkbbuAuU0J7ygn&si=CEH_AVKxIKtN63ly" },
  { title: "La France", cover: "https://i.ytimg.com/pl_c/PLNX3yqsLvVd4hyHrVnemEr5gTI5nfQK5A/studio_square_thumbnail.jpg?sqp=CJPOwtIG-oaymwEKCOIBEOIBIABIWqLzl_8DBgjVl-nJBg&rs=AMzJL3nDVu2J3EM6NB93m1SgMxXX_E8Iag", link: "https://music.youtube.com/playlist?list=PLNX3yqsLvVd4hyHrVnemEr5gTI5nfQK5A&si=Hu0VWbSBhUCKCUtV" },
  { title: "Lounge", cover: "https://i.ytimg.com/pl_c/PLNX3yqsLvVd5OugRH8gA6ioEOoPN4NK6K/studio_square_thumbnail.jpg?sqp=CJPOwtIG-oaymwEKCOIBEOIBIABIWqLzl_8DBgiUmOnJBg&rs=AMzJL3lHnJk_TStZ0VXOAeAY9N1OlnqYrg", link: "https://music.youtube.com/playlist?list=PLNX3yqsLvVd5OugRH8gA6ioEOoPN4NK6K&si=XWIjTsYCJzh36HH1" },
  { title: "Reverie", cover: "https://i.ytimg.com/pl_c/PLNX3yqsLvVd5CxMRAN-Ign3bKHMN5RfbG/studio_square_thumbnail.jpg?sqp=CJPOwtIG-oaymwEKCOIBEOIBIABIWqLzl_8DBgjlmOnJBg&rs=AMzJL3kZ6Wvc9B8YPPzzJsBGDUxYEywtUw", link: "https://music.youtube.com/playlist?list=PLNX3yqsLvVd5CxMRAN-Ign3bKHMN5RfbG&si=ZSH4LTEIDCdPr4hY" },
  { title: "Seroja", cover: "https://i.ytimg.com/pl_c/PLNX3yqsLvVd794ryngGH0tSDKo-azLR_V/studio_square_thumbnail.jpg?sqp=CJPOwtIG-oaymwEKCOIBEOIBIABIWqLzl_8DBgj7menJBg&rs=AMzJL3l7aqrzIFe0Nvti_QdGnw9SBIk20A", link: "https://music.youtube.com/playlist?list=PLNX3yqsLvVd794ryngGH0tSDKo-azLR_V&si=VZtHjt75_uwKGnRt" },
  { title: "Sitipop", cover: "https://i.ytimg.com/pl_c/PLNX3yqsLvVd6OMO2Zv9FvgrjOtdCHAaLv/studio_square_thumbnail.jpg?sqp=CJPOwtIG-oaymwEKCOIBEOIBIABIWqLzl_8DBgjWmunJBg&rs=AMzJL3kJU76XJM4-YXkzHKw75tjTx7Pkqg", link: "https://music.youtube.com/playlist?list=PLNX3yqsLvVd6OMO2Zv9FvgrjOtdCHAaLv&si=xJOzbiwbROLuLfYr" },
  { title: "Uyeee", cover: "https://i.ytimg.com/pl_c/PLNX3yqsLvVd6_n1TRNiwTjU3F47JmMImY/studio_square_thumbnail.jpg?sqp=CJPOwtIG-oaymwEKCOIBEOIBIABIWqLzl_8DBgiPpOnJBg&rs=AMzJL3kpJdvve6KPGctxT8CToeqtrvKyYw", link: "https://music.youtube.com/playlist?list=PLNX3yqsLvVd6_n1TRNiwTjU3F47JmMImY&si=w47fxdoFG-Sml6Q7" },
  { title: "Warnet", cover: "https://i.ytimg.com/pl_c/PLNX3yqsLvVd4Kwy0uD1d4rZlrJM8mQwvZ/studio_square_thumbnail.jpg?sqp=CJPOwtIG-oaymwEKCOIBEOIBIABIWqLzl_8DBgjepOnJBg&rs=AMzJL3kVTlddjFfTeiOw0OiNN1j8RYqQxg", link: "https://music.youtube.com/playlist?list=PLNX3yqsLvVd4Kwy0uD1d4rZlrJM8mQwvZ&si=eXGbjOD67PIHs8cx" },
];

/* ========================================================= */

(function () {
  const track = document.getElementById("coverflowTrack");
  const openLink = document.getElementById("openLink");
  const stage = document.getElementById("coverflowStage");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const n = PLAYLISTS.length;
  let activeIndex = 0; // Default diatur ke index 0 (Beatology)

  function getConfig() {
    const w = window.innerWidth;
    if (w <= 520) {
      // Sedikit di-tweak untuk HP agar spasi cover lebih rapi (berdasarkan screenshot)
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

    el.addEventListener("click", () => {
      if (i === activeIndex) {
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

  function render() {
    items.forEach(({ el, img }, i) => {
      const diff = circularDiff(i, activeIndex);
      const abs = Math.abs(diff);
      const sign = Math.sign(diff);
      const isActive = diff === 0;

      el.style.width = cfg.size + "px";
      el.style.height = cfg.size + "px";
      el.style.marginLeft = -cfg.size / 2 + "px";
      el.style.marginTop = -cfg.size / 2 + "px";

      let tx, tz, rot, scale, overlayOp;
      if (isActive) {
        tx = 0; tz = 40; rot = 0; scale = 1;
        overlayOp = 0; // Cover tengah terang sepenuhnya
      } else {
        tx = sign * (cfg.offset + (abs - 1) * cfg.step);
        tz = -cfg.depth * abs;
        rot = -sign * cfg.angle;
        scale = Math.max(0.5, 1 - abs * 0.14);
        
        // Menambahkan opacity (kegelapan) berdasarkan jarak dari cover tengah. max 75% gelap.
        overlayOp = Math.min(0.75, abs * 0.25); 
      }

      const visible = abs <= cfg.maxVisible;

      // Transformasi ruang 3D
      el.style.transform = "translate3d(" + tx + "px, 0, " + tz + "px) rotateY(" + rot + "deg) scale(" + scale + ")";
      el.style.zIndex = (100 - abs).toString();
      el.style.pointerEvents = visible ? "auto" : "none";
      el.classList.toggle("active", isActive);

      // Selama masuk dalam maxVisible, cover 100% TIDAK TRANSPARAN (bisa dilihat).
      // Cover yang diluar maxVisible disembunyikan sepenuhnya (opacity 0) agar tidak memberatkan DOM.
      el.style.opacity = visible ? 1 : 0;
      
      // Inject nilai variabel CSS untuk mengontrol overlay hitam
      el.style.setProperty('--overlay-op', overlayOp);
    });

    openLink.href = PLAYLISTS[activeIndex].link;
  }

  function goTo(i) {
    activeIndex = ((i % n) + n) % n;
    render();
  }

  function next() { goTo(activeIndex + 1); }
  function prev() { goTo(activeIndex - 1); }

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });

  let dragStartX = null;
  let dragStartY = null;
  let axisLock = null;

  stage.addEventListener("pointerdown", (e) => {
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    axisLock = null;
  });

  stage.addEventListener("touchmove", (e) => {
    if (dragStartX === null) return;
    const t = e.touches[0];
    const dx = t.clientX - dragStartX;
    const dy = t.clientY - dragStartY;
    if (axisLock === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      axisLock = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (axisLock === "x") e.preventDefault();
  }, { passive: false });

  window.addEventListener("pointerup", (e) => {
    if (dragStartX === null) return;
    const delta = e.clientX - dragStartX;
    // Ambang batas swipe dikurangi (dari 40 -> 30) agar lebih peka di HP
    if (axisLock !== "y" && Math.abs(delta) > 30) {
      delta > 0 ? prev() : next();
    }
    dragStartX = null;
    dragStartY = null;
    axisLock = null;
  });

  let wheelLocked = false;
  stage.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (wheelLocked) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    // Sensitivitas scroll mouse diringankan (dari 8 -> 5)
    if (Math.abs(delta) < 5) return; 
    delta > 0 ? next() : prev();
    wheelLocked = true;
    // Lock delay dipersingkat agar lebih responsif jika user scroll cepat
    setTimeout(() => { wheelLocked = false; }, 200); 
  }, { passive: false });

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cfg = getConfig();
      render();
    }, 100);
  });

  render();
})();
