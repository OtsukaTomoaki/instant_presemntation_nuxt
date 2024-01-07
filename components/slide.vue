<template>
  <div class="container">
    <div ref="renderPdfSpace"></div>
    <div class="prevNextButton">
      <button class="prevButton" @click="prevPage">Prev</button>
      <button class="nextButton" @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as PDFJS from 'pdfjs-dist'
import * as pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs'

PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker

const renderPdfSpace = ref(null)
const currentPage = ref(1)
const loadingTask = ref(null)
const numPages = ref(1)

const prevPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--
    renderPdf(await loadingTask.value.promise)
  }
}

const nextPage = async () => {
  if (currentPage.value < numPages.value) {
    currentPage.value++
    renderPdf(await loadingTask.value.promise)
  }
}

onMounted(async () => {
  loadingTask.value = PDFJS.getDocument('https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf')

  const pdf = await loadingTask.value.promise
  // PDFのページ数を取得
  numPages.value = pdf.numPages
  // 1ページ目を取得
  renderPdf(pdf)
})

const renderPdf = (pdf) => {
  pdf.getPage(currentPage.value).then((page) => {
    console.log('Page loaded')
    const scale = 1.5
    const viewport = page.getViewport({ scale: scale })
    // Canvasを作成してPDFをレンダリング
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.height = viewport.height
    canvas.width = viewport.width
    // CanvasをDOMに追加
    renderPdfSpace.value.innerHTML = ''
    renderPdfSpace.value.appendChild(canvas)
    // PDFページをCanvasにレンダリング
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    }
    page.render(renderContext)
  })
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.prevNextButton {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
