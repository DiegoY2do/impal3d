const API_URL = ["localhost", "127.0.0.1"].includes(location.hostname)
  ? "http://localhost:3000"
  : "https://lightcoral-stingray-699697.hostingersite.com/"; // Aqui va el url del backend cambiar cuando suba al servidor

const form = document.getElementById("form-newsletter");
const mensaje = document.getElementById("mensaje");
const boton = form.querySelector("#btn-newsletter");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = form.email.value.trim();

  boton.disabled = true;
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
    boton.disabled = false;
  }
});