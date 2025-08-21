import { jsPDF } from 'jspdf';
import { Unit } from '../types';

interface PdfData {
    unit: Unit;
    displayDimensions: { length: number; width: number; depth: number; curveDepth: number; };
    displayResult: { volumeLiters: number; };
    unitConfig: { vol: string; };
    displayBiofilterDimensions: { length: number; width: number; };
    biofilterCalculations: { surfaceAreaM2: number; sandWeightTonnes: number; sandWeightKg: number; };
    linerDimensions: { length: number; width: number; };
    biofilterLinerDimensions: { length: number; width: number; };
    fishStocking: { minStock: number; maxStock: number; };
    warnings: string[];
    advice: string;
    pumpLphRange: { min: number; max: number; };
    headHeight: number;
}

export function generateSummaryPdf(data: PdfData): void {
    const {
        unit,
        displayDimensions,
        displayResult,
        unitConfig,
        displayBiofilterDimensions,
        biofilterCalculations,
        linerDimensions,
        biofilterLinerDimensions,
        fishStocking,
        warnings,
        advice,
        pumpLphRange,
        headHeight
    } = data;

    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
    });

    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let y = margin;

    const addTitle = (title: string) => {
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(45, 55, 72); // slate-700
        doc.text(title, pageWidth / 2, y, { align: 'center' });
        y += 15;
        doc.setTextColor(0, 0, 0);
    };
    
    const addSectionHeader = (header: string) => {
        if (y > pageHeight - 30) {
            doc.addPage();
            y = margin;
        }
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(15, 23, 42); // slate-900
        doc.text(header, margin, y);
        y += 8;
        doc.setDrawColor(203, 213, 225); // slate-300
        doc.line(margin, y - 3, pageWidth - margin, y - 3);
    };

    const addLineItem = (label: string, value: string) => {
        if (y > pageHeight - 15) {
            doc.addPage();
            y = margin;
        }
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 116, 139); // slate-500
        doc.text(label, margin, y);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(15, 23, 42); // slate-900
        doc.text(value, pageWidth - margin, y, { align: 'right' });
        y += 8;
    };
    
    const addWrappedText = (text: string, isListItem: boolean = false) => {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(51, 65, 85); // slate-600
        
        const prefix = isListItem ? '•  ' : '';
        const splitText = doc.splitTextToSize(prefix + text, pageWidth - margin * 2 - (isListItem ? 5 : 0));
        
        for (const line of splitText) {
             if (y > pageHeight - 10) {
                doc.addPage();
                y = margin;
            }
            doc.text(line, margin + (isListItem ? 5 : 0), y);
            y += 5;
        }
    };

    // --- PDF CONTENT ---
    addTitle('iAVs System Summary');

    // Alerts
    if (warnings.length > 0) {
        addSectionHeader('Alerts & Recommendations');
        doc.setFontSize(10);
        warnings.forEach(warning => {
            addWrappedText(warning, true);
            y += 1;
        });
        y += 5;
    }

    // Tank Overview
    const precision = (unit === 'm' || unit === 'ft') ? 2 : 1;
    addSectionHeader('Tank Overview');
    addLineItem('Length', `${displayDimensions.length.toFixed(precision)} ${unit}`);
    addLineItem('Width', `${displayDimensions.width.toFixed(precision)} ${unit}`);
    addLineItem('Max Depth', `${displayDimensions.depth.toFixed(precision)} ${unit}`);
    addLineItem('Bottom Profile', `${displayDimensions.curveDepth}% Catenary`);
    addLineItem('Calculated Volume', `${displayResult.volumeLiters.toFixed(0)} ${unitConfig.vol}`);
    y += 5;

    // Biofilter Overview
    addSectionHeader('Biofilter Overview');
    addLineItem('Dimensions (L x W)', `${displayBiofilterDimensions.length.toFixed(precision)} ${unit} × ${displayBiofilterDimensions.width.toFixed(precision)} ${unit}`);
    addLineItem('Surface Area', `${biofilterCalculations.surfaceAreaM2.toFixed(2)} m²`);
    addLineItem('Estimated Sand Weight', `${biofilterCalculations.sandWeightTonnes.toFixed(2)} tonnes (${biofilterCalculations.sandWeightKg.toFixed(0)} kg)`);
    y += 5;
    
    // Liner Requirements
    addSectionHeader('Liner Requirements');
    addLineItem('Fish Tank Liner Size', `${linerDimensions.length.toFixed(precision)} ${unit} × ${linerDimensions.width.toFixed(precision)} ${unit}`);
    addLineItem('Biofilter Liner Size', `${biofilterLinerDimensions.length.toFixed(precision)} ${unit} × ${biofilterLinerDimensions.width.toFixed(precision)} ${unit}`);
    y += 5;

    // Pump Requirements
    addSectionHeader('Pump Requirements');
    addLineItem('Required Flow Rate', `${pumpLphRange.min.toFixed(0)} - ${pumpLphRange.max.toFixed(0)} LPH`);
    addLineItem('Configured Head Height', `${headHeight.toFixed(precision)} ${unit}`);
    y += 5;

    // Fish Stocking
    addSectionHeader('Fish Stocking');
    const isTankTooSmall = displayResult.volumeLiters < 500 && (unitConfig.vol === "Liters") || displayResult.volumeLiters < 132 && (unitConfig.vol === "Gallons");
    addLineItem('Recommended Stocking Rate', isTankTooSmall ? "0 Fingerlings" : `${fishStocking.minStock} - ${fishStocking.maxStock} Fingerlings`);
    addLineItem('Basis', 'Fingerlings (15g each)');
    
    // Build Advice
    if (advice) {
        if (y > pageHeight - 40) { // check if there's enough space for the header
            doc.addPage();
            y = margin;
        }
        addSectionHeader('Digging & Build Guide');

        advice.split('\n').forEach(line => {
             if (y > pageHeight - 15) {
                doc.addPage();
                y = margin;
            }
            if (line.startsWith('### ') || line.startsWith('## ') || line.startsWith('# ')) {
                const headerText = line.replace(/^[#]+\s/, '');
                y += 3;
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(15, 23, 42);
                addWrappedText(headerText);
                y += 2;
            } else if (line.startsWith('* ') || line.startsWith('- ')) {
                addWrappedText(line.substring(2), true);
            } else if (line.trim() !== '') {
                 addWrappedText(line);
            } else {
                y += 2; // smaller gap for newlines
            }
        });

    } else {
        addSectionHeader('Digging & Build Guide');
        doc.setFont('helvetica', 'italic');
        addWrappedText('Build advice has not been generated. Click "Generate Build Advice" in the app and save the PDF again to include it.');
    }

    doc.save('iAVs-Summary.pdf');
}