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
