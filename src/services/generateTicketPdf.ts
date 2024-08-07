import { Ticket } from '@/types/ticket';
import jsPDF from 'jspdf';

export const generateTicketPdf = (ticket: Ticket) => {
    const pdf = new jsPDF();
    const margin = 10;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.setFontSize(12);
    let y = margin;

    // Title
    pdf.setFontSize(18);
    pdf.text('Ticket Details', margin, y);
    y += 10;

    // Ticket ID
    pdf.setFontSize(14);
    pdf.text(`Ticket ID: ${ticket.id}`, margin, y);
    y += 10;

    // Created At
    pdf.text(`Created At: ${new Date(ticket.createdAt).toLocaleString()}`, margin, y);
    y += 10;

    // Status
    pdf.text(`Status: ${ticket.status}`, margin, y);
    y += 10;

    // Flight Details
    pdf.setFontSize(14);
    pdf.text('Flight Details:', margin, y);
    y += 10;
    pdf.setFontSize(12);
    pdf.text(`Departure: ${ticket.flight.departure}`, margin, y);
    y += 5;
    pdf.text(`Arrival: ${ticket.flight.arrival}`, margin, y);
    y += 5;
    pdf.text(`Departure Date: ${new Date(ticket.flight.departureDate).toLocaleString()}`, margin, y);
    y += 5;
    pdf.text(`Arrival Date: ${new Date(ticket.flight.arrivalDate).toLocaleString()}`, margin, y);
    y += 10;

    // Seats and Prices
    pdf.setFontSize(14);
    pdf.text('Seats:', margin, y);
    y += 10;

    ticket.ticketItems.forEach((item, index) => {
        pdf.setFontSize(12);
        pdf.text(`Seat Code: ${item.seatCode}`, margin, y);
        y += 5;
        pdf.text(`Price: $${item.price}`, margin, y);
        y += 10;
    });

    // Total Price
    const totalPrice = ticket.ticketItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    y += 10;
    pdf.setFontSize(14);
    pdf.text(`Total Price: $${totalPrice}`, margin, y);

    pdf.save('ticket.pdf');
};
