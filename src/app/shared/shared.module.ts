import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BasePageComponent } from './elements/base-page/base-page.component';
import { MatTabsModule } from '@angular/material/tabs';
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
import { MatMenuModule} from '@angular/material/menu';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TableComponent } from './elements/table/table.component';
import { MatSortModule } from '@angular/material/sort';
import { TablePageSharedComponent } from './pages/table-page-shared/table-page-shared.component';
import { SelectComponent } from './elements/select/select.component';
import { ListComponent } from './elements/list/list.component';
import { BaseModalComponent } from './elements/base-modal/base-modal.component';
import { TextareaComponent } from './elements/textarea/textarea.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MonthlyDatepickerComponent } from './elements/monthly-datepicker/monthly-datepicker.component';
import { CardComponent } from './elements/card/card.component';
import { ChartComponent } from './elements/chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    BasePageComponent,
    AlertModalComponent,
    BaseElementComponent,
    InputComponent,
    ButtonComponent,
    SidebarComponent,
    NavbarComponent,
    TableComponent,
    TablePageSharedComponent,
    SelectComponent,
    ListComponent,
    BaseModalComponent,
    TextareaComponent,
    MonthlyDatepickerComponent,
    CardComponent,
    ChartComponent
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
    MatToolbarModule,
    MatInputModule,
    MatMenuModule,
    MatSortModule,
    MatDatepickerModule,
    NgxChartsModule
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
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    SidebarComponent,
    NavbarComponent,
    TableComponent,
    SelectComponent,
    MatListModule,
    ListComponent,
    BaseModalComponent,
    TextareaComponent,
    MatDatepickerModule,
    MonthlyDatepickerComponent,
    CardComponent,
    ChartComponent,
    NgxChartsModule
  ],
})
export class SharedModule {}
