<template>
  <div class="container">
    <div class="uploadPdfSpace">
      <v-file-input label="File input" accept="application/pdf" @change="uploadPdf"></v-file-input>
    </div>
    <div class="renderPdfSpace" ref="renderPdfSpace"></div>
    <div class="prevNextButton">
      <v-btn class="prevButton" @click="prevPage">button</v-btn>
      <v-btn class="nextButton" @click="nextPage">Next</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as PDFJS from 'pdfjs-dist'
import * as pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs'
import { VBtn } from 'vuetify/components/VBtn'

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

const uploadPdf = async (e) => {
  const file = e.target.files[0]
  const pdfData = await convertFileToBase64(file)

  if (file) {
    loadingTask.value = PDFJS.getDocument(pdfData)
    loadingTask.value.promise.then((pdf) => {
      numPages.value = pdf.numPages
      currentPage.value = 1
      renderPdf(pdf)
    })
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

const convertFileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onerror = () => {
      fileReader.abort()
      reject(new DOMException('Problem parsing input file.'))
    }
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    return fileReader.readAsDataURL(file)
  })
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.uploadPdfSpace {
  margin-bottom: 1rem;
  display: block;
  width: 100%;
}

.renderPdfSpace {
  width: 100%;
  height: 100%;
  display: block;
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
