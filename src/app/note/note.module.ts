import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NoteRoutingModule } from "./note-routing.module";
import { NoteComponent } from "./note.component";
import { TranslateModule } from "@ngx-translate/core";
import { IconsModule } from "../shared/icons/icons.module";

@NgModule({
    declarations: [
        NoteComponent
    ],
    imports: [
        CommonModule,
        NoteRoutingModule,
        TranslateModule,
        IconsModule
    ]
})
export class NoteModule { }