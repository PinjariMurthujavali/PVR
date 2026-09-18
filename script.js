
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const menu = document.querySelector(".menu-btn");
  if(menu && nav){
    menu.addEventListener("click", () => nav.classList.toggle("open"));
    document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if(href === current || (current === "" && href === "index.html")) a.classList.add("active");
  });

  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){ entry.target.classList.add("visible"); reveal.unobserve(entry.target); }
    });
  }, {threshold:.12});
  document.querySelectorAll(".reveal").forEach(el => reveal.observe(el));

  const form = document.getElementById("enquiryForm");
  const notice = document.getElementById("formNotice");
  if(form){
    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get("name") || "";
      const service = data.get("service") || "";
      const location = data.get("location") || "";
      const message = data.get("message") || "";
      const text = `Hello PNR Architecture,%0A%0AI would like to start a project.%0AName: ${encodeURIComponent(name)}%0AService: ${encodeURIComponent(service)}%0ALocation: ${encodeURIComponent(location)}%0ARequirements: ${encodeURIComponent(message)}`;
      window.open(`https://wa.me/919652447849?text=${text}`, "_blank");
      if(notice){
        notice.style.display = "block";
        notice.textContent = "Opening WhatsApp with your enquiry…";
      }
    });
  }

  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  // Smooth anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const id = a.getAttribute("href");
      const target = document.querySelector(id);
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:"smooth"}); }
    });
  });
});
