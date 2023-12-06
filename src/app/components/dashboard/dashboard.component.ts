import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { TaskManagement } from 'src/app/_models/taskManagement';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/_services/data.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'subject', 'status', 'startDate', 'endDate', 'priority', 'action'];
  dataSource = new MatTableDataSource<TaskManagement>();
  taskData: Array<TaskManagement> = []
  constructor(public dataService: DataService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataService.getTaskData().subscribe(data => {
      this.taskData = data;
      this.setDataSoure(data);
    })
  }

  setDataSoure(taskData: TaskManagement[] | undefined) {
    this.dataSource = new MatTableDataSource(taskData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.setDataSoure(this.taskData.filter(d => d.subject?.trim().toLocaleLowerCase().includes(filterValue.trim().toLocaleLowerCase())));
  }

  dropTable(event: any) {
    const prevIndex = this.taskData.findIndex((d) => d === event.item.data);
    moveItemInArray(this.taskData, prevIndex, event.currentIndex);
    this.setDataSoure(this.taskData);
  }

  addTask() {
    this.openDialog();
  }

  editTask(task: TaskManagement){
    this.openDialog(task, 'edit')
  }

  removeTask(task: TaskManagement) {
    this.taskData = this.taskData.filter(d => d.id !==task.id);
    this.setDataSoure(this.taskData);
  }

  openDialog(task?: TaskManagement, action?: String): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data: {task, action},
      minWidth: '50vw',
      maxWidth: '80vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.action && result?.action === 'new') {
        const taskData = result?.task;
        taskData.id = this.taskData.length + 1;
        this.taskData.push(taskData);
        this.setDataSoure(this.taskData);
      } else if (result?.action && result?.action === 'edit'){
        this.taskData = this.taskData.map((data) => {
          if (data.id === result?.task.id) {
            return result.task;
          }
          return data;
        })
        this.setDataSoure(this.taskData)
      }
    });
  }
}
