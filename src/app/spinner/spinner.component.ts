import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotesService } from '../shared/notes-service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnDestroy {

  loading: boolean = false;
  private loadingSubscription: Subscription;

  constructor(private notesService: NotesService) {
    this.loadingSubscription = notesService.loading.subscribe(loading => this.loading = loading);
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
