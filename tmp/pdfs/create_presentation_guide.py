from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.lib.colors import HexColor

OUT = 'output/pdf/guia-exposicion-mis-secciones.pdf'
PURPLE = HexColor('#5F4BD6')
PURPLE_DARK = HexColor('#382B87')
PALE = HexColor('#F2F0FF')
INK = HexColor('#171626')
MUTED = HexColor('#666579')
BORDER = HexColor('#E3E1EC')
WHITE = colors.white

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='DocTitle', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=23, leading=28, textColor=INK, alignment=TA_LEFT, spaceAfter=7))
styles.add(ParagraphStyle(name='Subtitle', parent=styles['Normal'], fontName='Helvetica', fontSize=10.5, leading=15, textColor=MUTED, spaceAfter=16))
styles.add(ParagraphStyle(name='SectionTitle', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=17, leading=21, textColor=PURPLE_DARK, spaceBefore=2, spaceAfter=8))
styles.add(ParagraphStyle(name='Subhead', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=11, leading=14, textColor=INK, spaceBefore=3, spaceAfter=5))
styles.add(ParagraphStyle(name='BodyCustom', parent=styles['BodyText'], fontName='Helvetica', fontSize=9.5, leading=14, textColor=INK, spaceAfter=6))
styles.add(ParagraphStyle(name='SmallCustom', parent=styles['BodyText'], fontName='Helvetica', fontSize=8.5, leading=12, textColor=MUTED, spaceAfter=3))
styles.add(ParagraphStyle(name='CardTitle', parent=styles['BodyText'], fontName='Helvetica-Bold', fontSize=9, leading=12, textColor=PURPLE_DARK, alignment=TA_LEFT))
styles.add(ParagraphStyle(name='CardBody', parent=styles['BodyText'], fontName='Helvetica', fontSize=8.2, leading=11, textColor=INK, alignment=TA_LEFT))
styles.add(ParagraphStyle(name='ScriptText', parent=styles['BodyText'], fontName='Helvetica-Oblique', fontSize=9.2, leading=14, textColor=INK))
styles.add(ParagraphStyle(name='Tag', parent=styles['BodyText'], fontName='Helvetica-Bold', fontSize=8.5, leading=11, textColor=PURPLE_DARK))


def P(text, style='BodyCustom'):
    return Paragraph(text, styles[style])


def box(content, bg=PALE, border=BORDER, padding=10):
    t = Table([[content]], colWidths=[6.95*inch])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg),
        ('BOX', (0,0), (-1,-1), 0.7, border),
        ('ROUNDEDCORNERS', [8,8,8,8]),
        ('LEFTPADDING', (0,0), (-1,-1), padding),
        ('RIGHTPADDING', (0,0), (-1,-1), padding),
        ('TOPPADDING', (0,0), (-1,-1), padding),
        ('BOTTOMPADDING', (0,0), (-1,-1), padding),
    ]))
    return t


def draw_page(canvas, doc):
    canvas.saveState()
    w, h = letter
    canvas.setFillColor(PURPLE)
    canvas.rect(0, h-0.16*inch, w, 0.16*inch, fill=1, stroke=0)
    canvas.setStrokeColor(BORDER)
    canvas.line(0.78*inch, 0.58*inch, w-0.78*inch, 0.58*inch)
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(0.8*inch, 0.38*inch, 'Guía para mi exposición - IMP AL3D')
    canvas.drawRightString(w-0.8*inch, 0.38*inch, f'{doc.page}')
    canvas.restoreState()


doc = SimpleDocTemplate(OUT, pagesize=letter, rightMargin=0.82*inch, leftMargin=0.82*inch, topMargin=0.62*inch, bottomMargin=0.78*inch, title='Guía para explicar mis secciones', author='IMP AL3D')
story = []

# Page 1: About Us section
story += [P('Mis dos secciones del sitio', 'DocTitle'), P('Guía breve para explicar la estructura, con palabras sencillas y sin entrar demasiado en detalles técnicos.', 'Subtitle')]
story += [P('1. “Lo que nos mueve” - Sobre nosotros', 'SectionTitle')]
story += [P('Esta parte presenta la misión, la visión y los valores de IMP AL3D. La información comienza con un título y una breve explicación; después se organiza en tres tarjetas para que cada idea se distinga con claridad.', 'BodyCustom')]

cards = []
for title, body in [
    ('MISIÓN', 'Explica qué busca ofrecer la empresa: diseño y manufactura digital accesibles, con piezas bien terminadas.'),
    ('VISIÓN', 'Describe la meta a futuro: ser una tienda de referencia en México para objetos impresos en 3D.'),
    ('VALORES', 'Resume los principios de trabajo: precisión, honestidad con los tiempos, cuidado y respeto por los materiales.')
]:
    cards.append([P(title, 'CardTitle'), P(body, 'CardBody')])
