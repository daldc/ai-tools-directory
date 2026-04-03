#!/usr/bin/env node
/**
 * Generate the Marketing Report Template XLSX
 * Run: node generate-template.js
 * Output: deliverable/Marketing-Report-Template.xlsx
 */
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const OUTPUT = path.join(__dirname, 'deliverable', 'Marketing-Report-Template.xlsx');

// Color palette
const C = {
  darkNavy: 'FF1B2A4A',
  navy: 'FF2C3E6B',
  blue: 'FF3B82F6',
  lightBlue: 'FFDBEAFE',
  veryLightBlue: 'FFEFF6FF',
  green: 'FF10B981',
  lightGreen: 'FFD1FAE5',
  red: 'FFEF4444',
  lightRed: 'FFFEE2E2',
  yellow: 'FFF59E0B',
  lightYellow: 'FFFEF3C7',
  gray: 'FF6B7280',
  lightGray: 'FFF3F4F6',
  veryLightGray: 'FFF9FAFB',
  white: 'FFFFFFFF',
  black: 'FF111827',
};

const headerFont = { name: 'Calibri', bold: true, color: { argb: C.white }, size: 12 };
const subHeaderFont = { name: 'Calibri', bold: true, color: { argb: C.darkNavy }, size: 11 };
const bodyFont = { name: 'Calibri', color: { argb: C.black }, size: 10 };
const smallFont = { name: 'Calibri', color: { argb: C.gray }, size: 9 };

const headerFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.darkNavy } };
const subHeaderFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.lightBlue } };
const altRowFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.veryLightGray } };
const whiteFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.white } };

const thinBorder = {
  top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
  bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
  left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
  right: { style: 'thin', color: { argb: 'FFE5E7EB' } },
};

function setRow(ws, rowNum, values, options = {}) {
  const row = ws.getRow(rowNum);
  if (values) row.values = values;
  if (options.font) row.font = options.font;
  if (options.fill) row.eachCell(c => { c.fill = options.fill; });
  if (options.height) row.height = options.height;
  if (options.alignment) row.alignment = options.alignment;
  row.eachCell(c => { c.border = thinBorder; });
  return row;
}

