import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChargueComponent } from "./chargue.component";
import { CreateChargueComponent } from "./components/create-chargue/create-chargue.component";
import { UpdateChargueComponent } from "./components/update-chargue/update-chargue.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { ModalModule } from "ngx-bootstrap/modal";
import { FilterChargue } from "../../common/pipes/filterChargue.pipe";
import { ChargueRouter } from "./chargue.routing";

@NgModule({
  declarations: [
    ChargueComponent,
    CreateChargueComponent,
    UpdateChargueComponent,
    FilterChargue
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    RouterModule.forChild(ChargueRouter),
  ],
})
export class ChargueModule {}
