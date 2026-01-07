const tiltContainer = document.querySelector(".tilt-container");
const tiltInner = document.querySelector(".tilt-inner");

if (tiltContainer) {
  let mouseX = 0,
    mouseY = 0;
  let currentX = 0,
    currentY = 0;
  let rafId;

  tiltContainer.addEventListener("mousemove", (e) => {
    const rect = tiltContainer.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    mouseY = (e.clientY - rect.top) / rect.height - 0.5;

    if (!rafId) {
      rafId = requestAnimationFrame(updateTilt);
    }
  });

  tiltContainer.addEventListener("mouseleave", () => {
    mouseX = 0;
    mouseY = 0;

    if (!rafId) {
      rafId = requestAnimationFrame(updateTilt);
    }
  });

  function updateTilt() {
    // Smoothly interpolate current values towards mouse position
    const ease = 0.1; // smaller = slower smoothing
    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;

    tiltInner.style.transform = `perspective(1000px) rotateX(${
      currentY * -10
    }deg) rotateY(${currentX * 10}deg)`;

    // If still not at target, keep animating
    if (
      Math.abs(currentX - mouseX) > 0.001 ||
      Math.abs(currentY - mouseY) > 0.001
    ) {
      rafId = requestAnimationFrame(updateTilt);
    } else {
      rafId = null;
    }
  }
}

// Video Control Logic
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  const video = card.querySelector("video");
  const muteBtn = card.querySelector(".mute-btn");

  // Play on hover
  card.addEventListener("mouseenter", () => video.play());
  card.addEventListener("mouseleave", () => video.pause());

  // Mute/Unmute toggle
  muteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    video.muted = !video.muted;
    muteBtn.innerText = video.muted ? "🔇" : "🔊";
  });
});

// Animate cards on horizontal scroll when they come into view
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".showcase-section .card");

  const observerOptions = {
    root: document.querySelector(".horizontal-scroll"),
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, observerOptions);

  cards.forEach((card) => {
    observer.observe(card);
  });
});
