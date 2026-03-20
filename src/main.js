import './style.css'
import { templates } from './templates.js'

const SIZE_PRESETS = [
  { id: 'twitter',  label: 'Twitter / X',  w: 1200, h: 630 },
  { id: 'facebook', label: 'Facebook',      w: 1200, h: 630 },
  { id: 'linkedin', label: 'LinkedIn',      w: 1200, h: 675 },
  { id: 'custom',   label: 'Custom',        w: 1200, h: 630 },
]

const FONTS = [
  { id: 'Inter',            label: 'Inter' },
  { id: 'Poppins',          label: 'Poppins' },
  { id: 'JetBrains Mono',   label: 'JetBrains Mono' },
  { id: 'Noto Sans TC',     label: 'Noto Sans TC' },
]

// ─── State ───
const state = {
  template: templates[0].id,
  title: 'Your Amazing Title Here',
  subtitle: 'Create beautiful social media preview images in seconds',
  author: 'OGCard',
  accentColor: '#6366f1',
  fontFamily: 'Inter',
  sizePreset: 'twitter',
  width: 1200,
  height: 630,
  hd: false,
  logoImg: null,
}

// ─── Render App ───
document.querySelector('#app').innerHTML = `
<header class="border-b border-surface-border bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
    <div class="flex items-center gap-2.5">
      <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
        </svg>
      </div>
      <span class="text-lg font-bold text-white tracking-tight">OGCard</span>
      <span class="hidden sm:inline text-xs text-gray-500 ml-1">Beautiful OG images, free</span>
    </div>
    <a href="https://github.com" target="_blank" class="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
    </a>
  </div>
</header>

<main class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
  <div class="flex flex-col lg:flex-row gap-6">
    <!-- Left: Controls -->
    <div class="w-full lg:w-80 xl:w-96 shrink-0 space-y-5">
      <!-- Templates -->
      <section>
        <h3 class="text-sm font-semibold text-gray-200 mb-3 uppercase tracking-wider">Template</h3>
        <div id="template-grid" class="grid grid-cols-4 gap-2"></div>
      </section>

      <!-- Text -->
      <section class="space-y-3">
        <h3 class="text-sm font-semibold text-gray-200 mb-1 uppercase tracking-wider">Content</h3>
        <div>
          <label class="control-label" for="input-title">Title</label>
          <input id="input-title" type="text" class="control-input" maxlength="80" placeholder="Your title..." value="${state.title}" />
          <div id="title-count" class="char-count">${state.title.length}/80</div>
        </div>
        <div>
          <label class="control-label" for="input-subtitle">Subtitle</label>
          <input id="input-subtitle" type="text" class="control-input" maxlength="120" placeholder="A brief description..." value="${state.subtitle}" />
          <div id="subtitle-count" class="char-count">${state.subtitle.length}/120</div>
        </div>
        <div>
          <label class="control-label" for="input-author">Author / Brand</label>
          <input id="input-author" type="text" class="control-input" maxlength="40" placeholder="Your name or brand" value="${state.author}" />
        </div>
      </section>

      <!-- Logo upload -->
      <section>
        <label class="control-label">Logo / Image (optional)</label>
        <label id="logo-upload-area" class="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-surface-border px-4 py-3 text-sm text-gray-400 cursor-pointer hover:border-primary hover:text-gray-300 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          <span id="logo-label">Upload logo</span>
          <input id="input-logo" type="file" accept="image/*" class="hidden" />
        </label>
        <button id="btn-remove-logo" class="hidden mt-1 text-xs text-red-400 hover:text-red-300 cursor-pointer">Remove logo</button>
      </section>

      <!-- Style -->
      <section class="space-y-3">
        <h3 class="text-sm font-semibold text-gray-200 mb-1 uppercase tracking-wider">Style</h3>
        <div class="flex items-end gap-3">
          <div class="flex-1">
            <label class="control-label" for="input-font">Font</label>
            <select id="input-font" class="control-select"></select>
          </div>
          <div>
            <label class="control-label" for="input-color">Accent</label>
            <input id="input-color" type="color" value="${state.accentColor}" />
          </div>
        </div>
      </section>

      <!-- Size -->
      <section class="space-y-3">
        <h3 class="text-sm font-semibold text-gray-200 mb-1 uppercase tracking-wider">Size</h3>
        <div class="flex flex-wrap gap-2" id="size-presets"></div>
        <div id="custom-size" class="hidden flex gap-2">
          <div class="flex-1">
            <label class="control-label" for="input-width">Width</label>
            <input id="input-width" type="number" class="control-input" value="${state.width}" min="200" max="4000" />
          </div>
          <div class="flex-1">
            <label class="control-label" for="input-height">Height</label>
            <input id="input-height" type="number" class="control-input" value="${state.height}" min="200" max="4000" />
          </div>
        </div>
        <label class="flex items-center gap-2 text-sm text-gray-300 cursor-pointer select-none">
          <input id="input-hd" type="checkbox" class="w-4 h-4 rounded accent-primary" />
          <span>2x HD export</span>
        </label>
      </section>
    </div>

    <!-- Right: Preview & Export -->
    <div class="flex-1 flex flex-col gap-4 min-w-0">
      <div class="relative bg-gray-900/50 rounded-xl border border-surface-border p-4 sm:p-6 flex items-center justify-center min-h-[300px]">
        <div id="canvas-wrapper" class="relative">
          <canvas id="preview-canvas"></canvas>
        </div>
        <div class="absolute top-3 right-3 text-xs text-gray-500" id="size-label"></div>
      </div>

      <!-- Export buttons -->
      <div class="flex flex-wrap gap-3">
        <button id="btn-download" class="btn-primary flex-1 sm:flex-none">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download PNG
        </button>
        <button id="btn-copy" class="btn-secondary flex-1 sm:flex-none">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          Copy to Clipboard
        </button>
      </div>
    </div>
  </div>
</main>

<footer class="border-t border-surface-border mt-12 py-6 text-center text-sm text-gray-500">
  OGCard — Free, no signup, no watermark. 100% client-side.
</footer>
`