t = Table([cards], colWidths=[2.31*inch]*3)
t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), WHITE),
    ('BOX', (0,0), (-1,-1), 0.7, BORDER),
    ('INNERGRID', (0,0), (-1,-1), 0.7, BORDER),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 10), ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ('TOPPADDING', (0,0), (-1,-1), 10), ('BOTTOMPADDING', (0,0), (-1,-1), 10),
]))
story += [Spacer(1, 4), t, Spacer(1, 13), P('Cómo está organizada', 'Subhead')]
story += [P('<b>Una sección</b> agrupa todo el contenido relacionado. Dentro hay un contenedor que mantiene el contenido ordenado; luego aparece el encabezado y una cuadrícula con tres tarjetas. Cada tarjeta funciona como una unidad: ícono, nombre y explicación.', 'BodyCustom')]
story += [P('Etiquetas que puedes mencionar', 'Subhead')]
rows = [
    [P('section', 'Tag'), P('Agrupa el contenido de esta parte de la página.', 'SmallCustom')],
    [P('div', 'Tag'), P('Sirve como contenedor para ordenar elementos.', 'SmallCustom')],
    [P('article', 'Tag'), P('Representa cada tarjeta de misión, visión o valores.', 'SmallCustom')],
    [P('h2 / h3 y p', 'Tag'), P('Separan títulos y textos, haciendo clara la jerarquía.', 'SmallCustom')],
]
tags = Table(rows, colWidths=[1.15*inch, 5.8*inch])
tags.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), HexColor('#FBFAFF')),
    ('LINEBELOW', (0,0), (-1,-2), 0.35, BORDER),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 7), ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ('TOPPADDING', (0,0), (-1,-1), 5), ('BOTTOMPADDING', (0,0), (-1,-1), 3),
]))
story += [tags, Spacer(1, 11), P('Para decirlo en la exposición', 'Subhead')]
story += [box(P('“En la sección ‘Lo que nos mueve’ organicé la información de la empresa en tres temas: misión, visión y valores. Primero se presenta el título y una breve introducción; después, cada tema aparece en su propia tarjeta con un ícono y una explicación. Así, la información se puede recorrer y entender con facilidad.”', 'ScriptText'))]

story.append(PageBreak())

# Page 2: FAQ
story += [P('2. “Preguntas rápidas” - Contacto', 'SectionTitle')]
story += [P('Esta parte reúne respuestas a dudas comunes antes de que una persona se comunique con la empresa. Tiene un título y una frase introductoria a un lado, y una lista de preguntas con sus respuestas al otro.', 'BodyCustom')]

flow = Table([
    [P('<b>Introducción</b><br/>Título y breve contexto', 'CardBody'), P('<b>Preguntas</b><br/>Tres dudas habituales', 'CardBody'), P('<b>Respuestas</b><br/>Información debajo de cada duda', 'CardBody')]
], colWidths=[2.31*inch]*3)
flow.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), PALE), ('BOX', (0,0), (-1,-1), 0.7, BORDER),
    ('INNERGRID', (0,0), (-1,-1), 0.7, BORDER), ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 9), ('RIGHTPADDING', (0,0), (-1,-1), 9),
    ('TOPPADDING', (0,0), (-1,-1), 9), ('BOTTOMPADDING', (0,0), (-1,-1), 9),
]))
story += [flow, Spacer(1, 13), P('Qué puede hacer la persona', 'Subhead')]
faq_rows = [
    [P('¿Cuánto tarda una pieza personalizada?', 'CardTitle'), P('La primera pregunta aparece abierta para mostrar su respuesta de inmediato.', 'CardBody')],
    [P('¿Puedo mandar mi archivo 3D?', 'CardTitle'), P('La persona puede abrir la pregunta para consultar la respuesta.', 'CardBody')],
    [P('¿Hacen envíos a todo el país?', 'CardTitle'), P('Las preguntas se presentan una debajo de otra para facilitar la lectura.', 'CardBody')],
]
ft = Table(faq_rows, colWidths=[2.7*inch, 4.25*inch])
ft.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), WHITE), ('BOX', (0,0), (-1,-1), 0.7, BORDER),
    ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER), ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 9), ('RIGHTPADDING', (0,0), (-1,-1), 9),
    ('TOPPADDING', (0,0), (-1,-1), 8), ('BOTTOMPADDING', (0,0), (-1,-1), 7),
]))
story += [ft, Spacer(1, 13), P('Etiquetas que puedes mencionar', 'Subhead')]
faq_tags = Table([
    [P('details', 'Tag'), P('Agrupa una pregunta y la respuesta que se puede desplegar.', 'SmallCustom')],
    [P('summary', 'Tag'), P('Muestra la pregunta que la persona selecciona para abrir o cerrar la respuesta.', 'SmallCustom')],
    [P('p', 'Tag'), P('Contiene el texto de la respuesta.', 'SmallCustom')],
], colWidths=[1.15*inch, 5.8*inch])
faq_tags.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), HexColor('#FBFAFF')), ('LINEBELOW', (0,0), (-1,-2), 0.35, BORDER),
    ('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 7), ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ('TOPPADDING', (0,0), (-1,-1), 5), ('BOTTOMPADDING', (0,0), (-1,-1), 3),
]))
story += [faq_tags, Spacer(1, 11), P('Para decirlo en la exposición', 'Subhead')]
story += [box(P('“En la sección de preguntas rápidas organicé tres dudas comunes de los clientes. Cada pregunta tiene su respuesta y se puede abrir para consultar más información. La primera aparece abierta como ejemplo. La idea es que la persona resuelva dudas rápidamente sin tener que buscar la información en otra parte.”', 'ScriptText'))]
story += [Spacer(1, 9), P('<b>Si te preguntan por el código:</b> puedes explicar que cada sección se prepara como un bloque de contenido y luego se coloca en el espacio correspondiente de la página. No hace falta describir cada línea.', 'SmallCustom')]

doc.build(story, onFirstPage=draw_page, onLaterPages=draw_page)
print(OUT)
