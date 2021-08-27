export interface Operation {
  type: 'prelievo' | 'versamento',
  importo: number;
  dataPrelievo: number;
  causale: string;
  beneficiario: string;
  mittente: string;
}
