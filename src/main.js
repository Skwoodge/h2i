import './style.css'

const toggle = document.getElementById('mobileToggle')
const nav = document.getElementById('mainNav')
toggle?.addEventListener('click', () => nav?.classList.toggle('open'))
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav?.classList.remove('open'))
})

const header = document.querySelector('.site-header')
window.addEventListener('scroll', () => {
  const y = window.scrollY
  header?.classList.toggle('scrolled', y > 60)
}, { passive: true })

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    }
  })
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

const form = document.getElementById('contactForm')
const successMsg = document.getElementById('form-success')

form?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = new FormData(form)
  const res = await fetch(form.action, {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  })
  if (res.ok) {
    form.style.display = 'none'
    successMsg.style.display = 'block'
  }
})
