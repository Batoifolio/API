import PDFDocument from 'pdfkit'
import { PDFData } from '../interfaces/user.interface'
import fs from 'fs'

// Configuración de estilos mejorada
const styles = {
  colors: {
    primary: '#2a4365', // Azul oscuro más profesional
    secondary: '#4a5568', // Gris azulado
    accent: '#3182ce', // Azul más vibrante
    background: '#f7fafc', // Fondo muy claro
    light: '#e2e8f0' // Gris claro para detalles
  },
  fonts: {
    bold: 'Helvetica-Bold',
    regular: 'Helvetica',
    italic: 'Helvetica-Oblique',
    title: 'Helvetica-Bold'
  },
  spacing: {
    section: 15, // Más espacio entre secciones
    subsection: 8,
    line: 1.25, // Mejor interlineado
    logo: 25
  },
  sizes: {
    title: 24, // Tamaño más grande para el nombre
    header: 16, // Subtítulos más destacados
    body: 11, // Texto ligeramente más grande
    small: 9,
    logo: 45
  },
  layout: {
    leftColumnWidth: 0.35, // 35% para la columna izquierda
    rightColumnWidth: 0.65 // 65% para la columna derecha
  }
}

export function generarPDF (data: PDFData, outputPath: string): void {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 50, // Márgenes más generosos
    bufferPages: true
  })

  // Pipe the PDF to a file
  doc.pipe(fs.createWriteStream(outputPath))

  // Fondo sutil
  doc.rect(0, 0, doc.page.width, doc.page.height)
    .fill(styles.colors.background)

  // 0. AÑADIR LOGO
  addLogo(doc, '/app/src/modules/users/utils/batoi-icon.png')

  // Variables para control de espacio
  let remainingSpace = doc.page.height - doc.page.margins.top - doc.page.margins.bottom - styles.spacing.logo

  // 1. ENCABEZADO MEJORADO
  const headerHeight = addHeader(doc, data, remainingSpace)
  remainingSpace -= headerHeight

  // 2. COLUMNAS PRINCIPALES
  const columnsTop = doc.y + styles.spacing.section * 2
  const columnWidth = {
    left: (doc.page.width - doc.page.margins.left - doc.page.margins.right) * styles.layout.leftColumnWidth,
    right: (doc.page.width - doc.page.margins.left - doc.page.margins.right) * styles.layout.rightColumnWidth
  }

  // Columna izquierda (35% ancho)
  doc.save()
    .rect(doc.page.margins.left, columnsTop - 10, columnWidth.left + 20, doc.page.height - columnsTop - 50)
    .fill(styles.colors.light)
    .restore()

  doc.text('', doc.page.margins.left + 15, columnsTop)
  const leftColHeight = addLeftColumn(doc, data, columnWidth.left, remainingSpace)

  // Columna derecha (65% ancho)
  doc.text('', doc.page.margins.left + columnWidth.left + 30, columnsTop)
  const rightColHeight = addRightColumn(doc, data, columnWidth.right)

  // Ajustar espacio restante
  remainingSpace -= Math.max(leftColHeight, rightColHeight)

  // 3. PIE DE PÁGINA MEJORADO
  if (remainingSpace > 30) {
    addFooter(doc, data)
  }

  doc.end()
}

function addLogo (doc: PDFKit.PDFDocument, logoPath: string): void {
  try {
    doc.image(logoPath, doc.page.margins.left, doc.page.margins.top, {
      width: styles.sizes.logo,
      height: styles.sizes.logo,
      align: 'center'
    })
    doc.y = doc.page.margins.top + styles.sizes.logo + 15
  } catch (error) {
    console.error('Error al cargar el logo:', error)
    doc.y = doc.page.margins.top
  }
}

