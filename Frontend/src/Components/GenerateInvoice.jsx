import React, { useEffect, useMemo, useRef } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import invoiceData from '../pages/invoiceData.json';
import { FaRupeeSign } from 'react-icons/fa';

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
        bankDetails,
        termsAndConditions,
      } = invoiceData;

      const pdf = new jsPDF('p', 'mm', 'a4');

      // Set font to helvetica which includes the rupee symbol
      pdf.setFont('times');

      const margin = 10;
      let currentY = margin;

      // Company details
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

      // Customer details
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

      // Product details
      const tableColumn = ["Sr. No.", "Name of Product / Service", "Qty", "Rate", "Taxable Value", "Total"];
      const tableRows = order.cartItems.map((item, index) => {
        const taxableValue = item.Price * item.quantity;
        const totalAmount = taxableValue;

        return [
          index + 1,
          item.Name,
          item.quantity,
          item.Price.toFixed(2),
          taxableValue.toFixed(2),
          totalAmount.toFixed(2)
        ];
      });

      pdf.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: currentY,
        theme: 'grid',
        headStyles: { fillColor: [0, 0, 0] },
      });

      currentY = pdf.autoTable.previous.finalY + 10;

      // Total amount
      const totalTaxableValue = tableRows.reduce((acc, row) => acc + parseFloat(row[4]), 0);
      const totalAmount = tableRows.reduce((acc, row) => acc + parseFloat(row[5]), 0);

      pdf.text(`Total Taxable Value: ${totalTaxableValue.toFixed(2)}`, margin, currentY);
      currentY += 6;
      pdf.text(`Total Amount:${totalAmount.toFixed(2)}`, margin, currentY);
      currentY += 10;

      // Bank details
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

      // Terms and conditions
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
}, (prevProps, nextProps) => prevProps.order === nextProps.order);

export default GenerateInvoice;
