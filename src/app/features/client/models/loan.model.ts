// Loan status type definition
export type LoanStatus = 'APPROVED' | 'OVERDUE' | 'REPAID' | 'REJECTED';

// Loan type enum
export enum LoanType {
  MORTGAGE = 'MORTGAGE',
  PERSONAL = 'PERSONAL',
  AUTO = 'AUTO',
  STUDENT = 'STUDENT',
  BUSINESS = 'BUSINESS'
}

// Main Loan model
export interface Loan {
  id: string;
  type: LoanType;
  number: string;
  amount: number;
  currency: string; // e.g., 'RSD', 'USD', 'EUR'
  status: LoanStatus;
  createdDate: string; // ISO 8601 format
  maturityDate: string; // ISO 8601 format
  remainingBalance?: number; // Outstanding balance
  interestRate?: number; // Annual interest rate
  monthlyPayment?: number; // Monthly payment amount
}
