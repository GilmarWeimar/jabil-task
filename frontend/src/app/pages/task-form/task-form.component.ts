import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: any = {
    title: '',
    description: '',
    priority: 'Low',
    status: 'NotStarted'
  };

  isEdit = false;
  id: string | null = null;

  constructor(
    private service: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.isEdit = true;

      this.service.getById(this.id).subscribe(res => {
        this.task = res.data;
      });
    }
  }

  save() {
    const dto = {
      title: this.task.title,
      description: this.task.description,
      priority: this.task.priority,
      status: this.task.status
    };

    if (this.isEdit) {
      this.service.update(this.id!, dto).subscribe(() => {

        this.snackBar.open('✅ Task editada com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });

        this.router.navigate(['/']);
      });
    } else {
      this.service.create(dto).subscribe(() => {

        this.snackBar.open('✅ Task criada com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });

        this.router.navigate(['/']);
      });
    }
  }
}