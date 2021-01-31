import { NgModule } from '@angular/core';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { FileEarmarkPlus, Backspace, Pencil, PencilSquare } from 'ng-bootstrap-icons/icons';

const icons = {
  FileEarmarkPlus,
  Backspace,
  Pencil,
  PencilSquare
};

@NgModule({
  imports: [
    BootstrapIconsModule.pick(icons)
  ],
  exports: [
    BootstrapIconsModule
  ]
})
export class IconsModule { }
