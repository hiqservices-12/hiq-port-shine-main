// Global JavaScript for HiQ Services Static Site
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuButton = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  
  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", !isExpanded);
      
      if (isExpanded) {
        // Hide mobile menu
        mobileMenu.classList.add("hidden");
        // Reset icon
        menuButton.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        `;
      } else {
        // Show mobile menu
        mobileMenu.classList.remove("hidden");
        // Show close (X) icon
        menuButton.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        `;
      }
    });
  }

  // Active Link Highlighting
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll("nav a, #mobile-menu a");
  
  navLinks.forEach(link => {
    // Skip dropdown links to prevent them from becoming white on a white background
    if (link.closest('.absolute')) return;
    
    const href = link.getAttribute("href");
    if (!href) return;
    
    // Normalize paths to check if they match
    const isHome = currentPath === "/" || currentPath.endsWith("index.html");
    const matchesHome = href === "index.html" || href === "./" || href === "/";
    
    if (isHome && matchesHome) {
      link.classList.add("text-white", "border-white");
      link.classList.remove("text-white/75", "border-transparent");
    } else if (!isHome && href !== "index.html" && href !== "./" && href !== "/" && currentPath.includes(href.replace(".html", ""))) {
      link.classList.add("text-white", "border-white");
      link.classList.remove("text-white/75", "border-transparent");
    }
  });
});

  // Hero Slider
  const heroSlider = document.getElementById("hero-slider");
  if (heroSlider) {
    // Clone the first slide to create a seamless loop
    const firstSlideClone = heroSlider.children[0].cloneNode(true);
    heroSlider.appendChild(firstSlideClone);

    const totalSlides = heroSlider.children.length;
    let currentSlide = 0;

    setInterval(() => {
      currentSlide++;
      heroSlider.style.transition = ""; // Restore CSS transition classes
      heroSlider.style.transform = "translateX(-" + (currentSlide * 100) + "%)";

      // If we just slid to the cloned slide
      if (currentSlide === totalSlides - 1) {
        // Wait for the slide transition to finish (1000ms as per Tailwind class)
        setTimeout(() => {
          // Disable transition to jump instantly back to the true first slide
          heroSlider.style.transition = "none";
          currentSlide = 0;
          heroSlider.style.transform = "translateX(0)";
          
          // Force a reflow so the instant jump takes effect before transition is restored
          heroSlider.offsetHeight;
        }, 1000);
      }
    }, 4000);
  }

