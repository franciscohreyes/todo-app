import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TaskService } from '@modules/tasks/services/task.service';
import { Task } from '@modules/tasks/models/task.model';

import { TaskFormComponent } from '@modules/tasks/components/task-form/task-form.component';
import { NoTasksComponent } from '@shared/no-tasks/no-tasks.component';
import { NavbarComponent } from '@shared/navbar/navbar.component';
//
import { AuthService } from '@modules/auth/services/auth.service';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSlideToggleModule,
    TaskFormComponent,
    NoTasksComponent,
    NavbarComponent,
  ],
  providers: [DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  selectedTask: Task | null = null;
  isAuthenticated: boolean = false;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  /**
   * loadTasks
   */
  loadTasks() {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  get pendingTasksCount(): number {
    return this.tasks.filter(task => !task.completed).length;
  }

  /**
   * trackByTaskId
   * @param index
   * @param task
   * @returns
   */
  trackByTaskId(index: number, task: Task): string {
    return task.id ? task.id : '';
  }

  /**
   * saveTask
   * @param task
   */
  saveTask(task: Task) {
    if (task.id) {
      this.taskService.updateTask(task.id, task).subscribe((res:any) => {
        this.loadTasks();

        if (task.completed) {
          this.notificationService.showMessage(`La tarea "${task.title}" ha sido completada 🎉`);
        }
      });
    } else {
      this.taskService.addTask(task).subscribe({
        next: (newTask) => {
          this.tasks.push(newTask);
        },
        error: (error) => {
          console.error('Error al agregar tarea:', error);
        }
      }
      );
    }
    this.selectedTask = null;
  }

  /**
   * deleteTask
   * @param id
   */
  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error) => {
        console.error('Error al eliminar tarea:', error);
      }
    });
  }

  /**
   * editTask
   * @param task
   */
  editTask(task: Task) {
    this.selectedTask = { ...task };
  }

}
