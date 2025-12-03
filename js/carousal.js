// js/carousal.js

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".news-slider");
  const slides = Array.from(document.querySelectorAll(".news-slide"));
  const dots   = Array.from(document.querySelectorAll(".news-dot"));
  const prev   = document.querySelector(".news-arrow-left");
  const next   = document.querySelector(".news-arrow-right");

  if (!slider || !slides.length) return;

  let current = 0;

  function updateDots(index) {
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === index);
    });
  }

  function goToSlide(index) {
    index = Math.max(0, Math.min(slides.length - 1, index));
    const target = slides[index];
    const offset = target.offsetLeft - slider.offsetLeft;
    slider.scrollTo({ left: offset, behavior: "smooth" });
    current = index;
    updateDots(current);
  }

  // Arrow clicks
  if (prev) prev.addEventListener("click", () => goToSlide(current - 1));
  if (next) next.addEventListener("click", () => goToSlide(current + 1));

  // Dot clicks
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => goToSlide(i));
  });

  // Update active dot on manual scroll (drag / touch)
  slider.addEventListener("scroll", () => {
    const center = slider.scrollLeft + slider.clientWidth / 2;
    let closestIndex = 0;
    let closestDist = Infinity;

    slides.forEach((slide, i) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const dist = Math.abs(slideCenter - center);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });

    if (closestIndex !== current) {
      current = closestIndex;
      updateDots(current);
    }
  });

  // Start on first slide
  updateDots(0);
});
