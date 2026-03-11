import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-create-modal',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      department: ['', Validators.required],
      position: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const formValues = this.employeeForm.value;

    // MAPIRANJE: Pretvaramo polja iz forme u format koji backend očekuje (prema JSON-u)
    const payload: any = {
      ime: formValues.firstName,
      prezime: formValues.lastName,
      email: formValues.email,
      brojTelefona: formValues.phoneNumber,
      datumRodjenja: formValues.birthDate,
      pol: formValues.gender,
      pozicija: formValues.position,
      departman: formValues.department,
      role: formValues.role,
      aktivan: true,
      username: formValues.email.split('@')[0], // Generišemo privremeni username
      password: "Sifra123!" // Default šifra
    };

    this.employeeService.createEmployee(payload).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error('Greška pri kreiranju zaposlenog:', err);
      }
    });
  }
}