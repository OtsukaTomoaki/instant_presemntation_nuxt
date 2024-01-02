<template>
  <!-- <div ref="pdfViewer"></div> -->
  <div>hoge</div>
</template>

<script setup>
import * as PDFJS from 'pdfjs-dist'
import * as pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs'

PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker

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
      document.body.appendChild(canvas)
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
// import { getDocument } from 'pdfjs-dist/lib/pdf';

// const pdfViewer = ref(null);

// onMounted(async () => {
//   // PDF.jsのワーカースクリプトのパスを設定
//   pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/[PDF.jsのバージョン]/pdf.worker.js';

//   // PDFをロード
//   const loadingTask = pdfjsLib.getDocument('https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf');
//   try {
//     const pdf = await loadingTask.promise;

//     // 最初のページを取得
//     const page = await pdf.getPage(1);

//     // ビューポートをセットアップ
//     const scale = 1.5;
//     const viewport = page.getViewport({ scale });

//     // Canvasを作成してPDFをレンダリング
//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');
//     canvas.height = viewport.height;
//     canvas.width = viewport.width;

//     // CanvasをDOMに追加
//     pdfViewer.value.appendChild(canvas);

//     // PDFページをCanvasにレンダリング
//     const renderContext = {
//       canvasContext: context,
//       viewport: viewport
//     };
//     await page.render(renderContext).promise;
//   } catch (error) {
//     console.error('PDFのロードに失敗しました:', error);
//   }
// });
</script>
