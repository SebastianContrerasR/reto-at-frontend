import jsPDF from 'jspdf';
import { Ticket } from '../types/ticket';
import { LOGO_URL } from '@/features/common/constants/constants';

export const generateTicketPdf = (ticket: Ticket) => {
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: [141 * 2, 410],
    });

    const margin = 10;
    const logoWidth = 50;
    const logoHeight = 30;
    let y = margin + logoHeight + 10;
    const lineHeight = 12;
    const sectionSpacing = 20;

    // Logo
    if (LOGO_URL) {
        pdf.addImage(LOGO_URL, 'PNG', margin, margin, logoWidth, logoHeight);
    }

    pdf.setFontSize(10);

    // User Information
    pdf.setFontSize(10);
    pdf.text(`Name: ${ticket.user.name}`, margin, y);
    y += lineHeight + sectionSpacing;

    // Flight Information
    pdf.setFontSize(12);
    pdf.text('Flight Details', margin, y);
    y += lineHeight;
    pdf.setFontSize(10);
    pdf.text(`From: ${ticket.flight.departure}`, margin, y);
    pdf.text(`To: ${ticket.flight.arrival}`, 200, y);
    y += lineHeight;
    pdf.text(`Departure: ${new Date(ticket.flight.departureDate).toLocaleString()}`, margin, y);
    pdf.text(`Arrival: ${new Date(ticket.flight.arrivalDate).toLocaleString()}`, 200, y);
    y += lineHeight + sectionSpacing;

    // Seat Information
    pdf.setFontSize(12);
    pdf.text('Seats:', margin, y);
    y += lineHeight;

    pdf.setFontSize(10);
    ticket.ticketItems.forEach((item) => {
        pdf.text(`Seat: ${item.seatCode}`, margin, y);
        pdf.text(`Price: $${item.price}`, 200, y);
        y += lineHeight;
    });

    // Total Price
    const totalPrice = ticket.ticketItems
        .reduce((total, item) => total + parseFloat(item.price), 0)
        .toFixed(2);

    y += lineHeight + sectionSpacing;
    pdf.setFontSize(12);
    pdf.text(`Total: $${totalPrice}`, margin, y);

    // Save the PDF
    pdf.save('ticket.pdf');
};
