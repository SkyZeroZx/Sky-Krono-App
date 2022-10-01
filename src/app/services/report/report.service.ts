import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Constant } from 'src/app/common/constants/Constant';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  public exportAsPDF(name, headers) {
    // Pendiente agregar Add Filters in report
    let header = new Array<any>();
    header[0] = headers;
    // Obtenemos los encabezados Object.keys(Constant.REPORT[0]);
    let arrReport = Constant.REPORT.map((obj) => Object.values(obj));
    let pdf = new jsPDF({
      orientation: 'landscape',
    });
    pdf.setFont('helvetica');
    pdf.text(name, 12, 6);
    pdf.setTextColor(99);
    pdf.setFontSize(6);
    (pdf as any).autoTable({
      styles: { fontSize: 7 },
      head: header,
      body: arrReport,
      theme: 'grid',
      didDrawCell: (_data) => {
        // This is intentional
      },
    });
    //  Metodo para abrir en otra pestaña pdf.output("dataurlnewwindow");
    pdf.save(name + '_export_' + +new Date().getTime() + '.pdf');
  }
}
