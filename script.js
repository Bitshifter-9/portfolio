function toggleDarkMode() {
  const root = document.documentElement;
  const isDark = root.getAttribute("data-theme") === "dark";
  root.setAttribute("data-theme", isDark ? "light" : "dark");
  const icon = document.getElementById("theme-icon");
  icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
  console.log("Theme toggled to", isDark ? "light" : "dark");
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = document.getElementById("submitBtn");
  const submitText = document.getElementById("submitText");
  const spinner = document.getElementById("spinner");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  submitText.classList.add("d-none");
  spinner.classList.remove("d-none");
  submitBtn.disabled = true;

  const formData = new FormData(form);
  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      submitText.classList.remove("d-none");
      spinner.classList.add("d-none");
      submitBtn.disabled = false;
      if (response.ok) {
        alert("Message sent successfully!");
        form.reset();
      } else {
        alert("Failed to send message. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Form submission error:", error);
      submitText.classList.remove("d-none");
      spinner.classList.add("d-none");
      submitBtn.disabled = false;
      alert("An error occurred. Please try again.");
    });
}

function createParticleBackground() {
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particles = [];
  for (let i = 0; i < 20; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1 + 0.5,
      vx: Math.random() * 0.5 - 0.25,
      vy: Math.random() * 0.5 - 0.25,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "rgba(255, 135, 135, 0.4)"
          : "rgba(255, 107, 107, 0.4)";
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });
    requestAnimationFrame(animate);
  }
  animate();
}

function createCursorTrail() {
  const trail = document.getElementById("cursorTrail");
  let dotCount = 0;
  const maxDots = 5;
  document.addEventListener("mousemove", (e) => {
    if (dotCount >= maxDots) return;
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    trail.appendChild(dot);
    dotCount++;
    setTimeout(() => {
      dot.remove();
      dotCount--;
    }, 200);
  });
}

function handleBackToTop() {
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      backToTop.classList.remove("d-none");
    } else {
      backToTop.classList.add("d-none");
    }
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio initialized");
  try {
    document
      .getElementById("theme-toggle")
      .addEventListener("click", toggleDarkMode);
    document
      .getElementById("contactForm")
      .addEventListener("submit", handleSubmit);
    createParticleBackground();
    createCursorTrail();
    handleBackToTop();
  } catch (error) {
    console.error("Initialization error:", error);
  }
});
