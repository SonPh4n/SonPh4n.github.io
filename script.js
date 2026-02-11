(function () {
  "use strict";

  const track = document.getElementById("racetrack");
  const carMclaren = document.getElementById("car-mclaren");
  const carBmw = document.getElementById("car-bmw");
  const racetrackWrap = document.querySelector(".racetrack-wrap");

  if (!track || !carMclaren || !carBmw) return;

  const minSpeed = 1.2;
  const maxSpeed = 3.2;
  const speedChangeInterval = 400;
  const biasMultiplier = 1.15;
  const scrollThreshold = 80;

  let posM = 0;
  let posB = 0;
  let speedM = 2;
  let speedB = 2;
  let winner = Math.random() < 0.5 ? "mclaren" : "bmw";
  let lastSpeedChange = 0;

  const clamp = (val, minVal, maxVal) =>
    Math.max(minVal, Math.min(maxVal, val));

  const setCarPosition = (el, px) => {
    el.style.left = px + "px";
  };

  const setCarZIndex = () => {
    carMclaren.style.zIndex = "1";
    carBmw.style.zIndex = "2";
  };

  const resetRace = (trackWidth, carWidth) => {
    posM = trackWidth - carWidth;
    posB = trackWidth - carWidth;
    winner = Math.random() < 0.5 ? "mclaren" : "bmw";
    speedM = minSpeed + (maxSpeed - minSpeed) * 0.4;
    speedB = minSpeed + (maxSpeed - minSpeed) * 0.4;
  };

  const checkAtBottom = () => {
    if (!racetrackWrap) return;
    const scrollBottom = window.scrollY + window.innerHeight;
    const pageBottom = document.documentElement.scrollHeight;
    if (scrollBottom >= pageBottom - scrollThreshold) {
      racetrackWrap.classList.add("at-bottom");
    } else {
      racetrackWrap.classList.remove("at-bottom");
    }
  };

  window.addEventListener("scroll", checkAtBottom, { passive: true });
  window.addEventListener("resize", checkAtBottom);
  checkAtBottom();

  const tick = (time) => {
    const trackWidth = track.getBoundingClientRect().width;
    const carWidth = carMclaren.getBoundingClientRect().width;

    if (time === undefined || posM > trackWidth) {
      resetRace(trackWidth, carWidth);
    }

    if (time - lastSpeedChange > speedChangeInterval) {
      lastSpeedChange = time;
      speedM = clamp(
        speedM + (Math.random() - 0.5) * 1.4,
        minSpeed,
        maxSpeed
      );
      speedB = clamp(
        speedB + (Math.random() - 0.5) * 1.4,
        minSpeed,
        maxSpeed
      );
    }

    const mclarenBoost = winner === "mclaren" ? biasMultiplier : 1;
    const bmwBoost = winner === "bmw" ? biasMultiplier : 1;

    posM -= speedM * mclarenBoost;
    posB -= speedB * bmwBoost;

    setCarPosition(carMclaren, posM);
    setCarPosition(carBmw, posB);
    setCarZIndex();

    if (posM <= -carWidth || posB <= -carWidth) {
      resetRace(trackWidth, carWidth);
      setCarPosition(carMclaren, posM);
      setCarPosition(carBmw, posB);
      setCarZIndex();
      requestAnimationFrame(tick);
      return;
    }

    requestAnimationFrame(tick);
  };

  const trackWidth = track.getBoundingClientRect().width;
  const carWidth = carMclaren.getBoundingClientRect().width;
  resetRace(trackWidth, carWidth);
  setCarPosition(carMclaren, posM);
  setCarPosition(carBmw, posB);
  setCarZIndex();
  requestAnimationFrame(tick);

  const projectModal = document.getElementById("project-modal");
  const projectModalOverlay = projectModal?.querySelector(".project-modal-overlay");
  const projectModalClose = projectModal?.querySelector(".project-modal-close");
  const projectCards = document.querySelectorAll(".project-card");

  if (projectModal && projectCards.length) {
  const openProjectModal = (card) => {
    const titleEl = card.querySelector(".project-card-title");
    const roleEl = card.querySelector(".project-card-role");
    const descEl = card.querySelector(".project-card-desc");
    const techList = card.querySelector(".project-card-tech");
    projectModal.querySelector(".project-modal-title").textContent = titleEl?.textContent ?? "";
    projectModal.querySelector(".project-modal-role").textContent = roleEl?.textContent ?? "";
    projectModal.querySelector(".project-modal-desc").textContent = descEl?.textContent ?? "";
    const modalTech = projectModal.querySelector(".project-modal-tech");
    modalTech.innerHTML = "";
    if (techList) {
      techList.querySelectorAll("li").forEach((li) => {
        const item = document.createElement("li");
        item.textContent = li.textContent;
        modalTech.appendChild(item);
      });
    }
    projectModal.classList.add("is-open");
    projectModal.setAttribute("aria-hidden", "false");
    projectModalClose?.focus();
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove("is-open");
    projectModal.setAttribute("aria-hidden", "true");
  };

  projectCards.forEach((card) => {
    card.addEventListener("click", () => openProjectModal(card));
  });

  projectModalOverlay?.addEventListener("click", closeProjectModal);
  projectModalClose?.addEventListener("click", closeProjectModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectModal.classList.contains("is-open")) {
      closeProjectModal();
    }
  });
  }
})();
