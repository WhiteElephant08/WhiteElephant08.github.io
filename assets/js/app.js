(function () {
  "use strict";

  var content = window.SITE_CONTENT;

  function card(item) {
    return '<article class="card">' +
      (item.status ? '<div class="status">' + item.status + '</div>' : '') +
      '<h3>' + item.title + '</h3><p>' + item.text + '</p></article>';
  }

  function renderSite() {
    document.getElementById("profile-role").textContent = content.profile.role;
    document.getElementById("profile-introduction").textContent = content.profile.introduction;
    document.getElementById("focus-list").innerHTML = content.focus.map(card).join("");
    document.getElementById("project-list").innerHTML = content.projects.map(card).join("");
    document.getElementById("guide-list").innerHTML = content.githubGuide.topics.map(function (topic) {
      return '<article class="guide-item"><h3>' + topic.name + '</h3><p>' + topic.summary + '</p></article>';
    }).join("");
  }

  function activateAvatarFallback() {
    var image = document.getElementById("profile-image");
    var fallback = document.getElementById("avatar-fallback");
    image.hidden = true;
    fallback.hidden = false;
  }

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    var toggle = document.getElementById("theme-toggle");
    var label = document.getElementById("theme-label");
    if (toggle) { toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false"); }
    if (label) { label.textContent = theme === "dark" ? "浅色" : "深色"; }
    try { localStorage.setItem("site-theme", theme); } catch (error) { /* Storage is optional. */ }
  }

  function showSection(id) {
    var target = document.getElementById(id) || document.getElementById("about");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function initialize() {
    var savedTheme;
    try { savedTheme = localStorage.getItem("site-theme"); } catch (error) { savedTheme = null; }
    setTheme(savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
    renderSite();
    var profileImage = document.getElementById("profile-image");
    profileImage.src = content.profile.avatar;
    profileImage.addEventListener("error", activateAvatarFallback);
    document.getElementById("theme-toggle").addEventListener("click", function () {
      setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    });
    document.querySelectorAll("[data-nav]").forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        showSection(link.dataset.nav);
        history.replaceState(null, "", "#" + link.dataset.nav);
      });
    });

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) { return; }
          document.querySelectorAll("[data-nav]").forEach(function (link) {
            link.classList.toggle("active", link.dataset.nav === entry.target.id);
          });
        });
      }, { rootMargin: "-35% 0px -55%" });
      document.querySelectorAll("[data-section]").forEach(function (section) { observer.observe(section); });
    }
  }

  window.PersonalSite = { renderSite: renderSite, setTheme: setTheme, showSection: showSection, activateAvatarFallback: activateAvatarFallback };
  document.addEventListener("DOMContentLoaded", initialize);
}());
