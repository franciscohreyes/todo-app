import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
//
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
//
import { TaskService } from '@modules/tasks/services/task.service';
//
import { Task } from '@modules/tasks/models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatError
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnChanges {

  @Input() task: Task | null = null;
  @Output() saveTask = new EventEmitter<Task>();
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      completed: [false]
    });
  }

  /**
   * ngOnChanges
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
      console.log('Task changed:', this.task);
      this.taskForm.patchValue(this.task);
    }
  }

  /**
   * onSubmit
   */
  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        ...this.task,
        ...this.taskForm.value,
        createdAt: this.task ? this.task.createdAt : new Date()
      };

      this.saveTask.emit(newTask);
      this.resetForm();
    }
  }

  /**
   * resetForm
   */
  resetForm() {
    this.taskForm.reset();
    this.task = null;
  }

  /**
   * hasError
   * @param controlName
   * @param errorCode
   * @returns
   */
  hasError(controlName: string, errorCode: string): boolean {
    const control = this.taskForm.get(controlName);

    return control ? control.hasError(errorCode) : false;
  }

}
