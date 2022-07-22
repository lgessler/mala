import '../css/main.scss'
import React, { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import { DiscussionEmbed } from 'disqus-react';


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

function Disqus(props) {
  return (
    <DiscussionEmbed
      shortname='lgessler-com'
      config={
        {
          url: window.location.href,
          identifier: "mala-app-" + props.slug,
          title: props.name,
          language: 'en_US'
        }
      }
    />
  )
}

function mount() {
  const mountPoint = document.getElementById("disqus-root")
  const root = ReactDOM.createRoot(mountPoint)
  const slug = document.getElementById("slug").innerText
  const name = document.getElementById("name").innerText
  root.render(<Disqus slug={slug} name={name} />)
}

document.addEventListener('DOMContentLoaded', removePlaceholder)
document.addEventListener('DOMContentLoaded', mount)