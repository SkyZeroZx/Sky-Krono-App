import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { Constant } from 'src/app/common/constants/Constant';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  constructor(private toastrService: ToastrService) {}

  exportAsPDF(name: string, headers: any[]) {
    this.toastrService.info('Generando Reporte');

    let header = new Array<any>();
    header[0] = headers;

    let body = Constant.REPORT.map((obj) => Object.values(obj));
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
      body: body,
      theme: 'grid',
      didDrawCell: (_data) => {
        // This is intentional
      },
    });
    //  Metodo para abrir en otra pestaña pdf.output("dataurlnewwindow");
    pdf.save(name + '_export_' + new Date().getTime() + '.pdf');
  }
}
