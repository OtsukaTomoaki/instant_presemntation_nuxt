<template>
  <!-- <div ref="pdfViewer"></div> -->
  <div class="Container">
    <div ref="renderPdfSpace"></div>
  </div>
</template>

<script setup>
import * as PDFJS from 'pdfjs-dist'
import * as pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs'
// import { ref } from 'vue'

PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker

const renderPdfSpace = ref(null)

onMounted(() => {
  const loadingTask = PDFJS.getDocument('https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf')
  loadingTask.promise.then((pdf) => {
    console.log('PDF loaded')
    // PDFのページ数を取得
    const numPages = pdf.numPages
    console.log('numPages', numPages)
    // 1ページ目を取得
    pdf.getPage(1).then((page) => {
      console.log('Page loaded')
      const scale = 1.5
      const viewport = page.getViewport({ scale: scale })
      // Canvasを作成してPDFをレンダリング
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.height = viewport.height
      canvas.width = viewport.width
      // CanvasをDOMに追加
      renderPdfSpace.value.appendChild(canvas)
      // PDFページをCanvasにレンダリング
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      }
      page.render(renderContext)
    })
  }, (reason) => {
    // PDFのロードに失敗した場合
    console.error(reason)
  })
})
</script>

<style scoped>
.Container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
