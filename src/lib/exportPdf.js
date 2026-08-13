import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Aesthetic Manuscript PDF Exporter
 * Captures manuscript content with exact line breaks, typography, ink color, and paper texture
 * matching the user's selected paper style (Pastel Rose, Parchment, Dotted, Lined, Blank).
 */
export async function exportManuscriptToPdf(
  elementId = 'writing-canvas',
  filename = 'ambient_manuscript.pdf',
  paperBgColor = '#fff9ee'
) {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element #${elementId} not found for PDF export.`);
      return;
    }

    // Capture DOM element using PNG format with the EXACT paper background color
    const canvas = await html2canvas(element, {
      scale: 2, // High DPI clarity
      useCORS: true,
      backgroundColor: paperBgColor, // Matches selected paper color (Pastel Rose, Parchment, etc.)
      logging: false,
      onclone: (clonedDoc) => {
        // Ensure line breaks and textarea values are visually rendered in the cloned DOM for html2canvas
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          const textarea = clonedElement.querySelector('textarea');
          if (textarea) {
            // Convert textarea value to a formatted pre-wrap div for 100% line break fidelity
            const div = clonedDoc.createElement('div');
            div.style.whiteSpace = 'pre-wrap';
            div.style.fontFamily = getComputedStyle(textarea).fontFamily;
            div.style.fontSize = getComputedStyle(textarea).fontSize;
            div.style.lineHeight = getComputedStyle(textarea).lineHeight;
            div.style.color = getComputedStyle(textarea).color;
            div.style.width = '100%';
            div.style.minHeight = getComputedStyle(textarea).minHeight;
            div.textContent = textarea.value;
            textarea.parentNode.replaceChild(div, textarea);
          }
        }
      },
    });

    const imgData = canvas.toDataURL('image/png');

    // Initialize A4 PDF (210mm x 297mm)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Fill PDF background with the exact paper color (Pastel Rose #fff0f4, Parchment #fff9ee, etc.)
    // Convert hex to rgb
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 255, g: 249, b: 238 };
    };

    const rgb = hexToRgb(paperBgColor);
    pdf.setFillColor(rgb.r, rgb.g, rgb.b);
    pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');

    const margin = 12;
    const maxImgWidth = pdfWidth - margin * 2;
    const maxImgHeight = pdfHeight - margin * 2;

    const imgWidth = maxImgWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const xPos = margin;
    const yPos = margin;

    if (imgHeight <= maxImgHeight) {
      pdf.addImage(imgData, 'PNG', xPos, yPos, imgWidth, imgHeight);
    } else {
      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, 'PNG', xPos, position, imgWidth, imgHeight);
      heightLeft -= maxImgHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight + margin;
        pdf.addPage();
        pdf.setFillColor(rgb.r, rgb.g, rgb.b);
        pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
        pdf.addImage(imgData, 'PNG', xPos, position, imgWidth, imgHeight);
        heightLeft -= maxImgHeight;
      }
    }

    pdf.save(filename);
  } catch (error) {
    console.error('PDF Export Error:', error);
  }
}
