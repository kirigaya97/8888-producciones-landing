import type { APIRoute } from "astro";
import { RESEND_API_KEY } from "astro:env/server";
import { Resend } from "resend";

// Endpoint server-side (serverless function en Vercel). No se prerenderiza.
export const prerender = false;

const TO = "8888producciones@outlook.com";
const FROM = "8888 Producciones <no-reply@8888producciones.com>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ESCAPE: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ESCAPE[c]);

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "Formato de envío inválido." }, 400);
  }

  // Honeypot: si el campo oculto viene completo, es un bot.
  // Respondemos ok para no darle pistas, pero no enviamos nada.
  if (String(form.get("company") ?? "").trim()) {
    return json({ ok: true }, 200);
  }

  const nombre = String(form.get("nombre") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const mensaje = String(form.get("mensaje") ?? "").trim();
  const tipos = form.getAll("tipos").map((t) => String(t).trim()).filter(Boolean);

  if (!nombre || !email || !mensaje) {
    return json({ ok: false, error: "Completá nombre, email y mensaje." }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: "El email no parece válido." }, 400);
  }

  const resend = new Resend(RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `Nuevo contacto — ${nombre}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <h2 style="margin: 0 0 16px;">Nuevo mensaje desde 8888producciones.com</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Tipo de proyecto:</strong> ${tipos.length ? escapeHtml(tipos.join(", ")) : "—"}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(mensaje)}</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return json(
      { ok: false, error: "No pudimos enviar el mensaje. Probá de nuevo en un momento." },
      502,
    );
  }

  return json({ ok: true }, 200);
};
