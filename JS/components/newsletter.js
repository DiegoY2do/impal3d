const API_URL = ["localhost", "127.0.0.1"].includes(location.hostname)
  ? "http://localhost:3000"
  : "https://moccasin-cattle-140361.hostingersite.com";

function getMessageEl(form) {
  let msg = form.querySelector(".news-msg, #mensaje");
  if (!msg) {
    msg = document.createElement("p");
    msg.className = "news-msg";
    msg.setAttribute("aria-live", "polite");
    form.appendChild(msg);
  }
  return msg;
}

document.addEventListener("submit", async (e) => {
  const form = e.target;
  if (!form.matches("#form-newsletter, [data-newsletter]")) return;
  e.preventDefault();

  const button = form.querySelector("button[type='submit']");
  const mensaje = getMessageEl(form);
  const email = form.email.value.trim();

  button.disabled = true;
  mensaje.textContent = "Enviando...";

  try {
    const res = await fetch(`${API_URL}/api/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) throw new Error();
    mensaje.textContent = "¡Listo! Revisa tu correo de confirmación.";
    form.reset();
  } catch {
    mensaje.textContent = "No se pudo enviar el correo. Intenta de nuevo.";
  } finally {
    button.disabled = false;
  }
});