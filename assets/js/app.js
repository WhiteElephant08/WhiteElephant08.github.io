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

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
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
    document.getElementById("theme-toggle").addEventListener("click", function () {
      setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  window.PersonalSite = { renderSite: renderSite, setTheme: setTheme, showSection: showSection };
  document.addEventListener("DOMContentLoaded", initialize);
}());
