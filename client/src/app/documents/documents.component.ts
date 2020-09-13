import { Component } from '@angular/core';
import { AuthenticationService, DocumentsDetails, FolderDetails } from '../authentication.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './documents.component.html' 
})
export class DocumentsComponent {
  documents: DocumentsDetails;
  folders: FolderDetails;
  closeResult = ''; 
  name: String;
  data: String;
  save = {};
  folname: String;

  constructor(private auth: AuthenticationService, private modalService: NgbModal) {}
  
  ngOnInit() {    
    this.auth.documents().subscribe(document => {
      console.log('document ' + document);
      this.documents = document;
    }, (err) => {
      console.error(err);
    });

    this.auth.folders().subscribe(folders => {
      console.log('folders ' + folders);
      this.folders = folders;
    }, (err) => {
      console.error(err);
    });
  }

  onCreate(content:any) { 
    this.modalService.open(content).result.then((result) => { 
      console.log('content ', this.data);
      console.log('name ', this.name);
      var payload  = {
        name: this.name,
        content: this.data,
        userid: this.auth.getUserDetails()._id
      }
      console.log(payload);
      this.auth.addDocument(payload).subscribe(save => {
        this.save = save;
      }, (err) => {
        console.error(err);
      });
      this.closeResult = `Closed with: ${result}`; 
    }, (reason) => { 
      this.closeResult =  
         `Dismissed ${this.getDismissReason(reason)}`; 
    }); 
  } 

  onFolCreate(folder:any) { 
    this.modalService.open(folder).result.then((result) => { 
      console.log('name ', this.folname);
      var payload  = {
        name: this.folname,
        userid: this.auth.getUserDetails()._id
      }
      console.log(payload);
      this.auth.addFolder(payload).subscribe(save => {
        this.save = save;
      }, (err) => {
        console.error(err);
      });
      this.closeResult = `Closed with: ${result}`; 
    }, (reason) => { 
      this.closeResult =  
         `Dismissed ${this.getDismissReason(reason)}`; 
    }); 
  } 
  
  private getDismissReason(reason: any): string { 
    if (reason === ModalDismissReasons.ESC) { 
      return 'by pressing ESC'; 
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) { 
      return 'by clicking on a backdrop'; 
    } else { 
      return `with: ${reason}`; 
    } 
  } 

  showFilesInFolder(event:any) {
    console.log(event);
  }
}
