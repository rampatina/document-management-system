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
  targetfolder: String;
  currentfile: String;

  constructor(private auth: AuthenticationService, private modalService: NgbModal) {}
  
  ngOnInit() {    
    this.getRecords();
  }

  getRecords() {
    this.auth.documents().subscribe(document => {
      this.documents = document;
    }, (err) => {
      console.error(err);
    });

    this.auth.folders().subscribe(folders => {
      this.folders = folders;
    }, (err) => {
      console.error(err);
    });
  }
  onCreate(content:any) { 
    this.modalService.open(content).result.then((result) => { 
      var payload  = {
        name: this.name,
        content: this.data,
        userid: this.auth.getUserDetails()._id
      }
      this.auth.addDocument(payload).subscribe(save => {
        this.save = save;
      }, (err) => {
        console.error(err);
      });
      this.getRecords();
      this.closeResult = `Closed with: ${result}`; 
    }, (reason) => { 
      this.closeResult =  
         `Dismissed ${this.getDismissReason(reason)}`; 
    }); 
  } 

  onFolCreate(folder:any) { 
    this.modalService.open(folder).result.then((result) => { 
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
      this.getRecords();
      this.closeResult = `Closed with: ${result}`; 
    }, (reason) => { 
      this.closeResult =  
         `Dismissed ${this.getDismissReason(reason)}`; 
    }); 
  } 

  onMove(move: any) {
    this.modalService.open(move).result.then((result) => { 
      var payload  = {
        targetfoldeid: this.targetfolder,
        fileid: this.currentfile
      }
      this.auth.moveDocument(payload).subscribe(save => {
        this.save = save;
      }, (err) => {
        console.error(err);
      });
      this.getRecords();
      this.closeResult = `Closed with: ${result}`; 
    }, (reason) => { 
      this.closeResult =  
         `Dismissed ${this.getDismissReason(reason)}`; 
    }); 
  }
  
  getCurrentFile(event: any) {
    this.currentfile = event.target.id;
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
    this.folders = null;
    this.auth.getDocsInFolder(event.target.id).subscribe(document => {
      this.documents = document;
    }, (err) => {
      console.error(err);
    });
  }
}
