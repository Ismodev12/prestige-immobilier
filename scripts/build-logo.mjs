// Génère les variantes du logo Prestige Immobilier à partir du fichier fourni (fond blanc JPG) :
//   public/brand/logo.webp        logo complet, fond transparent
//   public/brand/logo-light.webp  logo complet pour fond bleu marine (marine converti en blanc, or conservé)
//   public/brand/emblem.webp      emblème seul (maison et immeubles), fond transparent
//   public/brand/emblem-light.webp emblème pour fond bleu marine
// Les tons dorés du fichier d'origine sont convertis en corail (#D85C45), couleur d'accent de la charte.
// Usage : node scripts/build-logo.mjs
import sharp from 'sharp'
import fs from 'node:fs/promises'

const src = 'src/assets/brand/logo-original.jpg'
await fs.mkdir('public/brand', { recursive: true })

// Retire le fond blanc par démixage : chaque pixel est considéré comme couleur * alpha + blanc * (1 - alpha).
async function unmix(input, { light = false, eraseNavyBelow = Infinity } = {}) {
  const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const out = Buffer.alloc(info.width * info.height * 4)
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const min = Math.min(r, g, b)
    let a = Math.min(1, (255 - min) / 215)
    if (a < 0.04) a = 0
    const un = (c) => (a === 0 ? 0 : Math.max(0, Math.min(255, Math.round(255 - (255 - c) / a))))
    let R = un(r), G = un(g), B = un(b)
    // Pixels bleu marine (bleu dominant, faible saturation chaude) convertis en blanc pour la version claire.
    const isNavy = B >= R && B >= G - 4 && R < 120
    // Emblème : efface les lettres marine du mot « Prestige » situées sous l'arc doré.
    if (isNavy && Math.floor(j / 4 / info.width) > eraseNavyBelow) a = 0
    if (light && isNavy) { R = 255; G = 255; B = 255 }
    // Or vers corail : on conserve les variations de lumière (reflets, ombres) du doré d'origine.
    if (!isNavy && R > B + 30) {
      const k = Math.max(0.55, Math.min(1.35, (R + G + B) / 3 / 140))
      const mix = (c) => Math.max(0, Math.min(255, Math.round(k <= 1 ? c * k : c + (255 - c) * (k - 1) * 0.9)))
      R = mix(216); G = mix(92); B = mix(69)
    }
    out[j] = R; out[j + 1] = G; out[j + 2] = B; out[j + 3] = Math.round(a * 255)
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
}

const meta = await sharp(src).metadata()
const full = await sharp(src).trim({ threshold: 18 }).toBuffer()
const emblemBox = { left: 150, top: 30, width: meta.width - 300, height: 345 }
const emblem = await sharp(src).extract(emblemBox).toBuffer()

for (const [name, buf, erase] of [['logo', full, Infinity], ['emblem', emblem, 268]]) {
  for (const light of [false, true]) {
    const file = `public/brand/${name}${light ? '-light' : ''}.webp`
    const img = await sharp(await (await unmix(buf, { light, eraseNavyBelow: erase })).png().toBuffer()).trim()
    const info = await img.resize({ width: name === 'logo' ? 640 : 360 }).webp({ quality: 92, alphaQuality: 100 }).toFile(file)
    console.log(file, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)} Ko`)
  }
}
