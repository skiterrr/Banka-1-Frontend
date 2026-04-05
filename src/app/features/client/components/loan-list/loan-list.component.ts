import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Loan, LoanStatus } from '../../models/loan.model';
import { LoanService } from '../../services/loan.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit, OnDestroy {
  loans: Loan[] = [];
  isLoading = false;
  error: string | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly loanService: LoanService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load all loans for the current user
   */
  loadLoans(): void {
    this.isLoading = true;
    this.error = null;

    this.loanService
      .getMyLoans()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (loans) => {
          this.loans = loans;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading loans:', err);
          this.error = 'Greška pri učitavanju kredita. Molimo pokušajte ponovo.';
          this.isLoading = false;
        }
      });
  }

  /**
   * Get status badge styling based on loan status
   */
  getStatusBadgeClass(status: LoanStatus): string {
    switch (status) {
      case 'APPROVED':
        return 'badge-approved';
      case 'OVERDUE':
        return 'badge-overdue';
      case 'REPAID':
        return 'badge-repaid';
      case 'REJECTED':
        return 'badge-rejected';
      default:
        return '';
    }
  }

  /**
   * Get status label in Serbian
   */
  getStatusLabel(status: LoanStatus): string {
    switch (status) {
      case 'APPROVED':
        return 'Odobren';
      case 'OVERDUE':
        return 'U kašnjenju';
      case 'REPAID':
        return 'Otplaćen';
      case 'REJECTED':
        return 'Odbijen';
      default:
        return status;
    }
  }

  /**
   * Get loan type label in Serbian
   */
  getLoanTypeLabel(type: string): string {
    switch (type) {
      case 'MORTGAGE':
        return 'Hipotekarka kredita';
      case 'PERSONAL':
        return 'Lična kredita';
      case 'AUTO':
        return 'Auto kredita';
      case 'STUDENT':
        return 'Studentska kredita';
      case 'BUSINESS':
        return 'Poslovni kredita';
      default:
        return type;
    }
  }

  /**
   * Format currency amount with thousands separator
   */
  formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('sr-RS', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  /**
   * Format date to DD.MM.YYYY
   */
  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    } catch {
      return dateString;
    }
  }

  /**
   * Navigate to loan details
   */
  viewLoanDetails(loanId: string): void {
    this.router.navigate(['/client/loans', loanId]);
  }

  /**
   * Navigate to loan request form
   */
  requestNewLoan(): void {
    this.router.navigate(['/client/loans/request']);
  }
}
