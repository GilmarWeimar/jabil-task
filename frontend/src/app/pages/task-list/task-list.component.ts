import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  filteredTasks: any[] = [];

  search = '';
  statusFilter = '';
  priorityFilter = '';

  displayedColumns: string[] = ['title', 'description', 'status', 'priority', 'actions'];

  constructor(private service: TaskService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getTasks().subscribe(res => {
      this.tasks = res.data.data;
      this.filteredTasks = [...this.tasks];
    });
  }

  applyFilters(): void {
    this.filteredTasks = this.tasks.filter(task => {
      const matchSearch =
        !this.search ||
        task.title.toLowerCase().includes(this.search.toLowerCase());

      const matchStatus =
        !this.statusFilter || task.status === this.statusFilter;

      const matchPriority =
        !this.priorityFilter || task.priority === this.priorityFilter;

      return matchSearch && matchStatus && matchPriority;
    });

    if (!this.search && !this.statusFilter && !this.priorityFilter) {
      this.filteredTasks = [...this.tasks];
    }
  }

  delete(id: string): void {
    if (confirm('Deseja excluir esta tarefa?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }
}