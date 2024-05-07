import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

interface FormData {
  name: string;
  course: string;
  date: Date;
}

// Format date to DD/MM/YYYY
const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

// Format name to Title Case
const formatName = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

// Upload PDF
const usePdfUpdate = () => {
  const updatePdf = async ({ course, name, date }: FormData) => {
    const nameString = formatName(name);
    const courseString = `For successfully completing the ${formatName(
      course
    )}`;

    const fontUrl = "/Vollkorn-ExtraBold.ttf";
    const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());

    const existingPdfBytes = await fetch("/TDC.pdf").then((res) =>
      res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    // Embed the font in the document
    const customFont = await pdfDoc.embedFont(fontBytes);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Get the width and height of the first page
    const { width, height } = firstPage.getSize();

    // Draw a string of text diagonally across the first page
    firstPage.drawText(nameString, {
      x: width / 2 - (nameString.length * 10 + 20),
      y: height / 2 + 70,
      size: 45,
      font: customFont,
      color: rgb(228 / 255, 165 / 255, 25 / 255),
    });

    firstPage.drawText(courseString, {
      x: width / 2 - 200,
      y: height / 2 + 30,
      size: 18,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(`course on ${formatDate(date)}`, {
      x: width / 2 - 80,
      y: height / 2 + 5,
      size: 18,
      color: rgb(0, 0, 0),
    });
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    const pdfBlob = new Blob([pdfBytes], {
      type: "application/pdf",
    });

    const file = new File([pdfBlob], "TDC.pdf", { type: "application/pdf" });

    return file;
  };

  return updatePdf;
};

export default usePdfUpdate;
