import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { TaskManagement } from './_models/taskManagement';
import { DataService } from './_services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './components/add-task/add-task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['position', 'subject', 'status', 'startDate', 'endDate', 'priority', 'action'];
  dataSource = new MatTableDataSource<TaskManagement>();

  constructor(public dataService: DataService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.dataService.getTaskData().subscribe(data => {
      this.dataSource = data;
    })
  }

  addTask() {
    this.openDialog();
  }

  editTask(task: TaskManagement){
    this.openDialog(task, 'edit')
  }

  removeTask(task: TaskManagement) {
    this.openDialog(task, 'delete')
  }

  openDialog(task?: TaskManagement, action?: String): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
