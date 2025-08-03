// pdf-poppler-wrapper.js
// Simple wrapper to convert PDF buffer to PNG using pdf-poppler
const { fromBuffer } = require('pdf-poppler');
const fs = require('fs');
const os = require('os');
const path = require('path');

async function pdfBufferToPngBuffer(pdfBuffer) {
  // Write PDF to a temp file
  const tmpDir = os.tmpdir();
  const pdfPath = path.join(tmpDir, `pbm_pdf_${Date.now()}.pdf`);
  const outDir = path.join(tmpDir, `pbm_pdf_out_${Date.now()}`);
  fs.writeFileSync(pdfPath, pdfBuffer);
  fs.mkdirSync(outDir);
  const opts = {
    format: 'png',
    out_dir: outDir,
    out_prefix: 'page',
    page: 1,
    scale: 1024 / 612 // scale to width 1024px (default US Letter width)
  };
  await fromBuffer(pdfBuffer, opts);
  // Find the output PNG
  const files = fs.readdirSync(outDir).filter(f => f.endsWith('.png'));
  if (!files.length) throw new Error('PDF conversion failed');
  const pngPath = path.join(outDir, files[0]);
  const pngBuffer = fs.readFileSync(pngPath);
  // Cleanup
  fs.unlinkSync(pdfPath);
  fs.unlinkSync(pngPath);
  fs.rmdirSync(outDir);
  return pngBuffer;
}

module.exports = { pdfBufferToPngBuffer };
