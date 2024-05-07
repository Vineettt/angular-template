import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BasePageComponent } from './elements/base-page/base-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SidebarComponent } from './elements/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { BaseElementComponent } from './elements/base-element/base-element.component';
import { InputComponent } from './elements/input/input.component';
import { ButtonComponent } from './elements/button/button.component';
import { MatToolbarModule } from '@angular/material/toolbar'; 

@NgModule({
  declarations: [
    BasePageComponent,
    SidebarComponent,
    AlertModalComponent,
    BaseElementComponent,
    InputComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    MatTabsModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule
  ],
  exports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    BasePageComponent,
    BaseElementComponent,
    MatTabsModule,
    SidebarComponent,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    InputComponent,
    ButtonComponent,
    MatButtonModule
  ],
})
export class SharedModule {}
