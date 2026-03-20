/**
 * OGCard Templates
 * Each template exports a render(ctx, w, h, state) function
 * state: { title, subtitle, author, accentColor, fontFamily, logoImg }
 */

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

function drawText(ctx, text, x, y, maxWidth, font, color, align = 'left') {
  ctx.font = font
  ctx.fillStyle = color
  ctx.textAlign = align
  ctx.textBaseline = 'top'

  // Word wrap
  const words = text.split(' ')
  const lines = []
  let currentLine = ''

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  }
  if (currentLine) lines.push(currentLine)

  const lineHeight = parseInt(font) * 1.3
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y + i * lineHeight, maxWidth)
  }
  return lines.length * lineHeight
}

function drawLogo(ctx, logoImg, w, h, size = 60) {
  if (!logoImg) return
  const padding = 40
  const aspect = logoImg.naturalWidth / logoImg.naturalHeight
  const drawW = aspect >= 1 ? size : size * aspect
  const drawH = aspect >= 1 ? size / aspect : size
  ctx.drawImage(logoImg, w - padding - drawW, padding, drawW, drawH)
}

// ─── Template: Gradient Wave ───
function gradientWave(ctx, w, h, state) {
  const { title, subtitle, author, accentColor, fontFamily, logoImg } = state
  const rgb = hexToRgb(accentColor)

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, w, h)
  grad.addColorStop(0, accentColor)
  grad.addColorStop(0.5, `rgba(${rgb.r}, ${Math.max(0, rgb.g - 40)}, ${Math.min(255, rgb.b + 60)}, 1)`)
  grad.addColorStop(1, `rgba(${Math.max(0, rgb.r - 60)}, ${rgb.g}, ${Math.min(255, rgb.b + 80)}, 1)`)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)

  // Decorative waves
  ctx.globalAlpha = 0.15
  for (let i = 0; i < 3; i++) {
    ctx.beginPath()
    ctx.moveTo(0, h * 0.5 + i * 60)
    for (let x = 0; x <= w; x += 10) {
      ctx.lineTo(x, h * 0.5 + i * 60 + Math.sin(x * 0.008 + i * 1.5) * 80)
    }
    ctx.lineTo(w, h)
    ctx.lineTo(0, h)
    ctx.closePath()
    ctx.fillStyle = '#ffffff'
    ctx.fill()
  }
  ctx.globalAlpha = 1

  // Text
  const padding = 60
  const titleH = drawText(ctx, title, padding, padding + 20, w - padding * 2 - 80, `bold ${Math.round(w * 0.045)}px ${fontFamily}`, '#ffffff')
  if (subtitle) drawText(ctx, subtitle, padding, padding + 30 + titleH, w - padding * 2 - 80, `${Math.round(w * 0.022)}px ${fontFamily}`, 'rgba(255,255,255,0.85)')
  if (author) {
    ctx.font = `500 ${Math.round(w * 0.018)}px ${fontFamily}`
    ctx.fillStyle = 'rgba(255,255,255,0.7)'
    ctx.textAlign = 'left'
    ctx.fillText(author, padding, h - padding - 10)
  }
  drawLogo(ctx, logoImg, w, h)
}