// ─── DOM refs ───
const $ = (sel) => document.querySelector(sel)
const canvas = $('#preview-canvas')
const ctx = canvas.getContext('2d')

// ─── Init template grid ───
function renderTemplateGrid() {
  const grid = $('#template-grid')
  grid.innerHTML = templates.map(t => {
    const grad = `linear-gradient(135deg, ${t.preview[0]}, ${t.preview[1]}, ${t.preview[2]})`
    const isLight = t.id === 'minimal-clean'
    return `<div class="template-card ${t.id === state.template ? 'active' : ''}" data-template="${t.id}" title="${t.name}">
      <div class="aspect-[1200/630] rounded" style="background:${grad}"></div>
      <div class="absolute inset-0 flex items-end p-1.5">
        <span class="text-[10px] font-medium ${isLight ? 'text-gray-700' : 'text-white/70'} truncate">${t.name}</span>
      </div>
    </div>`
  }).join('')

  grid.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', () => {
      state.template = card.dataset.template
      grid.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'))
      card.classList.add('active')
      renderCanvas()
    })
  })
}

// ─── Init font select ───
function renderFontSelect() {
  const sel = $('#input-font')
  sel.innerHTML = FONTS.map(f =>
    `<option value="${f.id}" ${f.id === state.fontFamily ? 'selected' : ''} style="font-family:'${f.id}'">${f.label}</option>`
  ).join('')
}

// ─── Init size presets ───
function renderSizePresets() {
  const container = $('#size-presets')
  container.innerHTML = SIZE_PRESETS.map(p =>
    `<button class="btn-secondary text-xs !px-3 !py-1.5 ${p.id === state.sizePreset ? '!border-primary !text-white' : ''}" data-preset="${p.id}">${p.label}</button>`
  ).join('')

  container.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      state.sizePreset = btn.dataset.preset
      const preset = SIZE_PRESETS.find(p => p.id === btn.dataset.preset)
      if (preset.id !== 'custom') {
        state.width = preset.w
        state.height = preset.h
        $('#custom-size').classList.add('hidden')
      } else {
        $('#custom-size').classList.remove('hidden')
      }
      renderSizePresets()
      renderCanvas()
    })
  })
}

