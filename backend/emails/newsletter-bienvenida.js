// Correo de bienvenida al newsletter · IMP A13D
// Maquetado con tablas + estilos en línea para que no se rompa en Outlook, Gmail, Apple Mail, etc.

const welcomeEmail = ({
  siteUrl = "https://lightcoral-stingray-699697.hostingersite.com/",
  unsubscribeUrl = "https://lightcoral-stingray-699697.hostingersite.com/",
} = {}) => ({
  subject: "¡Bienvenido a IMP A13D!",

  text: `¡Bienvenido a IMP A13D!

Tu suscripción al newsletter fue confirmada.
Pronto recibirás novedades en este correo.

Explorar productos: ${siteUrl}

Si ya no quieres recibir estos correos, puedes darte de baja aquí: ${unsubscribeUrl}`,

  html: `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>¡Bienvenido a IMP A13D!</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <style>
    table, td, div, h1, p, a { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Sora:wght@600;700&display=swap" rel="stylesheet">
  <style>
    body { margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    a { text-decoration: none; }
    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; }
      .px { padding-left: 24px !important; padding-right: 24px !important; }
      .h1 { font-size: 26px !important; line-height: 32px !important; }
      .btn a { padding-left: 24px !important; padding-right: 24px !important; }
    }
  </style>
</head>

<body style="margin:0; padding:0; background-color:#F8F8FA;">

  <div style="display:none; font-size:1px; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden; mso-hide:all;">
    Tu suscripción fue confirmada. Pronto recibirás novedades.
    &#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;
  </div>

  <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#F8F8FA;">
    <tr>
      <td align="center" style="padding:32px 12px;">

        <table role="presentation" class="container" width="600" border="0" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px;">

          <!-- Líneas de capa -->
          <tr>
            <td style="border-radius:16px 16px 0 0; overflow:hidden;">
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr><td height="4" bgcolor="#E6E2FD" style="height:4px; line-height:4px; font-size:0;">&nbsp;</td></tr>
                <tr><td height="4" bgcolor="#CEC6FA" style="height:4px; line-height:4px; font-size:0;">&nbsp;</td></tr>
                <tr><td height="4" bgcolor="#B3A7F7" style="height:4px; line-height:4px; font-size:0;">&nbsp;</td></tr>
                <tr><td height="4" bgcolor="#9686F2" style="height:4px; line-height:4px; font-size:0;">&nbsp;</td></tr>
                <tr><td height="4" bgcolor="#7B68EE" style="height:4px; line-height:4px; font-size:0;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>

          <!-- Tarjeta principal -->
          <tr>
            <td bgcolor="#FFFFFF" style="background-color:#FFFFFF; border-radius:0 0 16px 16px; border:1px solid #E1E1E8; border-top:0;">
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">

                <tr>
                  <td class="px" align="left" style="padding:32px 40px 0 40px; font-family:Sora, Arial, Helvetica, sans-serif; font-size:20px; line-height:24px; font-weight:700; color:#0A0A0D; letter-spacing:-0.2px;">
                    IMP A13D
                  </td>
                </tr>

                <tr>
                  <td class="px" align="left" style="padding:24px 40px 0 40px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td bgcolor="#F3F1FE" style="background-color:#F3F1FE; border-radius:999px; padding:5px 12px; font-family:'DM Sans', Arial, Helvetica, sans-serif; font-size:12px; line-height:16px; font-weight:500; color:#4A3BB0;">
                          Suscripción confirmada
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td class="px" align="left" style="padding:16px 40px 0 40px;">
                    <h1 class="h1" style="margin:0; font-family:Sora, Arial, Helvetica, sans-serif; font-size:32px; line-height:40px; font-weight:700; color:#0A0A0D;">
                      ¡Bienvenido!
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td class="px" align="left" style="padding:16px 40px 0 40px; font-family:'DM Sans', Arial, Helvetica, sans-serif; font-size:16px; line-height:26px; color:#4F4F5C;">
                    Tu suscripción al newsletter fue confirmada.<br>
                    Pronto recibirás novedades en este correo.
                  </td>
                </tr>

                <!-- Botón -->
                <tr>
                  <td class="px" align="left" style="padding:28px 40px 0 40px;">
                    <table role="presentation" class="btn" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#5F4BD6" style="background-color:#5F4BD6; border-radius:12px;">
                          <a href="${siteUrl}" target="_blank" style="display:inline-block; padding:14px 32px; font-family:'DM Sans', Arial, Helvetica, sans-serif; font-size:16px; line-height:20px; font-weight:500; color:#FFFFFF; text-decoration:none; border-radius:12px;">
                            Explorar productos
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td class="px" style="padding:36px 40px 0 40px;">
                    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr><td height="1" bgcolor="#EFEFF3" style="height:1px; line-height:1px; font-size:0;">&nbsp;</td></tr>
                    </table>
                  </td>
                </tr>

                <!-- Pie -->
                <tr>
                  <td class="px" align="left" style="padding:20px 40px 32px 40px; font-family:'DM Sans', Arial, Helvetica, sans-serif; font-size:13px; line-height:18px; color:#6E6E7C;">
                    Recibes este correo porque te suscribiste al newsletter de IMP A13D.<br>
                    Si ya no quieres recibirlo, puedes
                    <a href="${unsubscribeUrl}" target="_blank" style="color:#5F4BD6; text-decoration:underline;">darte de baja aquí</a>.
                  </td>
                </tr>

              </table>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`,
});

export { welcomeEmail };