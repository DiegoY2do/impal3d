import "dotenv/config";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { welcomeEmail } from "./emails/newsletter-bienvenida.js";

const app = express();

// Orígenes que pueden llamar a tu API (agrega tu dominio real más adelante)
const allowedOrigins = [
  "http://127.0.0.1:5500",   // Live Server
  "http://localhost:5500",   // Live Server
  "https://lightcoral-stingray-699697.hostingersite.com",
];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Dirección de tu sitio (para el botón del correo). Cámbiala en el .env cuando tengas dominio.
const SITE_URL = process.env.SITE_URL || "https://lightcoral-stingray-699697.hostingersite.com/";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.get("/", (req, res) => {
  res.send("API del newsletter funcionando");
});

app.post("/api/subscribe", async (req, res) => {
  const email = String(req.body?.email || "").trim();

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Correo inválido" });
  }

  try {
    const { subject, html, text } = welcomeEmail({
      siteUrl: SITE_URL,
      unsubscribeUrl: `mailto:${process.env.EMAIL_USER}?subject=Baja%20del%20newsletter`,
    });

    await transporter.sendMail({
      from: `"IMP A13D" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html,
      text,
    });

    res.json({ ok: true });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({ error: "No se pudo enviar el correo" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));