// ─── Template: Dark Elegant ───
function darkElegant(ctx, w, h, state) {
  const { title, subtitle, author, accentColor, fontFamily, logoImg } = state

  // Dark background
  ctx.fillStyle = '#1a1a2e'
  ctx.fillRect(0, 0, w, h)

  // Dot grid pattern
  ctx.fillStyle = 'rgba(255,255,255,0.03)'
  for (let x = 0; x < w; x += 30) {
    for (let y = 0; y < h; y += 30) {
      ctx.beginPath()
      ctx.arc(x, y, 1.5, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Accent line at top
  const grad = ctx.createLinearGradient(0, 0, w, 0)
  grad.addColorStop(0, accentColor)
  grad.addColorStop(1, 'transparent')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, 4)

  // Text
  const padding = 60
  const titleH = drawText(ctx, title, padding, h * 0.25, w - padding * 2 - 80, `bold ${Math.round(w * 0.045)}px ${fontFamily}`, '#e2e8f0')
  if (subtitle) drawText(ctx, subtitle, padding, h * 0.25 + titleH + 16, w - padding * 2 - 80, `${Math.round(w * 0.022)}px ${fontFamily}`, '#94a3b8')
  if (author) {
    ctx.font = `500 ${Math.round(w * 0.018)}px ${fontFamily}`
    ctx.fillStyle = accentColor
    ctx.textAlign = 'left'
    ctx.fillText(author, padding, h - padding - 10)
  }

  // Corner decoration
  ctx.strokeStyle = accentColor
  ctx.lineWidth = 2
  ctx.globalAlpha = 0.3
  ctx.strokeRect(padding - 10, padding - 10, 40, 40)
  ctx.strokeRect(w - padding - 30, h - padding - 30, 40, 40)
  ctx.globalAlpha = 1

  drawLogo(ctx, logoImg, w, h)
}

// ─── Template: Minimal Clean ───
function minimalClean(ctx, w, h, state) {
  const { title, subtitle, author, accentColor, fontFamily, logoImg } = state

  // White bg
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, w, h)

  // Left accent bar
  ctx.fillStyle = accentColor
  ctx.fillRect(0, 0, 8, h)

  // Text
  const padding = 70
  const titleH = drawText(ctx, title, padding, h * 0.28, w - padding * 2 - 80, `bold ${Math.round(w * 0.042)}px ${fontFamily}`, '#1a1a1a')
  if (subtitle) drawText(ctx, subtitle, padding, h * 0.28 + titleH + 16, w - padding * 2 - 80, `${Math.round(w * 0.02)}px ${fontFamily}`, '#6b7280')

  // Author with accent dot
  if (author) {
    const dotSize = 8
    const authorY = h - padding
    ctx.beginPath()
    ctx.arc(padding + dotSize / 2, authorY - 4, dotSize / 2, 0, Math.PI * 2)
    ctx.fillStyle = accentColor
    ctx.fill()
    ctx.font = `500 ${Math.round(w * 0.018)}px ${fontFamily}`
    ctx.fillStyle = '#4b5563'
    ctx.textAlign = 'left'
    ctx.fillText(author, padding + dotSize + 10, authorY - 14)
  }
  drawLogo(ctx, logoImg, w, h)
}

// ─── Template: Code Editor ───
function codeEditor(ctx, w, h, state) {
  const { title, subtitle, author, accentColor, fontFamily, logoImg } = state

  // Editor background
  ctx.fillStyle = '#1e1e1e'
  ctx.fillRect(0, 0, w, h)

  // Title bar
  ctx.fillStyle = '#2d2d2d'
  ctx.fillRect(0, 0, w, 44)

  // Traffic lights
  const dotColors = ['#ff5f57', '#ffbd2e', '#28c840']
  dotColors.forEach((color, i) => {
    ctx.beginPath()
    ctx.arc(24 + i * 24, 22, 7, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
  })

  // Tab
  ctx.fillStyle = '#1e1e1e'
  const tabW = 180
  ctx.fillRect(100, 0, tabW, 44)
  ctx.font = `13px 'JetBrains Mono', monospace`
  ctx.fillStyle = '#cccccc'
  ctx.textAlign = 'left'
  ctx.fillText('preview.og', 114, 27)

  // Line numbers gutter
  ctx.fillStyle = '#252526'
  ctx.fillRect(0, 44, 50, h - 44)
  ctx.font = `14px 'JetBrains Mono', monospace`
  ctx.fillStyle = '#858585'
  ctx.textAlign = 'right'
  for (let i = 1; i <= 20; i++) {
    ctx.fillText(String(i), 40, 44 + i * 24 + 4)
  }

  // Code-style content
  const codeX = 70
  let lineY = 80

  // Comment
  ctx.font = `${Math.round(w * 0.016)}px 'JetBrains Mono', monospace`
  ctx.fillStyle = '#6a9955'
  ctx.textAlign = 'left'
  ctx.fillText('// OG Card Preview', codeX, lineY)
  lineY += 36

  // Title as string
  ctx.fillStyle = '#569cd6'
  ctx.fillText('const ', codeX, lineY)
  const constW = ctx.measureText('const ').width
  ctx.fillStyle = '#9cdcfe'
  ctx.fillText('title', codeX + constW, lineY)
  const varW = ctx.measureText('title').width
  ctx.fillStyle = '#d4d4d4'
  ctx.fillText(' = ', codeX + constW + varW, lineY)
  const eqW = ctx.measureText(' = ').width
  ctx.fillStyle = '#ce9178'
  const displayTitle = title.length > 40 ? title.slice(0, 40) + '...' : title
  ctx.fillText(`"${displayTitle}"`, codeX + constW + varW + eqW, lineY)
  lineY += 36

  // Subtitle
  if (subtitle) {
    ctx.fillStyle = '#569cd6'
    ctx.fillText('const ', codeX, lineY)
    ctx.fillStyle = '#9cdcfe'
    ctx.fillText('desc', codeX + constW, lineY)
    const descW = ctx.measureText('desc').width
    ctx.fillStyle = '#d4d4d4'
    ctx.fillText(' = ', codeX + constW + descW, lineY)
    ctx.fillStyle = '#ce9178'
    const displaySub = subtitle.length > 50 ? subtitle.slice(0, 50) + '...' : subtitle
    ctx.fillText(`"${displaySub}"`, codeX + constW + descW + eqW, lineY)
    lineY += 36
  }

  lineY += 24

  // Big title overlay
  ctx.font = `bold ${Math.round(w * 0.04)}px ${fontFamily}`
  ctx.fillStyle = '#e2e8f0'
  ctx.globalAlpha = 0.9
  const titleH = drawText(ctx, title, codeX, lineY, w - codeX - 80, `bold ${Math.round(w * 0.04)}px ${fontFamily}`, '#e2e8f0')
  ctx.globalAlpha = 1

  if (subtitle) {
    drawText(ctx, subtitle, codeX, lineY + titleH + 12, w - codeX - 80, `${Math.round(w * 0.02)}px ${fontFamily}`, '#94a3b8')
  }

  // Author in status bar
  ctx.fillStyle = accentColor
  ctx.fillRect(0, h - 28, w, 28)
  if (author) {
    ctx.font = `13px 'JetBrains Mono', monospace`
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'left'
    ctx.fillText(author, 16, h - 10)
  }
  drawLogo(ctx, logoImg, w, h, 40)
}

// ─── Template: Geometric ───
function geometric(ctx, w, h, state) {
  const { title, subtitle, author, accentColor, fontFamily, logoImg } = state
  const rgb = hexToRgb(accentColor)

  // Background
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, w, h)

  // Geometric shapes
  ctx.globalAlpha = 0.08
  const shapes = [
    { x: w * 0.7, y: h * 0.1, size: 200, rot: 0.3 },
    { x: w * 0.85, y: h * 0.6, size: 150, rot: 0.8 },
    { x: w * 0.15, y: h * 0.75, size: 100, rot: 1.2 },
    { x: w * 0.6, y: h * 0.8, size: 80, rot: 2.1 },
  ]
  shapes.forEach(s => {
    ctx.save()
    ctx.translate(s.x, s.y)
    ctx.rotate(s.rot)
    ctx.strokeStyle = accentColor
    ctx.lineWidth = 2
    // Triangle
    ctx.beginPath()
    ctx.moveTo(0, -s.size / 2)
    ctx.lineTo(s.size / 2, s.size / 2)
    ctx.lineTo(-s.size / 2, s.size / 2)
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
  })

  // Circles
  ctx.beginPath()
  ctx.arc(w * 0.8, h * 0.3, 120, 0, Math.PI * 2)
  ctx.strokeStyle = accentColor
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(w * 0.75, h * 0.35, 80, 0, Math.PI * 2)
  ctx.stroke()
  ctx.globalAlpha = 1

  // Accent bar
  ctx.fillStyle = accentColor
  ctx.fillRect(60, h * 0.25 - 10, 4, 100)

  // Text
  const padding = 80
  const titleH = drawText(ctx, title, padding, h * 0.25, w * 0.55, `bold ${Math.round(w * 0.042)}px ${fontFamily}`, '#f1f5f9')
  if (subtitle) drawText(ctx, subtitle, padding, h * 0.25 + titleH + 16, w * 0.55, `${Math.round(w * 0.02)}px ${fontFamily}`, '#94a3b8')
  if (author) {
    ctx.font = `500 ${Math.round(w * 0.018)}px ${fontFamily}`
    ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`
    ctx.textAlign = 'left'
    ctx.fillText(author, padding, h - 50)
  }
  drawLogo(ctx, logoImg, w, h)
}

// ─── Template: Sunset Gradient ───
function sunsetGradient(ctx, w, h, state) {
  const { title, subtitle, author, accentColor, fontFamily, logoImg } = state

  // Warm gradient
  const grad = ctx.createLinearGradient(0, 0, w, h)
  grad.addColorStop(0, '#f97316')
  grad.addColorStop(0.4, '#ec4899')
  grad.addColorStop(1, '#8b5cf6')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)

  // Sun circle
  ctx.globalAlpha = 0.15
  ctx.beginPath()
  ctx.arc(w * 0.8, h * 0.35, 180, 0, Math.PI * 2)
  ctx.fillStyle = '#ffffff'
  ctx.fill()
  ctx.beginPath()
  ctx.arc(w * 0.8, h * 0.35, 130, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalAlpha = 1

  // Text card overlay
  ctx.fillStyle = 'rgba(0,0,0,0.25)'
  ctx.beginPath()
  ctx.roundRect(40, 40, w - 80, h - 80, 20)
  ctx.fill()

  const padding = 70
  const titleH = drawText(ctx, title, padding, padding + 20, w - padding * 2 - 60, `bold ${Math.round(w * 0.045)}px ${fontFamily}`, '#ffffff')
  if (subtitle) drawText(ctx, subtitle, padding, padding + 30 + titleH, w - padding * 2 - 60, `${Math.round(w * 0.022)}px ${fontFamily}`, 'rgba(255,255,255,0.85)')
  if (author) {
    ctx.font = `600 ${Math.round(w * 0.018)}px ${fontFamily}`
    ctx.fillStyle = 'rgba(255,255,255,0.7)'
    ctx.textAlign = 'left'
    ctx.fillText(author, padding, h - padding - 10)
  }
  drawLogo(ctx, logoImg, w, h)
}

// ─── Template: Ocean Blue ───
function oceanBlue(ctx, w, h, state) {
  const { title, subtitle, author, accentColor, fontFamily, logoImg } = state

  // Cool blue gradient
  const grad = ctx.createLinearGradient(0, 0, w * 0.5, h)
  grad.addColorStop(0, '#0c4a6e')
  grad.addColorStop(0.5, '#0369a1')
  grad.addColorStop(1, '#0284c7')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)

  // Wave decoration at bottom
  ctx.globalAlpha = 0.1
  for (let i = 0; i < 4; i++) {
    ctx.beginPath()
    ctx.moveTo(0, h * 0.7 + i * 40)
    for (let x = 0; x <= w; x += 5) {
      ctx.lineTo(x, h * 0.7 + i * 40 + Math.sin(x * 0.006 + i * 2) * 50)
    }
    ctx.lineTo(w, h)
    ctx.lineTo(0, h)
    ctx.closePath()
    ctx.fillStyle = '#ffffff'
    ctx.fill()
  }
  ctx.globalAlpha = 1

  // Accent line
  ctx.fillStyle = '#38bdf8'
  ctx.fillRect(60, h * 0.22, 50, 4)

  // Text
  const padding = 60
  const titleH = drawText(ctx, title, padding, h * 0.28, w - padding * 2 - 80, `bold ${Math.round(w * 0.045)}px ${fontFamily}`, '#f0f9ff')
  if (subtitle) drawText(ctx, subtitle, padding, h * 0.28 + titleH + 16, w - padding * 2 - 80, `${Math.round(w * 0.022)}px ${fontFamily}`, '#bae6fd')
  if (author) {
    ctx.font = `500 ${Math.round(w * 0.018)}px ${fontFamily}`
    ctx.fillStyle = '#7dd3fc'
    ctx.textAlign = 'left'
    ctx.fillText(author, padding, h - padding - 10)
  }
  drawLogo(ctx, logoImg, w, h)
}

// ─── Template: Neon Glow ───
function neonGlow(ctx, w, h, state) {
  const { title, subtitle, author, accentColor, fontFamily, logoImg } = state
  const rgb = hexToRgb(accentColor)

  // Dark background
  ctx.fillStyle = '#0a0a0a'
  ctx.fillRect(0, 0, w, h)

  // Noise-like grid
  ctx.strokeStyle = 'rgba(255,255,255,0.03)'
  ctx.lineWidth = 1
  for (let x = 0; x < w; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
  }
  for (let y = 0; y < h; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
  }

  // Neon border
  const borderPad = 30
  ctx.strokeStyle = accentColor
  ctx.lineWidth = 3
  ctx.shadowColor = accentColor
  ctx.shadowBlur = 20
  ctx.beginPath()
  ctx.roundRect(borderPad, borderPad, w - borderPad * 2, h - borderPad * 2, 16)
  ctx.stroke()
  ctx.shadowBlur = 0

  // Glow circles
  ctx.globalAlpha = 0.05
  const glowGrad = ctx.createRadialGradient(w * 0.3, h * 0.4, 0, w * 0.3, h * 0.4, 300)
  glowGrad.addColorStop(0, accentColor)
  glowGrad.addColorStop(1, 'transparent')
  ctx.fillStyle = glowGrad
  ctx.fillRect(0, 0, w, h)
  const glowGrad2 = ctx.createRadialGradient(w * 0.8, h * 0.7, 0, w * 0.8, h * 0.7, 250)
  glowGrad2.addColorStop(0, accentColor)
  glowGrad2.addColorStop(1, 'transparent')
  ctx.fillStyle = glowGrad2
  ctx.fillRect(0, 0, w, h)
  ctx.globalAlpha = 1

  // Text
  const padding = 60
  ctx.shadowColor = accentColor
  ctx.shadowBlur = 10
  const titleH = drawText(ctx, title, padding, h * 0.25, w - padding * 2 - 80, `bold ${Math.round(w * 0.045)}px ${fontFamily}`, '#ffffff')
  ctx.shadowBlur = 0
  if (subtitle) drawText(ctx, subtitle, padding, h * 0.25 + titleH + 16, w - padding * 2 - 80, `${Math.round(w * 0.022)}px ${fontFamily}`, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`)
  if (author) {
    ctx.font = `500 ${Math.round(w * 0.018)}px ${fontFamily}`
    ctx.fillStyle = accentColor
    ctx.shadowColor = accentColor
    ctx.shadowBlur = 8
    ctx.textAlign = 'left'
    ctx.fillText(author, padding, h - padding - 10)
    ctx.shadowBlur = 0
  }
  drawLogo(ctx, logoImg, w, h)
}

// ─── Template registry ───
export const templates = [
  { id: 'gradient-wave',   name: 'Gradient Wave',   render: gradientWave,   preview: ['#6366f1', '#4f46e5', '#7c3aed'] },
  { id: 'dark-elegant',    name: 'Dark Elegant',    render: darkElegant,    preview: ['#1a1a2e', '#2d2d4e', '#1a1a2e'] },
  { id: 'minimal-clean',   name: 'Minimal Clean',   render: minimalClean,   preview: ['#ffffff', '#f8fafc', '#ffffff'] },
  { id: 'code-editor',     name: 'Code Editor',     render: codeEditor,     preview: ['#1e1e1e', '#2d2d2d', '#1e1e1e'] },
  { id: 'geometric',       name: 'Geometric',       render: geometric,      preview: ['#0f172a', '#1e293b', '#0f172a'] },
  { id: 'sunset-gradient', name: 'Sunset Gradient', render: sunsetGradient, preview: ['#f97316', '#ec4899', '#8b5cf6'] },
  { id: 'ocean-blue',      name: 'Ocean Blue',      render: oceanBlue,      preview: ['#0c4a6e', '#0369a1', '#0284c7'] },
  { id: 'neon-glow',       name: 'Neon Glow',       render: neonGlow,       preview: ['#0a0a0a', '#1a1a1a', '#0a0a0a'] },
]
