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
const submitBtn = form?.querySelector('button[type="submit"]')

form?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(form)
  formData.append('access_key', '87e52c5c-f5e5-42fc-98de-8ace64d93b2f')
  const originalText = submitBtn.textContent
  submitBtn.textContent = 'Sending...'
  submitBtn.disabled = true
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    if (res.ok) {
      alert('Success! Your message has been sent.')
      form.reset()
    } else {
      alert('Error: ' + data.message)
    }
  } catch {
    alert('Something went wrong. Please try again.')
  } finally {
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }
})

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    const el = entry.target
    const target = parseInt(el.dataset.target, 10)
    if (isNaN(target)) return
    counterObs.unobserve(el)
    let current = 0
    const duration = 1200
    const start = performance.now()
    function tick(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      current = Math.round(progress * target)
      el.textContent = current
      el.classList.add('counting')
      el.addEventListener('animationend', () => el.classList.remove('counting'), { once: true })
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })
}, { threshold: 0.5 })

document.querySelectorAll('.counter').forEach(el => counterObs.observe(el))