// ─── Canvas rendering ───
function renderCanvas() {
  const scale = state.hd ? 2 : 1
  const w = state.width
  const h = state.height
  canvas.width = w * scale
  canvas.height = h * scale
  ctx.scale(scale, scale)

  // Fit preview
  const wrapper = $('#canvas-wrapper')
  const containerW = wrapper.parentElement.clientWidth - 48
  const containerH = Math.max(300, window.innerHeight * 0.5)
  const scaleX = containerW / w
  const scaleY = containerH / h
  const fitScale = Math.min(scaleX, scaleY, 1)
  canvas.style.width = `${w * fitScale}px`
  canvas.style.height = `${h * fitScale}px`

  // Size label
  $('#size-label').textContent = `${w}×${h}${state.hd ? ' @2x' : ''}`

  // Render template
  const tmpl = templates.find(t => t.id === state.template)
  if (tmpl) {
    ctx.save()
    tmpl.render(ctx, w, h, {
      title: state.title || 'Your Title',
      subtitle: state.subtitle,
      author: state.author,
      accentColor: state.accentColor,
      fontFamily: `'${state.fontFamily}'`,
      logoImg: state.logoImg,
    })
    ctx.restore()
  }
}

// ─── Char count helper ───
function updateCharCount(input, countEl, max) {
  const len = input.value.length
  countEl.textContent = `${len}/${max}`
  countEl.classList.remove('warn', 'over')
  if (len >= max) countEl.classList.add('over')
  else if (len >= max * 0.8) countEl.classList.add('warn')
}

// ─── Event bindings ───
function bindEvents() {
  const titleInput = $('#input-title')
  const subtitleInput = $('#input-subtitle')
  const authorInput = $('#input-author')

  titleInput.addEventListener('input', () => {
    state.title = titleInput.value
    updateCharCount(titleInput, $('#title-count'), 80)
    renderCanvas()
  })
  subtitleInput.addEventListener('input', () => {
    state.subtitle = subtitleInput.value
    updateCharCount(subtitleInput, $('#subtitle-count'), 120)
    renderCanvas()
  })
  authorInput.addEventListener('input', () => {
    state.author = authorInput.value
    renderCanvas()
  })

  $('#input-font').addEventListener('change', (e) => {
    state.fontFamily = e.target.value
    renderCanvas()
  })
  $('#input-color').addEventListener('input', (e) => {
    state.accentColor = e.target.value
    renderCanvas()
  })
  $('#input-hd').addEventListener('change', (e) => {
    state.hd = e.target.checked
    renderCanvas()
  })
  $('#input-width').addEventListener('input', (e) => {
    state.width = Math.max(200, Math.min(4000, parseInt(e.target.value) || 1200))
    renderCanvas()
  })
  $('#input-height').addEventListener('input', (e) => {
    state.height = Math.max(200, Math.min(4000, parseInt(e.target.value) || 630))
    renderCanvas()
  })

  // Logo upload
  $('#input-logo').addEventListener('change', (e) => {
    const file = e.target.files[0]
    if (!file) return
    const img = new Image()
    img.onload = () => {
      state.logoImg = img
      $('#logo-label').textContent = file.name
      $('#btn-remove-logo').classList.remove('hidden')
      renderCanvas()
    }
    img.src = URL.createObjectURL(file)
  })
  $('#btn-remove-logo').addEventListener('click', () => {
    state.logoImg = null
    $('#input-logo').value = ''
    $('#logo-label').textContent = 'Upload logo'
    $('#btn-remove-logo').classList.add('hidden')
    renderCanvas()
  })

  // Download
  $('#btn-download').addEventListener('click', () => {
    const link = document.createElement('a')
    link.download = `ogcard-${state.width}x${state.height}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  })

  // Copy to clipboard
  $('#btn-copy').addEventListener('click', async () => {
    try {
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      const btn = $('#btn-copy')
      const original = btn.innerHTML
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!'
      setTimeout(() => { btn.innerHTML = original }, 2000)
    } catch {
      alert('Could not copy to clipboard. Try downloading instead.')
    }
  })

  // Resize handler
  let resizeTimer
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(renderCanvas, 100)
  })
}

// ─── Init ───
renderTemplateGrid()
renderFontSelect()
renderSizePresets()
bindEvents()
// Delay first render slightly to ensure fonts are loaded
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(renderCanvas)
} else {
  setTimeout(renderCanvas, 200)
}
