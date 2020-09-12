import { Component } from '@angular/core';
import { AuthenticationService, DocumentsDetails } from '../authentication.service';

@Component({
  templateUrl: './documents.component.html'
})
export class DocumentsComponent {
  details: DocumentsDetails;

  constructor(private auth: AuthenticationService) {}
  
  ngOnInit() {    
    this.auth.documents().subscribe(document => {
      this.details = document;
    }, (err) => {
      console.error(err);
    });
  }
}
