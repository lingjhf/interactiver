import { Canvg } from 'canvg'

import './libs/blob-stream'
import './libs/pdfkit.standalone'

export function svgToPdf(root: Node, width: number, height: number) {
  const pdfPageSize = { width: 595.28, height: 841.89 }
  const chunkHeight = width / pdfPageSize.width * pdfPageSize.height
  const overflowHeight = height % chunkHeight
  const chunks = Array.from({ length: Math.floor(height / chunkHeight) }, () => chunkHeight)
  if (overflowHeight > 0) {
    chunks.push(overflowHeight)
  }
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }
  const doc = new PDFDocument({ size: 'A4' })
  const stream = doc.pipe(blobStream())
  const svg = elementToString(root)
  const canvg = Canvg.fromString(ctx, svg)
  let offsetY = 0
  for (let i = 0; i < chunks.length; i++) {
    if (i > 0) {
      doc.addPage({ size: 'A4' })
    }
    const chunkH = chunks[i]
    canvg.resize(width, chunkH)
    canvg.start({ offsetY: 0 - offsetY })
    offsetY += chunkH
    doc.image(canvas.toDataURL('image/png'), 0, 0, {
      width: pdfPageSize.width,
      height: chunkH < chunkHeight ? chunkH / (width / pdfPageSize.width) : pdfPageSize.height,
    })
  }
  doc.end()
  stream.on('finish', function () {
    const blob = stream.toBlob('application/pdf')
    autoDownloadBlob('test', blob)
  })
  canvg.stop()
}

function elementToString(root: Node) {
  return new XMLSerializer().serializeToString(root)
}

export function autoDownloadBlob(name: string, blob: Blob) {
  const href = window.URL.createObjectURL(blob)
  autoDownloadHref(name, href)
}

export function autoDownloadHref(name: string, href: string) {
  const downloadLink = document.createElement('a')
  downloadLink.href = href
  downloadLink.download = name
  document.body.appendChild(downloadLink)
  downloadLink.click()
  window.URL.revokeObjectURL(href)
  document.body.removeChild(downloadLink)
}
