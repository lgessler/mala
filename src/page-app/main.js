import '../css/main.scss'
function removePlaceholder() {
  const screenshot = document.getElementById("screenshot");
  console.log(screenshot)
  console.log(screenshot.getAttribute("src"))
  if (screenshot.getAttribute("src").endsWith("default.png")) {
    screenshot.remove()
  }

  for (let a of document.querySelectorAll("a")) {
    if (!a.getAttribute("href")) {
      const parent = a.parentNode
      parent.innerHTML = a.innerText
    }
  }
}

document.addEventListener('DOMContentLoaded', removePlaceholder)