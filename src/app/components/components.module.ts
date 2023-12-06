import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AngularMaterialModule } from '../_modules/angular-material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    AddTaskComponent,
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    AngularMaterialModule,
    FormsModule
  ]
})
export class ComponentsModule { }
