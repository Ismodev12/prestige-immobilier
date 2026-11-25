// Convertit les photos référencées dans images.manifest.js en WebP optimisé (public/images).
// Usage :
//   npm run images                 télécharge depuis Unsplash puis convertit
//   npm run images -- <dossier>    convertit des JPG déjà téléchargés (<nom>.jpg)
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'
import { images } from './images.manifest.js'

const out = path.resolve('public/images')
const localDir = process.argv[2]
const manualCrops = { 'avatar-thomas': { x: 0.5, y: 0.4, size: 0.36 } }
await fs.mkdir(out, { recursive: true })

const load = async (name, id, width) => {
  if (localDir) return fs.readFile(path.join(localDir, `${name}.jpg`))
  const res = await fetch(`https://images.unsplash.com/photo-${id}?w=${width}&q=85&fm=jpg`)
  if (!res.ok) throw new Error(`${name} : HTTP ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

const run = async ([name, id, width]) => {
  const buf = await load(name, id, width)
  // Portraits : recadrage carré ou 4:5 centré sur le visage. Autres : boîte maximale width x width.
  const resize = name.startsWith('avatar')
    ? { width: 320, height: 320, fit: 'cover', position: 'attention' }
    : name.startsWith('team')
      ? { width: 720, height: 900, fit: 'cover', position: 'north' }
      : { width, height: width, fit: 'inside', withoutEnlargement: true }
  // Recadrage manuel (fractions de la largeur) lorsque le cadrage automatique rate le visage.
  const manual = manualCrops[name]
  let pipeline = sharp(buf)
  if (manual) {
    const { width: w } = await sharp(buf).metadata()
    const size = Math.round(manual.size * w)
    pipeline = sharp(buf).extract({ left: Math.round(manual.x * w), top: Math.round(manual.y * w), width: size, height: size })
  }
  const info = await pipeline
    .resize(resize)
    .webp({ quality: name.startsWith('hero') ? 80 : 76 })
    .toFile(path.join(out, `${name}.webp`))
  return `${name}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} Ko`
}

const results = await Promise.allSettled(images.map(run))
results.forEach((r) => console.log(r.status === 'fulfilled' ? r.value : `ERREUR ${r.reason.message}`))
