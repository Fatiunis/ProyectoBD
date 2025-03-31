import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const FacturaPDF = ({ venta }) => {
  const generarPDF = () => {
    const doc = new jsPDF();

    // Datos de la Farmacia
    const nombreFarmacia = "Farmacia Salud+";
    const direccionFarmacia = "Avenida Central #123, Ciudad";
    const telefonoFarmacia = "Tel: 5555-5555";
    const nitFarmacia = "NIT: 123456-7";
    const numeroFactura = `F-${venta.id.toString().padStart(6, "0")}`;

    // Título de la factura
    doc.setFontSize(18);
    doc.text(nombreFarmacia, 14, 15);
    doc.setFontSize(12);
    doc.text(direccionFarmacia, 14, 22);
    doc.text(telefonoFarmacia, 14, 28);
    doc.text(nitFarmacia, 14, 34);

    doc.setFontSize(16);
    doc.text("Factura de Venta", 14, 45);
    doc.setFontSize(12);
    doc.text(`Factura No: ${numeroFactura}`, 14, 52);
    doc.text(`Fecha: ${venta.fecha}`, 14, 58);

    // Información del Cliente
    doc.text(`Cliente: ${venta.cliente.nombre}`, 14, 68);
    doc.text(`DPI/NIT: ${venta.cliente.dpi}`, 14, 74);
    doc.text(`Dirección: ${venta.cliente.direccion}`, 14, 80);
    doc.text(`Teléfono: ${venta.cliente.telefono}`, 14, 86);
    doc.text(`Método de Pago: ${venta.metodoPago}`, 14, 92);

    // Tabla de productos
    const columnas = ["Código", "Producto", "Marca", "Cantidad", "Precio", "Subtotal"];
    const filas = venta.productos.map((producto) => [
      producto.codigo || "N/A",
      producto.nombre,
      producto.marca || "N/A",
      producto.cantidad,
      `$${Number(producto.precio).toFixed(2)}`,
      `$${(producto.cantidad * Number(producto.precio)).toFixed(2)}`,
    ]);

    autoTable(doc, {
      startY: 100,
      head: [columnas],
      body: filas,
    });

    // Cálculo de impuestos y total
    const subtotal = venta.total;
    const iva = subtotal * 0.12; // IVA del 12%
    const totalConIVA = subtotal + iva;

    doc.setFontSize(14);
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);
    doc.text(`IVA (12%): $${iva.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 16);
    doc.text(`Total a Pagar: $${totalConIVA.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 22);

    // Guardar o descargar
    doc.save(`Factura_${numeroFactura}.pdf`);
  };

  return <button onClick={generarPDF}>📄 Descargar Factura</button>;
};

export default FacturaPDF;
