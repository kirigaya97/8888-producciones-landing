# Conectar el formulario de contacto con Resend

El formulario de `Contacto` envía un POST a `/api/contact` (serverless function en
Vercel), que manda el mail con [Resend](https://resend.com).

- **Destinatario:** `8888producciones@outlook.com`
- **Remitente:** `8888 Producciones <no-reply@8888producciones.com>`
- **Reply-To:** el email que cargó el visitante (respondés directo desde tu casilla)

El código ya está listo. Faltan **dos pasos manuales**:

## 1. Verificar el dominio en Resend

1. Entrá a [resend.com](https://resend.com) → **Domains** → **Add Domain**.
2. Cargá `8888producciones.com`.
3. Resend te muestra unos registros DNS (SPF / DKIM, y MX para `send.`).
   Agregalos en el panel DNS donde esté administrado `8888producciones.com`
   (el registrador o el hosting del dominio).
4. Esperá a que el dominio figure como **Verified** (suele tardar minutos, a veces horas).

> Hasta que el dominio esté verificado, los envíos desde `no-reply@8888producciones.com`
> van a fallar. Para probar antes, se puede usar `onboarding@resend.dev` como remitente
> (cambiando la constante `FROM` en `src/pages/api/contact.ts`), pero sólo entrega a la
> casilla de tu propia cuenta de Resend.

## 2. Cargar la API key

1. En Resend → **API Keys** → **Create API Key** (permiso de envío).
2. Copiá la key (`re_...`).
3. **En Vercel:** Project Settings → Environment Variables → agregá
   `RESEND_API_KEY` con ese valor, para los entornos **Production** y **Preview**.
4. **Para desarrollo local:** copiá `.env.example` a `.env` y pegá la key ahí.
   `.env` está en `.gitignore`, no se commitea.

## Probar

- Local: `npm run dev` y enviar el formulario desde la sección Contacto.
- Producción: se activa solo al desplegar en Vercel con la variable cargada.

## Archivos involucrados

- `src/pages/api/contact.ts` — endpoint que valida y envía (incluye honeypot anti-spam).
- `src/components/Contacto.astro` — formulario + script de envío sin recargar.
- `astro.config.mjs` — adapter de Vercel + schema de `RESEND_API_KEY`.
