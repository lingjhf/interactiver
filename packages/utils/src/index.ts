import { Canvg } from 'canvg'

export interface SvgExporterOptions {
  width?: number,
  height?: number,
  type?: string,
}

export class SvgExporter {
  constructor(root: Node) {
    this._root = root
  }

  private _root: Node

  download(name: string): void
  download(name: string, options?: SvgExporterOptions): Promise<void>
  async download(name: string, options?: SvgExporterOptions) {
    const blob = options
      ? await svgToBlob(this._root, options.width ?? 400, options.height, options.type)
      : new Blob([elementToString(this._root)], { type: 'image/svg+xml' })
    if (blob) {
      autoDownloadBlob(name, blob)
    }
  }
}

export async function svgToBlob(svg: Node, width: number, height?: number, type = 'image/png'): Promise<Blob | undefined> {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const canvg = Canvg.fromString(ctx, elementToString(svg))
    canvg.resize(width, height)
    canvg.start()
    return new Promise((resolve, reject) => {
      canvas.toBlob((value) => {
        if (value) {
          resolve(value)
        }
        else {
          reject()
        }
      }, type)
    })
  }
}

export function elementToString(root: Node) {
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
