// Toggles the mobile navbar via [data-collapse-toggle="<target id>"],
// mirroring Bootstrap/tw-elements' collapse behavior without the dependency.
document.querySelectorAll("[data-collapse-toggle]").forEach((button) => {
  const targetId = button.getAttribute("data-collapse-toggle");
  const target = targetId ? document.getElementById(targetId) : null;
  if (!target) return;

  button.addEventListener("click", () => {
    const isHidden = target.classList.toggle("hidden");
    button.setAttribute("aria-expanded", String(!isHidden));
  });
});