function addHeader (doc: PDFKit.PDFDocument, data: PDFData, maxHeight: number): number {
  const startY = doc.y
  const textStartX = doc.page.margins.left + styles.sizes.logo + 20

  // Nombre - más destacado
  doc.fillColor(styles.colors.primary)
    .font(styles.fonts.title)
    .fontSize(styles.sizes.title)
    .text(`${data.nombre} ${data.apellidos}`, textStartX, startY, {
      width: doc.page.width - textStartX - doc.page.margins.right,
      align: 'left'
    })
    .moveDown(0.2)

  // Línea divisoria más elegante
  doc.strokeColor(styles.colors.accent)
    .lineWidth(1.5)
    .moveTo(textStartX, doc.y + 5)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y + 5)
    .stroke()
    .moveDown(0.8)

  // Datos de contacto con iconos sutiles
  const contactInfo = [
    `✉ ${data.email}`,
    `📱 ${data.telefono ?? 'No disponible'}`,
    `📍 ${data.pueblo}`
  ].filter(item => !item.includes('undefined')).join('   |   ')

  doc.fillColor(styles.colors.secondary)
    .font(styles.fonts.regular)
    .fontSize(styles.sizes.body)
    .text(contactInfo, textStartX, doc.y, {
      width: doc.page.width - textStartX - doc.page.margins.right,
      align: 'left',
      lineGap: 8
    })

  // Descripción personal con diseño mejorado
  if (data.descripcion !== '' && maxHeight > 100) {
    doc.moveDown(1.2)

    // Fondo sutil para el perfil
    doc.save()
      .rect(textStartX - 10, doc.y - 5, doc.page.width - textStartX - doc.page.margins.right + 10, 80)
      .fillOpacity(0.1)
      .fill(styles.colors.accent)
      .restore()

    doc.fillColor(styles.colors.primary)
      .font(styles.fonts.bold)
      .fontSize(styles.sizes.header)
      .text('PERFIL PROFESIONAL', textStartX, doc.y, {
        width: doc.page.width - textStartX - doc.page.margins.right,
        align: 'left'
      })

    doc.fillColor(styles.colors.secondary)
      .font(styles.fonts.regular)
      .fontSize(styles.sizes.body)
      .text(data.descripcion, textStartX, doc.y + 5, {
        width: doc.page.width - textStartX - doc.page.margins.right - 20,
        align: 'left',
        lineGap: 6,
        paragraphGap: 5
      })

    doc.moveDown(1.5)
  } else {
    doc.moveDown(1.8)
  }

  return doc.y - startY
}

function addLeftColumn (doc: PDFKit.PDFDocument, data: PDFData, width: number, _maxHeight: number): number {
  const startY = doc.y
  const cv = data.curriculum

  // 1. EDUCACIÓN ============================================
  addSectionTitle(doc, 'FORMACIÓN ACADÉMICA', width)

  cv.educacion.forEach(edu => {
    // Fondo sutil para cada item
    doc.save()
      .rect(doc.x - 5, doc.y - 3, width + 10, 40)
      .fillOpacity(0.05)
      .fill(styles.colors.accent)
      .restore()

    // Institución y título
    doc.fillColor(styles.colors.primary)
      .font(styles.fonts.bold)
      .fontSize(styles.sizes.body + 1)
      .text(edu.institucion, { lineGap: 3 })

    doc.fillColor(styles.colors.accent)
      .font(styles.fonts.italic)
      .text(edu.titulo)

    // Fechas con estilo mejorado
    doc.fillColor(styles.colors.secondary)
      .font(styles.fonts.regular)
      .fontSize(styles.sizes.small)
      .text(`${edu.fechaInicio} - ${edu.fechaFin}`, {
        lineGap: 5
      })

    // Descripción con mejor formato
    if (doc.y < doc.page.height - 100 && edu.descripcion !== '') {
      doc.moveDown(0.5)
      doc.fillColor(styles.colors.secondary)
        .font(styles.fonts.regular)
        .fontSize(styles.sizes.body)
        .text(edu.descripcion, {
          lineGap: 4,
          indent: 10
        })
    }

    doc.moveDown(1)
  })

  // 2. HABILIDADES ==========================================
  if (doc.y < doc.page.height - 100) {
    addSectionTitle(doc, 'HABILIDADES TÉCNICAS', width)

    // Barras de progreso para habilidades
    cv.habilidades.forEach(skill => {
      doc.fillColor(styles.colors.primary)
        .font(styles.fonts.bold)
        .fontSize(styles.sizes.body)
        .text(skill, { lineGap: 2 })

      // Barra de progreso sutil
      doc.save()
        .rect(doc.x, doc.y + 2, width * 0.8, 4)
        .fill(styles.colors.light)
        .rect(doc.x, doc.y + 2, width * 0.6, 4) // 60% de progreso como ejemplo
        .fill(styles.colors.accent)
        .restore()

      doc.moveDown(1.5)
    })
  }

  // 3. IDIOMAS (si existen en los datos)
  if (Array.isArray(data.idiomas) && doc.y < doc.page.height - 80) {
    addSectionTitle(doc, 'IDIOMAS', width)

    data.idiomas.forEach(idioma => {
      doc.fillColor(styles.colors.primary)
        .font(styles.fonts.bold)
        .fontSize(styles.sizes.body)
        .text(idioma.idioma, { lineGap: 2 })

      doc.fillColor(styles.colors.secondary)
        .font(styles.fonts.regular)
        .fontSize(styles.sizes.small)
        .text(`Nivel: ${idioma.nivel}`)

      doc.moveDown(1)
    })
  }

  return doc.y - startY
}

