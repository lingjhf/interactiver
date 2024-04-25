import { Canvg } from 'canvg'

export async function svgToPdf() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (ctx) {
    await Canvg.from(ctx, '')
  }
}
