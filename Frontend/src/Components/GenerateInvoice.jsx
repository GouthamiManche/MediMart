import React, { useEffect, useMemo, useRef } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import invoiceData from '../pages/invoiceData.json';
const GenerateInvoice = React.memo(({ order }) => {
  const orderRef = useRef(null);
  const isDownloaded = useRef(false);
  useEffect(() => {
    if (order && order !== orderRef.current) {
      orderRef.current = order;
      isDownloaded.current = false;
    }
  }, [order]);
  useEffect(() => {
    if (!isDownloaded.current && order) {
      downloadPDF();
      isDownloaded.current = true;
    }
  }, [order]);
  const downloadPDF = useMemo(() => {
    const generatePDF = async () => {
      const {
        company,
        invoiceDetails,
        customer,
        products,
        totalAmount,
        bankDetails,
        termsAndConditions,
      } = invoiceData;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const margin = 10;
      let currentY = margin;

      pdf.setFontSize(18);
      pdf.text(company.name, margin, currentY);
      currentY += 8;
      pdf.setFontSize(12);
      pdf.text(company.description, margin, currentY);
      currentY += 10;
      pdf.text(`Address: ${company.address}`, margin, currentY);
      currentY += 6;
      pdf.text(`Tel: ${company.contact.tel} | Web: ${company.contact.web} | Email: ${company.contact.email}`, margin, currentY);
      currentY += 6;
      pdf.text(`GSTIN: ${company.GSTIN}`, margin, currentY);
      currentY += 10;
      pdf.text('TAX INVOICE', margin, currentY);
      currentY += 6;
      pdf.text('ORIGINAL FOR RECIPIENT', margin, currentY);
      currentY += 10;

      pdf.text('Customer Detail:', margin, currentY);
      currentY += 6;
      pdf.text(`M/S: ${order.fullName}`, margin, currentY);
      currentY += 6;
      pdf.text(`Address: ${order.address}`, margin, currentY);
      currentY += 6;
      pdf.text(`PHONE: ${order.contactNo}`, margin, currentY);
      currentY += 6;
      pdf.text(`Email: ${order.email}`, margin, currentY);
      currentY += 10;

      pdf.text(`Invoice No: ${invoiceDetails.invoiceNo}`, margin, currentY);
      currentY += 6;
      pdf.text(`Invoice Date: ${invoiceDetails.invoiceDate}`, margin, currentY);
      currentY += 6;
      pdf.text(`Challan No: ${invoiceDetails.challanNo}`, margin, currentY);
      currentY += 6;
      pdf.text(`Challan Date: ${invoiceDetails.challanDate}`, margin, currentY);
      currentY += 6;
      pdf.text(`P.O. No: ${invoiceDetails.PONo}`, margin, currentY);
      currentY += 6;
      pdf.text(`Delivery Date: ${invoiceDetails.deliveryDate}`, margin, currentY);
      currentY += 6;
      pdf.text(`L.R. No: ${invoiceDetails.LRNo}`, margin, currentY);
      currentY += 6;
      pdf.text(`E-Way No: ${invoiceDetails.ewayNo}`, margin, currentY);
      currentY += 6;
      pdf.text(`Reverse Charge: ${invoiceDetails.reverseCharge}`, margin, currentY);
      currentY += 6;
      pdf.text(`Due Date: ${invoiceDetails.dueDate}`, margin, currentY);
      currentY += 10;

      const tableColumn = ["Sr. No.", "Name of Product / Service", "HSN / SAC", "Qty", "Rate", "Taxable Value", "IGST %", "IGST Amount", "Total"];
      const tableRows = order.cartItems.map((item, index) => [
        index + 1,
        item.Name,
        item.Product_id,
        item.quantity,
        item.Price,
        item.Price * item.quantity,
        "0%",
        "0",
        item.Price * item.quantity,
      ]);

      pdf.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: currentY,
        theme: 'grid',
        headStyles: { fillColor: [0, 0, 0] },
      });

      currentY = pdf.autoTable.previous.finalY + 10;

      pdf.text('Total Amount:', margin, currentY);
      pdf.text(`₹ ${order.amount}`, margin + 30, currentY);
      currentY += 10;
      pdf.text('Bank Details:', margin, currentY);
      currentY += 6;
      pdf.text(`Bank Name: ${bankDetails.bankName}`, margin, currentY);
      currentY += 6;
      pdf.text(`Branch Name: ${bankDetails.branchName}`, margin, currentY);
      currentY += 6;
      pdf.text(`Bank Account Number: ${bankDetails.accountNumber}`, margin, currentY);
      currentY += 6;
      pdf.text(`Bank Branch IFSC: ${bankDetails.branchIFSC}`, margin, currentY);
      currentY += 10;

      pdf.text('Terms and Conditions:', margin, currentY);
      currentY += 6;
      termsAndConditions.forEach((condition, index) => {
        pdf.text(`${index + 1}. ${condition}`, margin, currentY);
        currentY += 6;
      });

      pdf.save('invoice.pdf');
    };

    return generatePDF;
  }, [order]);
  return null;
}, (prevProps, nextProps) => {
  return prevProps.order === nextProps.order;
});
export default GenerateInvoice;