function addRightColumn (doc: PDFKit.PDFDocument, data: PDFData, width: number): number {
  const startY = doc.y
  const cv = data.curriculum

  // 1. EXPERIENCIA PROFESIONAL ===============================
  addSectionTitle(doc, 'EXPERIENCIA LABORAL', width)

  cv.experiencia.forEach((exp, index) => {
    // Fondo alternado para mejor legibilidad
    if (index % 2 === 0) {
      doc.save()
        .rect(doc.x - 5, doc.y - 5, width + 10, 80)
        .fillOpacity(0.03)
        .fill(styles.colors.accent)
        .restore()
    }

    // Cargo y empresa con mejor jerarquía
    doc.fillColor(styles.colors.primary)
      .font(styles.fonts.bold)
      .fontSize(styles.sizes.body + 1)
      .text(exp.cargo, { lineGap: 3 })

    doc.fillColor(styles.colors.accent)
      .font(styles.fonts.italic)
      .text(exp.empresa)

    // Fechas con estilo mejorado
    doc.fillColor(styles.colors.secondary)
      .font(styles.fonts.regular)
      .fontSize(styles.sizes.small)
      .text(`${exp.fechaInicio} - ${exp.fechaFin}`, {
        lineGap: 5
      })

    // Descripción con viñetas
    if (doc.y < doc.page.height - 50 && exp.descripcion !== '') {
      doc.moveDown(0.5)
      const bulletPoints = exp.descripcion.split('\n').filter(point => point.trim() !== '')

      bulletPoints.forEach(point => {
        doc.fillColor(styles.colors.secondary)
          .font(styles.fonts.regular)
          .fontSize(styles.sizes.body)
          .text(`• ${point.trim()}`, {
            lineGap: 4,
            indent: 10,
            width: width - 15
          })
      })
    }

    doc.moveDown(1.2)
  })

  // 2. PROYECTOS DESTACADOS =================================
  // if (cv.proyectos && doc.y < doc.page.height - 100) {
  //   addSectionTitle(doc, 'PROYECTOS DESTACADOS', width)

  //   cv.proyectos.forEach(proyecto => {
  //     doc.fillColor(styles.colors.primary)
  //       .font(styles.fonts.bold)
  //       .fontSize(styles.sizes.body)
  //       .text(proyecto.nombre, { lineGap: 2 })

  //     doc.fillColor(styles.colors.accent)
  //       .font(styles.fonts.italic)
  //       .text(proyecto.tecnologias.join(', '))

  //     if (proyecto.descripcion) {
  //       doc.moveDown(0.3)
  //       doc.fillColor(styles.colors.secondary)
  //         .font(styles.fonts.regular)
  //         .fontSize(styles.sizes.body)
  //         .text(proyecto.descripcion, {
  //           lineGap: 4,
  //           width: width - 5
  //         })
  //     }

  //     doc.moveDown(0.8)
  //   })
  // }

  // 3. RESUMEN PROFESIONAL ==================================
  if (doc.y < doc.page.height - 100 && cv.resumen !== '') {
    addSectionTitle(doc, 'LOGROS PROFESIONALES', width)

    // Fondo sutil para el resumen
    doc.save()
      .rect(doc.x - 5, doc.y - 5, width + 10, 120)
      .fillOpacity(0.05)
      .fill(styles.colors.accent)
      .restore()

    const bulletPoints = cv.resumen.split('\n').filter(point => point.trim() !== '')

    bulletPoints.forEach(point => {
      doc.fillColor(styles.colors.secondary)
        .font(styles.fonts.regular)
        .fontSize(styles.sizes.body)
        .text(`✓ ${point.trim()}`, {
          lineGap: 6,
          indent: 10,
          width: width - 15
        })
    })
  }

  return doc.y - startY
}

function addSectionTitle (doc: PDFKit.PDFDocument, title: string, width: number): void {
  doc.save()
    .fillColor(styles.colors.primary)
    .font(styles.fonts.bold)
    .fontSize(styles.sizes.header + 1)
    .text(title.toUpperCase(), { lineGap: 3 })
    .restore()

  // Subrayado más elegante
  doc.save()
    .strokeColor(styles.colors.accent)
    .lineWidth(2)
    .moveTo(doc.x, doc.y - 3)
    .lineTo(doc.x + width * 0.25, doc.y - 3)
    .stroke()
    .restore()

  doc.moveDown(1)
}

function addFooter (doc: PDFKit.PDFDocument, data: PDFData): void {
  const footerText = `CV generado el ${new Date().toLocaleDateString()} | ${data.nombre} ${data.apellidos}`

  doc.save()
    .fillColor(styles.colors.secondary)
    .fontSize(styles.sizes.small)
    .text(footerText,
      doc.page.margins.left,
      doc.page.height - 30,
      {
        align: 'center',
        width: doc.page.width - doc.page.margins.left - doc.page.margins.right
      }
    )
    .restore()
}
