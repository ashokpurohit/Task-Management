import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskManagement } from 'src/app/_models/taskManagement';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit{
  @ViewChild('taskForm') taskForm!: NgForm;
  task: TaskManagement;
  type: string = 'new';
  statusOption: Array<any> = [{id: 1, name: 'Open'},{id: 2, name: 'In Progress'},{id: 3, name: 'Completed'}];
  priorityOption: Array<any> = [{id: 1, name: 'Low'},{id: 2, name: 'Normal'},{id: 3, name: 'High'}];

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data && data.task) {
      this.task = JSON.parse(JSON.stringify(data.task));
    } else {
      this.task  = new TaskManagement()
    }

    if (data && data.action) {
      this.type = data.action;
    } else {
      this.type = 'new';
    }
  }

  ngOnInit(): void {
    
  }

  submitTask() {
   if (this.taskForm.valid) {
    const data = {
      task: this.task,
      action: this.type
    }
    this.dialogRef.close(data);
   }
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