async function main() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'The AI Marketing Stack';
  wb.created = new Date();

  // ── Tab 1: Executive Summary ──
  const ws1 = wb.addWorksheet('Executive Summary', { properties: { tabColor: { argb: '3B82F6' } } });
  ws1.columns = [
    { width: 3 }, { width: 28 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 5 },
  ];

  // Title
  ws1.mergeCells('B2:G2');
  const titleCell = ws1.getCell('B2');
  titleCell.value = '📊 MARKETING PERFORMANCE REPORT';
  titleCell.font = { name: 'Calibri', bold: true, size: 18, color: { argb: C.white } };
  titleCell.fill = headerFill;
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  ws1.getRow(2).height = 40;

  // Subtitle
  ws1.mergeCells('B3:G3');
  const subCell = ws1.getCell('B3');
  subCell.value = 'Reporting Period: [Month Year] | Prepared by: [Your Name]';
  subCell.font = { name: 'Calibri', size: 11, color: { argb: C.gray }, italic: true };
  subCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.lightBlue } };
  subCell.alignment = { horizontal: 'center' };
  ws1.getRow(3).height = 28;

  // Top-line KPIs
  ws1.mergeCells('B5:G5');
  ws1.getCell('B5').value = 'TOP-LINE PERFORMANCE';
  ws1.getCell('B5').font = { ...subHeaderFont, size: 13 };
  ws1.getCell('B5').fill = subHeaderFill;

  const kpiHeaders = ['', 'Metric', 'Current Period', 'Previous Period', 'Change', '% Change', 'Status'];
  setRow(ws1, 6, kpiHeaders, { font: { ...headerFont, size: 10 }, fill: headerFill });

  const kpiNames = [
    'Total Spend', 'Total Revenue', 'ROAS', 'Total Conversions',
    'Avg. CPA', 'Website Sessions', 'Conversion Rate',
  ];

  kpiNames.forEach((name, i) => {
    const r = 7 + i;
    const fill = i % 2 === 0 ? whiteFill : altRowFill;
    // Cols: B=Metric, C=Current, D=Previous, E=Change, F=% Change, G=Status
    setRow(ws1, r, ['', name, 0, 0, '', '', ''], { font: bodyFont, fill });
    ws1.getCell(r, 2).font = { ...bodyFont, bold: true };
    // Change = Current - Previous
    ws1.getCell(r, 5).value = { formula: `C${r}-D${r}` };
    // % Change = (Current - Previous) / Previous
    ws1.getCell(r, 6).value = { formula: `IF(D${r}=0,0,(C${r}-D${r})/D${r})` };
    ws1.getCell(r, 6).numFmt = '0.0%';
    // Status: auto based on % change
    ws1.getCell(r, 7).value = { formula: `IF(F${r}>=0.05,"🟢",IF(F${r}>=-0.05,"🟡","🔴"))` };
  });

  // Narrative section
  const narStart = 16;
  ws1.mergeCells(`B${narStart}:G${narStart}`);
  ws1.getCell(`B${narStart}`).value = 'EXECUTIVE NARRATIVE';
  ws1.getCell(`B${narStart}`).font = { ...subHeaderFont, size: 13 };
  ws1.getCell(`B${narStart}`).fill = subHeaderFill;

  const narratives = [
    ['🏆 Key Wins', '[Describe 2-3 top wins this period — what went well and why]'],
    ['⚠️ Areas of Concern', '[Describe 1-2 areas that need attention — be specific about the issue and magnitude]'],
    ['🔄 Key Changes', '[What changed vs. last period? New campaigns, budget shifts, market factors]'],
    ['📋 Actions Taken', '[What did the team do this period? Optimizations, launches, tests]'],
    ['🎯 Next Period Focus', '[Top 3 priorities for the upcoming period]'],
  ];

  narratives.forEach((n, i) => {
    const r = narStart + 1 + (i * 2);
    ws1.mergeCells(`B${r}:G${r}`);
    ws1.getCell(`B${r}`).value = n[0];
    ws1.getCell(`B${r}`).font = { ...bodyFont, bold: true, size: 11 };
    ws1.getCell(`B${r}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.lightGray } };
    ws1.getRow(r).height = 22;

    ws1.mergeCells(`B${r + 1}:G${r + 1}`);
    ws1.getCell(`B${r + 1}`).value = n[1];
    ws1.getCell(`B${r + 1}`).font = { ...bodyFont, color: { argb: C.gray } };
    ws1.getCell(`B${r + 1}`).alignment = { wrapText: true, vertical: 'top' };
    ws1.getRow(r + 1).height = 50;
  });

  // ── Tab 2: Channel Performance ──
  const ws2 = wb.addWorksheet('Channel Performance', { properties: { tabColor: { argb: '10B981' } } });
  ws2.columns = [
    { width: 3 }, { width: 24 }, { width: 14 }, { width: 14 }, { width: 12 }, { width: 12 },
    { width: 14 }, { width: 12 }, { width: 14 }, { width: 12 }, { width: 30 },
  ];

  ws2.mergeCells('B2:K2');
  ws2.getCell('B2').value = '📈 CHANNEL PERFORMANCE BREAKDOWN';
  ws2.getCell('B2').font = { name: 'Calibri', bold: true, size: 16, color: { argb: C.white } };
  ws2.getCell('B2').fill = headerFill;
  ws2.getCell('B2').alignment = { horizontal: 'center', vertical: 'middle' };
  ws2.getRow(2).height = 36;

  ws2.mergeCells('B3:K3');
  ws2.getCell('B3').value = 'Period: [Month Year] | All monetary values in USD';
  ws2.getCell('B3').font = { ...smallFont, italic: true };
  ws2.getCell('B3').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.lightBlue } };
  ws2.getCell('B3').alignment = { horizontal: 'center' };

  const chHeaders = ['', 'Channel', 'Spend', 'Impressions', 'Clicks', 'CTR', 'Conversions', 'Conv. Rate', 'Revenue', 'ROAS', 'Notes'];
  setRow(ws2, 5, chHeaders, { font: { ...headerFont, size: 10 }, fill: headerFill });
  ws2.getRow(5).height = 28;

  const channels = [
    'Paid Search', 'Paid Social', 'Organic Search', 'Organic Social',
    'Email Marketing', 'Display / Programmatic', 'Affiliate / Referral', 'Direct / Other',
  ];

  channels.forEach((ch, i) => {
    const r = 6 + i;
    const fill = i % 2 === 0 ? whiteFill : altRowFill;
    setRow(ws2, r, ['', ch, 0, 0, 0, '', 0, '', 0, '', ''], { font: bodyFont, fill });
    ws2.getCell(r, 2).font = { ...bodyFont, bold: true };
    // Spend, Impressions, Clicks, Conversions, Revenue are input cells (cols C,D,E,G,I)
    ws2.getCell(r, 3).numFmt = '$#,##0.00';
    ws2.getCell(r, 9).numFmt = '$#,##0.00';
    // CTR = Clicks / Impressions (col F = E/D)
    ws2.getCell(r, 6).value = { formula: `IF(D${r}=0,0,E${r}/D${r})` };
    ws2.getCell(r, 6).numFmt = '0.00%';
    // Conv Rate = Conversions / Clicks (col H = G/E)
    ws2.getCell(r, 8).value = { formula: `IF(E${r}=0,0,G${r}/E${r})` };
    ws2.getCell(r, 8).numFmt = '0.00%';
    // ROAS = Revenue / Spend (col J = I/C)
    ws2.getCell(r, 10).value = { formula: `IF(C${r}=0,0,I${r}/C${r})` };
    ws2.getCell(r, 10).numFmt = '0.00"x"';
  });

  // Totals row
  const totRow = 6 + channels.length;
  const lastDataRow = totRow - 1;
  setRow(ws2, totRow, ['', 'TOTAL', '', '', '', '', '', '', '', '', ''], {
    font: { ...bodyFont, bold: true, size: 11 },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: C.lightBlue } },
  });
  ws2.getCell(totRow, 3).value = { formula: `SUM(C6:C${lastDataRow})` };
  ws2.getCell(totRow, 3).numFmt = '$#,##0.00';
  ws2.getCell(totRow, 4).value = { formula: `SUM(D6:D${lastDataRow})` };
  ws2.getCell(totRow, 5).value = { formula: `SUM(E6:E${lastDataRow})` };
  ws2.getCell(totRow, 6).value = { formula: `IF(D${totRow}=0,0,E${totRow}/D${totRow})` };
  ws2.getCell(totRow, 6).numFmt = '0.00%';
  ws2.getCell(totRow, 7).value = { formula: `SUM(G6:G${lastDataRow})` };
  ws2.getCell(totRow, 8).value = { formula: `IF(E${totRow}=0,0,G${totRow}/E${totRow})` };
  ws2.getCell(totRow, 8).numFmt = '0.00%';
  ws2.getCell(totRow, 9).value = { formula: `SUM(I6:I${lastDataRow})` };
  ws2.getCell(totRow, 9).numFmt = '$#,##0.00';
  ws2.getCell(totRow, 10).value = { formula: `IF(C${totRow}=0,0,I${totRow}/C${totRow})` };
  ws2.getCell(totRow, 10).numFmt = '0.00"x"';

  // Channel mix section
  const mixStart = totRow + 3;
  ws2.mergeCells(`B${mixStart}:K${mixStart}`);
  ws2.getCell(`B${mixStart}`).value = '💰 SPEND ALLOCATION & EFFICIENCY';
  ws2.getCell(`B${mixStart}`).font = { ...subHeaderFont, size: 13 };
  ws2.getCell(`B${mixStart}`).fill = subHeaderFill;

  setRow(ws2, mixStart + 1, ['', 'Channel', '% of Total Spend', 'CPA', '% of Total Conv.', 'Cost per Click', '% of Revenue', 'Efficiency Score', '', '', ''], {
    font: { ...headerFont, size: 10 }, fill: headerFill,
  });

  channels.forEach((ch, i) => {
    const r = mixStart + 2 + i;
    const dataRow = 6 + i; // corresponding row in the performance table above
    const fill = i % 2 === 0 ? whiteFill : altRowFill;
    setRow(ws2, r, ['', ch, '', '', '', '', '', '', '', '', ''], { font: bodyFont, fill });
    ws2.getCell(r, 2).font = { ...bodyFont, bold: true };
    // % of Total Spend = channel spend / total spend
    ws2.getCell(r, 3).value = { formula: `IF(C${totRow}=0,0,C${dataRow}/C${totRow})` };
    ws2.getCell(r, 3).numFmt = '0.0%';
    // CPA = Spend / Conversions
    ws2.getCell(r, 4).value = { formula: `IF(G${dataRow}=0,0,C${dataRow}/G${dataRow})` };
    ws2.getCell(r, 4).numFmt = '$#,##0.00';
    // % of Total Conversions
    ws2.getCell(r, 5).value = { formula: `IF(G${totRow}=0,0,G${dataRow}/G${totRow})` };
    ws2.getCell(r, 5).numFmt = '0.0%';
    // Cost per Click = Spend / Clicks
    ws2.getCell(r, 6).value = { formula: `IF(E${dataRow}=0,0,C${dataRow}/E${dataRow})` };
    ws2.getCell(r, 6).numFmt = '$#,##0.00';
    // % of Revenue
    ws2.getCell(r, 7).value = { formula: `IF(I${totRow}=0,0,I${dataRow}/I${totRow})` };
    ws2.getCell(r, 7).numFmt = '0.0%';
    // Efficiency Score = ROAS relative to average
    ws2.getCell(r, 8).value = { formula: `IF(J${totRow}=0,"—",IF(C${dataRow}=0,"—",TEXT(I${dataRow}/C${dataRow}/IF(I${totRow}/C${totRow}=0,1,I${totRow}/C${totRow})*100,"0")&"%"))` };
  });

  // ── Tab 3: KPI Dashboard ──
  const ws3 = wb.addWorksheet('KPI Dashboard', { properties: { tabColor: { argb: 'F59E0B' } } });
  ws3.columns = [
    { width: 3 }, { width: 26 }, { width: 16 }, { width: 16 }, { width: 16 }, { width: 14 }, { width: 14 }, { width: 22 }, { width: 5 },
  ];

  ws3.mergeCells('B2:H2');
  ws3.getCell('B2').value = '🎯 KPI DASHBOARD';
  ws3.getCell('B2').font = { name: 'Calibri', bold: true, size: 16, color: { argb: C.white } };
  ws3.getCell('B2').fill = headerFill;
  ws3.getCell('B2').alignment = { horizontal: 'center', vertical: 'middle' };
  ws3.getRow(2).height = 36;

  ws3.mergeCells('B3:H3');
  ws3.getCell('B3').value = 'Green = ≥100% of target | Yellow = 80-99% | Red = <80%';
  ws3.getCell('B3').font = { ...smallFont, italic: true };
  ws3.getCell('B3').alignment = { horizontal: 'center' };
  ws3.getCell('B3').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.lightBlue } };

  const dashHeaders = ['', 'KPI', 'Target', 'Actual', 'Variance', '% to Target', 'Status', 'Trend vs. Last Month'];
  setRow(ws3, 5, dashHeaders, { font: { ...headerFont, size: 10 }, fill: headerFill });
  ws3.getRow(5).height = 28;

  const dashKpiNames = [
    'Total Marketing Spend',
    'Total Revenue',
    'Return on Ad Spend (ROAS)',
    'Total Conversions',
    'Cost Per Acquisition (CPA)',
    'Website Sessions',
    'Conversion Rate',
    'Email Subscribers (net new)',
    'Customer Acq. Cost (CAC)',
    'Customer LTV',
    'Marketing Qualified Leads',
    'Sales Qualified Leads',
  ];

  // Formats for Target/Actual columns per KPI
  const dashFmts = [
    '$#,##0.00', '$#,##0.00', '0.00"x"', '#,##0', '$#,##0.00',
    '#,##0', '0.00%', '#,##0', '$#,##0.00', '$#,##0.00', '#,##0', '#,##0',
  ];

  dashKpiNames.forEach((kpiName, i) => {
    const r = 6 + i;
    const fill = i % 2 === 0 ? whiteFill : altRowFill;
    // Columns: B=KPI, C=Target, D=Actual, E=Variance, F=% to Target, G=Status, H=Trend
    setRow(ws3, r, ['', kpiName, 0, 0, '', '', '', ''], { font: bodyFont, fill });
    ws3.getCell(r, 2).font = { ...bodyFont, bold: true };
    ws3.getCell(r, 3).numFmt = dashFmts[i]; // Target
    ws3.getCell(r, 4).numFmt = dashFmts[i]; // Actual
    // Variance = Actual - Target
    ws3.getCell(r, 5).value = { formula: `D${r}-C${r}` };
    ws3.getCell(r, 5).numFmt = dashFmts[i];
    // % to Target = Actual / Target
    ws3.getCell(r, 6).value = { formula: `IF(C${r}=0,0,D${r}/C${r})` };
    ws3.getCell(r, 6).numFmt = '0.0%';
    // Status: conditional on % to Target
    ws3.getCell(r, 7).value = { formula: `IF(F${r}>=1,"🟢",IF(F${r}>=0.8,"🟡","🔴"))` };
    // Trend left as manual input
    ws3.getCell(r, 8).value = '';
  });

  // Notes section
  const noteStart = 6 + dashKpiNames.length + 2;
  ws3.mergeCells(`B${noteStart}:H${noteStart}`);
  ws3.getCell(`B${noteStart}`).value = 'DASHBOARD NOTES';
  ws3.getCell(`B${noteStart}`).font = { ...subHeaderFont, size: 12 };
  ws3.getCell(`B${noteStart}`).fill = subHeaderFill;

  ws3.mergeCells(`B${noteStart + 1}:H${noteStart + 1}`);
  ws3.getCell(`B${noteStart + 1}`).value = '[Add any context, caveats, or data quality notes here. E.g., "Revenue data excludes offline conversions" or "CPA target adjusted mid-month"]';
  ws3.getCell(`B${noteStart + 1}`).font = { ...bodyFont, color: { argb: C.gray } };
  ws3.getCell(`B${noteStart + 1}`).alignment = { wrapText: true };
  ws3.getRow(noteStart + 1).height = 40;

  // ── Tab 4: Monthly Trends ──
  const ws4 = wb.addWorksheet('Monthly Trends', { properties: { tabColor: { argb: '8B5CF6' } } });
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  ws4.columns = [
    { width: 3 }, { width: 24 },
    ...months.map(() => ({ width: 12 })),
    { width: 12 }, { width: 12 },
  ];

  ws4.mergeCells('B2:P2');
  ws4.getCell('B2').value = '📅 MONTHLY TREND ANALYSIS';
  ws4.getCell('B2').font = { name: 'Calibri', bold: true, size: 16, color: { argb: C.white } };
  ws4.getCell('B2').fill = headerFill;
  ws4.getCell('B2').alignment = { horizontal: 'center', vertical: 'middle' };
  ws4.getRow(2).height = 36;

  ws4.mergeCells('B3:P3');
  ws4.getCell('B3').value = 'Year: [2026] | Enter monthly values to track trends over time';
  ws4.getCell('B3').font = { ...smallFont, italic: true };
  ws4.getCell('B3').alignment = { horizontal: 'center' };
  ws4.getCell('B3').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.lightBlue } };

  const trendHeader = ['', 'Metric', ...months, 'YTD Total', 'YoY Change'];
  setRow(ws4, 5, trendHeader, { font: { ...headerFont, size: 10 }, fill: headerFill });
  ws4.getRow(5).height = 28;

  const trendMetrics = [
    'Total Spend', 'Total Revenue', 'ROAS', 'Conversions', 'CPA',
    'Website Sessions', 'Conversion Rate', 'Email Subscribers', 'New Customers',
  ];

  // Month columns: C=Jan(col3), D=Feb(col4), ... N=Dec(col14), O=YTD Total(col15), P=YoY Change(col16)
  const monthCols = ['C','D','E','F','G','H','I','J','K','L','M','N'];
  // Rate metrics that shouldn't be summed for YTD (use average instead)
  const rateMetrics = ['ROAS', 'CPA', 'Conversion Rate'];

  trendMetrics.forEach((metric, i) => {
    const r = 6 + i;
    const fill = i % 2 === 0 ? whiteFill : altRowFill;
    const vals = ['', metric, ...months.map(() => 0), '', ''];
    setRow(ws4, r, vals, { font: bodyFont, fill });
    ws4.getCell(r, 2).font = { ...bodyFont, bold: true };
    // YTD Total (col O / col 15) = SUM or AVERAGE of months
    if (rateMetrics.includes(metric)) {
      ws4.getCell(r, 15).value = { formula: `AVERAGE(C${r}:N${r})` };
    } else {
      ws4.getCell(r, 15).value = { formula: `SUM(C${r}:N${r})` };
    }
    // YoY Change (col P / col 16) left for manual input (needs prior year data)
    ws4.getCell(r, 16).value = '';
  });

  // MoM change section
  const momStart = 6 + trendMetrics.length + 2;
  ws4.mergeCells(`B${momStart}:P${momStart}`);
  ws4.getCell(`B${momStart}`).value = 'MONTH-OVER-MONTH CHANGE (%)';
  ws4.getCell(`B${momStart}`).font = { ...subHeaderFont, size: 12 };
  ws4.getCell(`B${momStart}`).fill = subHeaderFill;

  setRow(ws4, momStart + 1, trendHeader, { font: { ...headerFont, size: 10 }, fill: headerFill });

  trendMetrics.forEach((metric, i) => {
    const r = momStart + 2 + i;
    const dataRow = 6 + i; // corresponding row in the values table above
    const fill = i % 2 === 0 ? whiteFill : altRowFill;
    const vals = ['', metric, '', ...months.slice(1).map(() => ''), '', '', ''];
    setRow(ws4, r, vals, { font: bodyFont, fill });
    ws4.getCell(r, 2).font = { ...bodyFont, bold: true };
    // Jan (col C) has no prior month — leave blank
    ws4.getCell(r, 3).value = '';
    // Feb-Dec: MoM % change = (current - previous) / previous
    for (let m = 1; m < 12; m++) {
      const col = m + 3; // D=4 for Feb, E=5 for Mar, etc.
      const curCol = monthCols[m];
      const prevCol = monthCols[m - 1];
      ws4.getCell(r, col).value = { formula: `IF(${prevCol}${dataRow}=0,0,(${curCol}${dataRow}-${prevCol}${dataRow})/${prevCol}${dataRow})` };
      ws4.getCell(r, col).numFmt = '0.0%';
    }
    // YTD and YoY columns blank for MoM section
    ws4.getCell(r, 15).value = '';
    ws4.getCell(r, 16).value = '';
  });

  // Annotations
  const annStart = momStart + 2 + trendMetrics.length + 2;
  ws4.mergeCells(`B${annStart}:P${annStart}`);
  ws4.getCell(`B${annStart}`).value = 'ANNOTATIONS & KEY EVENTS';
  ws4.getCell(`B${annStart}`).font = { ...subHeaderFont, size: 12 };
  ws4.getCell(`B${annStart}`).fill = subHeaderFill;

  const annHeader = ['', 'Event Type', ...months, '', ''];
  setRow(ws4, annStart + 1, annHeader, { font: { ...headerFont, size: 10 }, fill: headerFill });

  const eventTypes = ['Campaign Launches', 'Budget Changes', 'Algorithm / Platform Updates', 'Seasonal Events', 'Other Notes'];
  eventTypes.forEach((evt, i) => {
    const r = annStart + 2 + i;
    const fill = i % 2 === 0 ? whiteFill : altRowFill;
    setRow(ws4, r, ['', evt, ...months.map(() => ''), '', ''], { font: bodyFont, fill });
    ws4.getCell(r, 2).font = { ...bodyFont, bold: true };
  });

  // ── Tab 5: Recommendations ──
  const ws5 = wb.addWorksheet('Recommendations', { properties: { tabColor: { argb: 'EF4444' } } });
  ws5.columns = [
    { width: 3 }, { width: 6 }, { width: 24 }, { width: 32 }, { width: 32 },
    { width: 28 }, { width: 14 }, { width: 16 }, { width: 16 }, { width: 5 },
  ];

  ws5.mergeCells('B2:I2');
  ws5.getCell('B2').value = '💡 RECOMMENDATIONS & ACTION ITEMS';
  ws5.getCell('B2').font = { name: 'Calibri', bold: true, size: 16, color: { argb: C.white } };
  ws5.getCell('B2').fill = headerFill;
  ws5.getCell('B2').alignment = { horizontal: 'center', vertical: 'middle' };
  ws5.getRow(2).height = 36;

  ws5.mergeCells('B3:I3');
  ws5.getCell('B3').value = 'Framework: Observation → Evidence → Recommendation → Impact → Priority';
  ws5.getCell('B3').font = { ...smallFont, italic: true };
  ws5.getCell('B3').alignment = { horizontal: 'center' };
  ws5.getCell('B3').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.lightBlue } };

  const recHeaders = ['', '#', 'Observation', 'Data Evidence', 'Recommendation', 'Expected Impact', 'Priority', 'Owner', 'Timeline'];
  setRow(ws5, 5, recHeaders, { font: { ...headerFont, size: 10 }, fill: headerFill });
  ws5.getRow(5).height = 28;

  // Pre-fill example and empty rows
  const exampleRec = [
    '', 1, 'Paid social CPA increased 34% MoM',
    'CPA went from $24 to $32. CTR dropped 18% while CPM stayed flat. Creative fatigue likely.',
    'Refresh ad creative — test 3 new variations. Narrow audience targeting on underperforming segments.',
    'Estimated 15-20% CPA reduction within 2 weeks of new creative launch',
    'High', 'Marketing Team', 'Next 7 days',
  ];
  setRow(ws5, 6, exampleRec, { font: bodyFont, fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: C.lightYellow } } });
  ws5.getCell(6, 3).font = { ...bodyFont, bold: true };
  ws5.getRow(6).height = 50;
  ws5.getRow(6).alignment = { wrapText: true, vertical: 'top' };

  // Empty recommendation rows
  for (let i = 1; i <= 7; i++) {
    const r = 6 + i;
    const fill = i % 2 === 0 ? altRowFill : whiteFill;
    setRow(ws5, r, ['', i + 1, '', '', '', '', '', '', ''], { font: bodyFont, fill });
    ws5.getRow(r).height = 50;
    ws5.getRow(r).alignment = { wrapText: true, vertical: 'top' };
  }

  // Summary section
  const sumStart = 16;
  ws5.mergeCells(`B${sumStart}:I${sumStart}`);
  ws5.getCell(`B${sumStart}`).value = 'PRIORITY SUMMARY';
  ws5.getCell(`B${sumStart}`).font = { ...subHeaderFont, size: 12 };
  ws5.getCell(`B${sumStart}`).fill = subHeaderFill;

  const priorities = [
    ['🔴 High Priority', '0', 'Items requiring immediate action this week'],
    ['🟡 Medium Priority', '0', 'Items to address within the next 2-4 weeks'],
    ['🟢 Low Priority', '0', 'Items for backlog / next quarter planning'],
  ];

  priorities.forEach((p, i) => {
    const r = sumStart + 1 + i;
    ws5.getCell(`B${r}`).value = '';
    ws5.mergeCells(`C${r}:D${r}`);
    ws5.getCell(`C${r}`).value = p[0];
    ws5.getCell(`C${r}`).font = { ...bodyFont, bold: true, size: 11 };
    ws5.getCell(`E${r}`).value = p[1];
    ws5.getCell(`E${r}`).font = { ...bodyFont, size: 14, bold: true };
    ws5.getCell(`E${r}`).alignment = { horizontal: 'center' };
    ws5.mergeCells(`F${r}:I${r}`);
    ws5.getCell(`F${r}`).value = p[2];
    ws5.getCell(`F${r}`).font = smallFont;
  });

  // ── Tab 6: Setup & Instructions ──
  const ws6 = wb.addWorksheet('Setup & Instructions', { properties: { tabColor: { argb: '6B7280' } } });
  ws6.columns = [{ width: 3 }, { width: 24 }, { width: 60 }, { width: 5 }];

  ws6.mergeCells('B2:C2');
  ws6.getCell('B2').value = '📖 SETUP & INSTRUCTIONS';
  ws6.getCell('B2').font = { name: 'Calibri', bold: true, size: 16, color: { argb: C.white } };
  ws6.getCell('B2').fill = headerFill;
  ws6.getCell('B2').alignment = { horizontal: 'center', vertical: 'middle' };
  ws6.getRow(2).height = 36;

  // Metric definitions
  ws6.mergeCells('B4:C4');
  ws6.getCell('B4').value = 'METRIC DEFINITIONS';
  ws6.getCell('B4').font = { ...subHeaderFont, size: 13 };
  ws6.getCell('B4').fill = subHeaderFill;

  setRow(ws6, 5, ['', 'Metric', 'Definition'], { font: { ...headerFont, size: 10 }, fill: headerFill });

  const metrics = [
    ['Impressions', 'Number of times your ad or content was displayed to a user'],
    ['Clicks', 'Number of times a user clicked on your ad, link, or CTA'],
    ['CTR (Click-Through Rate)', 'Clicks ÷ Impressions × 100. Measures how compelling your creative/messaging is.'],
    ['Conversions', 'Completed desired actions (purchases, sign-ups, form fills, etc.)'],
    ['Conversion Rate', 'Conversions ÷ Clicks × 100 (or ÷ Sessions for site-wide rate)'],
    ['CPA (Cost Per Acquisition)', 'Total Spend ÷ Conversions. What you pay for each conversion.'],
    ['ROAS (Return on Ad Spend)', 'Revenue ÷ Ad Spend. Every $1 spent returns $X in revenue.'],
    ['Revenue', 'Total monetary value generated from marketing-attributed conversions'],
    ['CAC (Customer Acquisition Cost)', 'Total marketing + sales cost ÷ new customers acquired'],
    ['LTV (Lifetime Value)', 'Predicted total revenue from a customer over their entire relationship'],
    ['MQL (Marketing Qualified Lead)', 'A lead that meets marketing criteria for sales-readiness'],
    ['SQL (Sales Qualified Lead)', 'A lead that sales has accepted as ready for direct outreach'],
    ['CPM (Cost Per Mille)', 'Cost per 1,000 impressions. Standard display/social metric.'],
    ['CPC (Cost Per Click)', 'Total Spend ÷ Clicks. What you pay for each click.'],
  ];

  metrics.forEach((m, i) => {
    const r = 6 + i;
    const fill = i % 2 === 0 ? whiteFill : altRowFill;
    setRow(ws6, r, ['', m[0], m[1]], { font: bodyFont, fill });
    ws6.getCell(r, 2).font = { ...bodyFont, bold: true };
    ws6.getCell(r, 3).alignment = { wrapText: true };
  });

  // Status indicators
  const statusStart = 6 + metrics.length + 2;
  ws6.mergeCells(`B${statusStart}:C${statusStart}`);
  ws6.getCell(`B${statusStart}`).value = 'STATUS INDICATORS';
  ws6.getCell(`B${statusStart}`).font = { ...subHeaderFont, size: 13 };
  ws6.getCell(`B${statusStart}`).fill = subHeaderFill;

  const statuses = [
    ['🟢 Green / On Track', 'Metric is at or above target (≥100% of goal)'],
    ['🟡 Yellow / Monitor', 'Metric is close to target but needs attention (80-99% of goal)'],
    ['🔴 Red / Action Required', 'Metric is significantly below target (<80% of goal)'],
    ['↑ Up', 'Metric improved vs. previous period'],
    ['↓ Down', 'Metric declined vs. previous period'],
    ['→ Flat', 'Metric stayed roughly the same vs. previous period (within ±5%)'],
  ];

  setRow(ws6, statusStart + 1, ['', 'Indicator', 'Meaning'], { font: { ...headerFont, size: 10 }, fill: headerFill });
  statuses.forEach((s, i) => {
    const r = statusStart + 2 + i;
    const fill = i % 2 === 0 ? whiteFill : altRowFill;
    setRow(ws6, r, ['', s[0], s[1]], { font: bodyFont, fill });
    ws6.getCell(r, 2).font = { ...bodyFont, bold: true };
  });

  // Data sources guide
  const dsStart = statusStart + 2 + statuses.length + 2;
  ws6.mergeCells(`B${dsStart}:C${dsStart}`);
  ws6.getCell(`B${dsStart}`).value = 'WHERE TO PULL YOUR DATA';
  ws6.getCell(`B${dsStart}`).font = { ...subHeaderFont, size: 13 };
  ws6.getCell(`B${dsStart}`).fill = subHeaderFill;

  setRow(ws6, dsStart + 1, ['', 'Channel', 'Primary Data Source'], { font: { ...headerFont, size: 10 }, fill: headerFill });

  const sources = [
    ['Paid Search', 'Google Ads / Microsoft Ads dashboard or API'],
    ['Paid Social', 'Meta Ads Manager, LinkedIn Campaign Manager, TikTok Ads, etc.'],
    ['Organic Search', 'Google Analytics 4 + Google Search Console'],
    ['Organic Social', 'Native platform analytics (Meta Insights, LinkedIn Analytics, etc.)'],
    ['Email Marketing', 'ESP dashboard (Mailchimp, HubSpot, Klaviyo, etc.)'],
    ['Display / Programmatic', 'DSP dashboard (Google DV360, The Trade Desk, etc.)'],
    ['Affiliate / Referral', 'Affiliate platform (Impact, ShareASale, etc.) + GA4 referral report'],
    ['Website / Overall', 'Google Analytics 4 or Adobe Analytics'],
  ];

  sources.forEach((s, i) => {
    const r = dsStart + 2 + i;
    const fill = i % 2 === 0 ? whiteFill : altRowFill;
    setRow(ws6, r, ['', s[0], s[1]], { font: bodyFont, fill });
    ws6.getCell(r, 2).font = { ...bodyFont, bold: true };
  });

  // Tips
  const tipStart = dsStart + 2 + sources.length + 2;
  ws6.mergeCells(`B${tipStart}:C${tipStart}`);
  ws6.getCell(`B${tipStart}`).value = 'PRO TIPS';
  ws6.getCell(`B${tipStart}`).font = { ...subHeaderFont, size: 13 };
  ws6.getCell(`B${tipStart}`).fill = subHeaderFill;

  const tips = [
    '1. Make a copy of this template each month — keep a clean master version.',
    '2. Pull data consistently on the same day each month for accurate comparisons.',
    '3. Use the Recommendations tab every month — it\'s the most valuable part of the report.',
    '4. Add your company logo and brand colors to make the report feel custom.',
    '5. Hide tabs or rows you don\'t use rather than deleting them.',
    '6. Set up data connections if possible (Google Sheets → GA4, Supermetrics, etc.) to auto-populate.',
    '7. Present the Executive Summary first. Only dive into details when asked.',
    '8. Export as PDF for email distribution. Keep the live sheet for interactive review.',
  ];

  tips.forEach((tip, i) => {
    const r = tipStart + 1 + i;
    ws6.mergeCells(`B${r}:C${r}`);
    ws6.getCell(`B${r}`).value = tip;
    ws6.getCell(`B${r}`).font = bodyFont;
    ws6.getCell(`B${r}`).alignment = { wrapText: true };
    ws6.getRow(r).height = 22;
  });

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });

  // Write file
  await wb.xlsx.writeFile(OUTPUT);
  console.log(`✅ Generated: ${OUTPUT}`);
}

main().catch(err => { console.error(err); process.exit(1); });
