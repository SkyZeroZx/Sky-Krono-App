import { BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';

export function getDatepickerConfig(): BsDaterangepickerConfig {
  return Object.assign(new BsDaterangepickerConfig(), {
    rangeInputFormat: 'YYYY-MM-DD',
    dateInputFormat: 'YYYY-MM-DD',
    containerClass: 'theme-blue',
    displayOneMonthRange: true,
    isAnimated: true,
  });
}
