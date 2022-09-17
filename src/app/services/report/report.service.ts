import { Injectable } from "@angular/core";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Constant } from "src/app/common/constants/Constant";

@Injectable({
  providedIn: "root",
})
export class ReporteService {
  constructor() {
    // This is intentional
  }
  public exportAsExcelFile(excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(Constant.REPORT);
    const workbook: XLSX.WorkBook = {
      Sheets: { reporte: worksheet },
      SheetNames: ["reporte"],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: Constant.EXCEL_TYPE });
    saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + Constant.EXCEL_EXTENSION
    );
  }

  public exportAsPDF(nombre, encabezado) {
    // Pendiente agregar Add Filters in report
    let header = new Array<any>();
    header[0] = encabezado;
    // Obtenemos los encabezados Object.keys(Constant.REPORT[0]);
    let arrReport = Constant.REPORT.map((obj) => Object.values(obj));
    let pdf = new jsPDF({
      orientation: "landscape",
    });
    pdf.setFont("helvetica");
    pdf.text(nombre, 12, 6);
    pdf.setTextColor(99);
    pdf.setFontSize(6);
    (pdf as any).autoTable({
      styles: { fontSize: 7 },
      head: header,
      body: arrReport,
      theme: "grid",
      didDrawCell: (_data) => {
        // This is intentional
      },
    });
    //  Metodo para abrir en otra pestaña pdf.output("dataurlnewwindow");
    pdf.save(nombre + "_export_" + +new Date().getTime() + ".pdf");
  }
}
