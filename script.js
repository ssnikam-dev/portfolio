(() => {
  const data = window.PORTFOLIO_DATA || {};
  const profile = data.profile || {};
  const safe = (value) => String(value ?? "");
  const isRealUrl = (url) => url && !/YOUR_|example\.com|yourdomain/i.test(url);
  const link = (url, label) => isRealUrl(url)
    ? `<a href="${safe(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`
    : `<span class="disabled" title="Add your real URL in data.js">${label} · add link</span>`;
  const tags = (items) => (items || []).map(item => `<span class="tag">${safe(item)}</span>`).join("");

  document.querySelector(".brand").innerHTML = `<span class="brand-mark">SN</span><span>${safe(profile.name || "Your Name")}<span class="brand-subtitle">Java Full Stack DEVELOPER</span></span>`;
  document.querySelector(".hero-lede").innerHTML = `I'm <strong>${safe(profile.name || "Your Name")}</strong>, a Java Full Stack Developer focused on Spring Boot, Microservices, React/Angular, REST APIs, databases, cloud and practical AI integrations.`;
  document.querySelector(".social-row").innerHTML = `${link(profile.github, "GitHub ↗")}${link(profile.linkedin, "LinkedIn ↗")}${isRealUrl("mailto:" + safe(profile.email)) ? `<a href="mailto:${safe(profile.email)}">Email ↗</a>` : `<span class="disabled">Add email in data.js</span>`}`;
  const resumeLink = document.querySelector('.hero-actions a[href="assets/resume.pdf"]');
  if (profile.resume) resumeLink.href = profile.resume;
  document.getElementById("projectGrid").innerHTML = (data.projects || []).map(project => `
    <article class="project-card">
      <div class="project-art"><div class="project-icon">${safe(project.icon || "◇")}</div></div>
      <div class="project-content">
        <div class="project-topline"><span class="project-type">${safe(project.category)}</span><span class="project-status">${safe(project.status)}</span></div>
        <h3>${safe(project.title)}</h3><p>${safe(project.description)}</p>
        <div class="tag-list">${tags(project.tech)}</div>
        <div class="project-links">${link(project.demo, "Live demo ↗")}${link(project.github, "GitHub ↗")}${link(project.caseStudy, "Case study ↗")}</div>
      </div>
    </article>`).join("");
  document.getElementById("skillsGrid").innerHTML = (data.skills || []).map(group => `
    <article class="skill-group"><h3>${safe(group.title)}</h3><div class="tag-list">${tags(group.items)}</div></article>`).join("");
 
document.getElementById("experienceList").innerHTML =
  (data.experience || []).map(item => {
    const description = Array.isArray(item.description)
      ? item.description
      : String(item.description || "")
          .split(/\n+/)
          .map(point => point.trim())
          .filter(Boolean);

    return `
      <article class="timeline-item">
        <div>
          <h3>${safe(item.role)}</h3>
          <div class="timeline-company">${safe(item.company)}</div>
          <ul class="experience-points">
            ${description.map(point =>
              `<li>${safe(point)}</li>`
            ).join("")}
          </ul>
        </div>
        <div class="timeline-date">${safe(item.dates)}</div>
      </article>
    `;
  }).join("");

  document.getElementById("educationList").innerHTML = (data.education || []).map(item => `
    <article class="education-card"><div class="edu-label">${safe(item.label || "Education")}</div><h3>${safe(item.qualification)}</h3><p><strong>${safe(item.institution)}</strong><br>${safe(item.details)}</p></article>`).join("");
  document.getElementById("aboutText").textContent = profile.about || "";
  document.getElementById("interestsList").innerHTML = (profile.interests || []).map(item => `<span>${safe(item)}</span>`).join("");
  document.getElementById("contactEmail").href = isRealUrl("mailto:" + safe(profile.email)) ? "mailto:" + safe(profile.email) : "#";
  document.getElementById("contactLinkedIn").href = profile.linkedin || "#";
  document.getElementById("year").textContent = new Date().getFullYear();

  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navLinks");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
})();
