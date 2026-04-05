import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Loan, LoanType } from '../models/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  // Real backend endpoint: GET {environment.apiUrl}/api/loans/my-loans
  private readonly baseUrl = `${environment.apiUrl}/api/loans/my-loans`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all loans for the currently logged-in client
   * Sorted by amount in descending order
   * 
   * Real data call:
   * return this.http.get<Loan[]>(this.baseUrl).pipe(
   *   map(loans => this.sortLoansByAmount(loans))
   * );
   */
  getMyLoans(): Observable<Loan[]> {
    // MOCK DATA - Remove this when backend is ready
    const mockLoans: Loan[] = [
      {
        id: 'loan-001',
        type: LoanType.MORTGAGE,
        number: 'LN-2024-001',
        amount: 250000,
        currency: 'RSD',
        status: 'APPROVED',
        createdDate: '2022-06-15T10:30:00Z',
        maturityDate: '2052-06-15T10:30:00Z',
        remainingBalance: 220000,
        interestRate: 3.5,
        monthlyPayment: 1200
      },
      {
        id: 'loan-002',
        type: LoanType.PERSONAL,
        number: 'LN-2024-002',
        amount: 50000,
        currency: 'RSD',
        status: 'OVERDUE',
        createdDate: '2023-01-20T14:45:00Z',
        maturityDate: '2025-01-20T14:45:00Z',
        remainingBalance: 15000,
        interestRate: 8.2,
        monthlyPayment: 1400
      },
      {
        id: 'loan-003',
        type: LoanType.AUTO,
        number: 'LN-2024-003',
        amount: 120000,
        currency: 'RSD',
        status: 'REPAID',
        createdDate: '2021-03-10T09:15:00Z',
        maturityDate: '2024-03-10T09:15:00Z',
        remainingBalance: 0,
        interestRate: 5.1,
        monthlyPayment: 2500
      },
      {
        id: 'loan-004',
        type: LoanType.PERSONAL,
        number: 'LN-2024-004',
        amount: 35000,
        currency: 'EUR',
        status: 'APPROVED',
        createdDate: '2023-11-05T16:20:00Z',
        maturityDate: '2025-11-05T16:20:00Z',
        remainingBalance: 28000,
        interestRate: 6.5,
        monthlyPayment: 750
      },
      {
        id: 'loan-005',
        type: LoanType.BUSINESS,
        number: 'LN-2024-005',
        amount: 500000,
        currency: 'RSD',
        status: 'REJECTED',
        createdDate: '2024-02-01T11:00:00Z',
        maturityDate: '2025-02-01T11:00:00Z',
        remainingBalance: 0,
        interestRate: 0,
        monthlyPayment: 0
      }
    ];

    // Return mock data sorted by amount descending
    return of(this.sortLoansByAmount(mockLoans));

    // REAL DATA - Uncomment when backend is ready:
    // return this.http.get<Loan[]>(this.baseUrl).pipe(
    //   map(loans => this.sortLoansByAmount(loans))
    // );
  }

  /**
   * Get a single loan by ID
   * Real backend endpoint: GET {environment.apiUrl}/api/loans/{id}
   */
  getLoanById(id: string): Observable<Loan> {
    const url = `${this.baseUrl}/${id}`;
    
    // MOCK DATA - Remove when backend is ready
    const mockLoans: Loan[] = [
      {
        id: 'loan-001',
        type: LoanType.MORTGAGE,
        number: 'LN-2024-001',
        amount: 250000,
        currency: 'RSD',
        status: 'APPROVED',
        createdDate: '2022-06-15T10:30:00Z',
        maturityDate: '2052-06-15T10:30:00Z',
        remainingBalance: 220000,
        interestRate: 3.5,
        monthlyPayment: 1200
      }
    ];
    
    return of(mockLoans[0]);

    // REAL DATA - Uncomment when backend is ready:
    // return this.http.get<Loan>(url);
  }

  /**
   * Helper method to sort loans by amount in descending order
   */
  private sortLoansByAmount(loans: Loan[]): Loan[] {
    return [...loans].sort((a, b) => b.amount - a.amount);
  }
}
