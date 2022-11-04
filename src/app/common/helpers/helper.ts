import { ChartsReport, ListChartReport } from '@core/interfaces';

export function previewUrlFile(file): any {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e) => res(e.target.result);
    reader.onerror = (e) => rej(e);
    reader.readAsDataURL(file);
  });
}

export function formatedDataCharts(res: ChartsReport[]): ListChartReport {
  const listDays = res.map(({ date }) => date);
  const listLater = res.map(({ later }) => +later);
  const listOnTime = res.map(({ onTime }) => +onTime);
  const listAbsent = res.map(({ absent }) => +absent);
  const listLicence = res.map(({ licence }) => +licence);
  const totalLater = listLater.reduce((previous, current) => previous + current, 0);
  const totalOnTime = listOnTime.reduce((previous, current) => previous + current, 0);
  const totalAbsent = listAbsent.reduce((previous, current) => previous + current, 0);
  const totalLicence = listLicence.reduce((previous, current) => previous + current, 0);

  return {
    listDays,
    listLater,
    listOnTime,
    listLicence,
    listAbsent,
    totalLater,
    totalOnTime,
    totalAbsent,
    totalLicence,
  };
}
