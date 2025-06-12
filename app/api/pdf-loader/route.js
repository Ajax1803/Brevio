import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function GET(request) {
  const reqUrl = request.url;
  const { searchParams } = new URL(reqUrl);
  const pdfUrl = searchParams.get("pdfUrl");
  // 1. Load the PDF file from the URL
  const response = await fetch(pdfUrl);
  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const docs = await loader.load();
  let pdfTextContent = "";
  docs.forEach((doc) => {
    pdfTextContent += doc.pageContent;
  });
  // 2. Split the text content into chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20, //chunkSize controls the max size (in terms of number of characters) of the final documents. chunkOverlap specifies how much overlap there should be between chunks. This is often helpful to make sure that the text isn't split weirdly
  });
  const output = await splitter.createDocuments([pdfTextContent]);
  let splittedList = [];
  output.forEach((doc) => {
    splittedList.push(doc.pageContent);
  });

  return NextResponse.json({ result: splittedList });
}
