<template>
  <div>
    <div ref='cavnas1' />
  </div>
</template>

<script setup lang="ts">

import { Application, Graphics, Text, Container, GraphicsPath, ICanvas, Color } from 'pixi.js'

const cavnas1 = shallowRef<HTMLDivElement>()

onMounted(async () => {
  const app1 = new Application()

  await app1.init({ antialias: true, backgroundColor: 'white', resizeTo: cavnas1.value })
  cavnas1.value?.appendChild(app1.canvas)

  const g1 = new Graphics().rect(0, 0, 100, 100).fill(0xff0000)
  const g2 = new Graphics().rect(0, 0, 20, 20).fill(0x00ff00)

  app1.stage.addChild(g1)
  app1.stage.addChild(g2)

  const blob1 = await getCanvasBlob(app1.renderer.extract.canvas(g1))
  const blob2 = await getCanvasBlob(app1.renderer.extract.canvas(g2))
  const b = await mergeBlobs(blob1, blob2)
  setTimeout(() => {
    autoDownloadBlob('f', b)
  }, 1000)
})

async function getCanvasBlob(canvas: ICanvas): Promise<Blob | undefined> {
  return new Promise((resolve, reject) => {
    canvas.toBlob?.((value) => {
      if (value) {
        resolve(value)
      }
      else {
        reject()
      }
    })
  })
}

function mergeBlobs(blob1: Blob, blob2: Blob) {
  return new Promise((resolve, reject) => {
    const reader1 = new FileReader()
    reader1.onload = function (event) {
      const reader2 = new FileReader()
      reader2.onload = function (event2) {
        const buffer1 = event.target?.result
        const buffer2 = event2.target?.result
        const allArray = new Uint8Array(event.total + event2.total)
        if (buffer1 && typeof buffer1 === 'object') {
          const uint8Array1 = new Uint8Array(buffer1)
          for (let i = 0; i < uint8Array1.length; i++) {
            allArray[i] = uint8Array1[i]
          }
          if (buffer2 && typeof buffer2 === 'object') {
            const uint8Array2 = new Uint8Array(buffer2)
            for (let i = 0; i < uint8Array2.length; i++) {
              allArray[uint8Array1.length + i] = uint8Array2[i]
            }
          }
        }
        const mergedBlob = new Blob([allArray], { type: 'image/png' })
        resolve(mergedBlob)
        // console.log(event.target.result)

        // const uint8Array2 = new Uint8Array(event2.target.result)

        // // 创建一个新的Uint8Array，其长度是两个Blob数据之和
        // const uint8Array = new Uint8Array(uint8Array1.length + uint8Array2.length)

        // // 将第一个Blob的数据复制到新的Uint8Array中
        // uint8Array.set(uint8Array1, 0)

        // // 将第二个Blob的数据追加到新的Uint8Array中
        // uint8Array.set(uint8Array2, uint8Array1.length)

        // // 创建一个新的Blob对象
        // const mergedBlob = new Blob([uint8Array], { type: 'image/png' }) // 根据需要更改类型
        // resolve(mergedBlob)
      }
      reader2.readAsArrayBuffer(blob2)
    }
    reader1.readAsArrayBuffer(blob1)
  })
}

function autoDownloadBlob(name: string, blob: Blob) {
  const href = window.URL.createObjectURL(blob)
  autoDownloadHref(name, href)
}

function autoDownloadHref(name: string, href: string) {
  const downloadLink = document.createElement('a')
  downloadLink.href = href
  downloadLink.download = name
  document.body.appendChild(downloadLink)
  downloadLink.click()
  window.URL.revokeObjectURL(href)
  document.body.removeChild(downloadLink)
}

function blobToBase64(blob: Blob, callback: (value: string) => void) {
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onloadend = function () {
    // 注意：这里返回的是一个data URL，如果你只需要Base64部分，可以进一步处理
    const base64data = reader.result.split(',')[1]
    callback(base64data)
  }
}
</script>
