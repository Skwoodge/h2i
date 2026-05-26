import { EmailMessage } from "cloudflare:email"
import { createMimeMessage } from "mimetext"

export async function onRequest(context) {
  const { request, env } = context

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'content-type': 'application/json' },
    })
  }

  try {
    const data = await request.json()
    const { name, email, phone, message } = data

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Name, email, and message are required.' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      })
    }

    const msg = createMimeMessage()
    msg.setSender({ name: 'H2 Insurance Contact', addr: 'contact@h2insurancecares.com' })
    msg.setRecipient('mike.h2i@icloud.com')
    msg.setSubject(`New Contact from ${name}`)
    msg.addMessage({
      contentType: 'text/plain',
      data: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nMessage: ${message}`,
    })

    var emailMsg = new EmailMessage(
      'contact@h2insurancecares.com',
      'mike.h2i@icloud.com',
      msg.asRaw(),
    )

    await env.SEND_EMAIL.send(emailMsg)

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}
