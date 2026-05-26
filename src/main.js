import './style.css'

// Mobile nav toggle
const toggle = document.getElementById('mobileToggle')
const nav = document.getElementById('mainNav')
toggle?.addEventListener('click', () => nav?.classList.toggle('open'))
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav?.classList.remove('open'))
})

// Header scroll effect
const header = document.querySelector('.site-header')
let lastScroll = 0
window.addEventListener('scroll', () => {
  const y = window.scrollY
  header?.classList.toggle('scrolled', y > 60)
  lastScroll = y
}, { passive: true })

// Scroll reveal animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    }
  })
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
