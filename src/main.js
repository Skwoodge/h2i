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
const status = document.getElementById('formStatus')

form?.addEventListener('submit', async (e) => {
  e.preventDefault()
  status.className = 'form-status'
  status.textContent = 'Sending...'

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    message: form.message.value.trim(),
  }

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const body = await res.json()
    if (!res.ok) throw new Error(body.error || 'Failed to send')
    status.className = 'form-status success'
    status.textContent = 'Thanks Mike! Your message has been sent.'
    form.reset()
  } catch (err) {
    status.className = 'form-status error'
    status.textContent = err.message
  }
})
