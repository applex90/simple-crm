import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent implements OnInit {
  userId = '';
  user: User = new User();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  actionCtrl = new FormControl('');
  filteredActions: Observable<string[]>;
  actions: string[] = [];
  allActions: string[] = ['offer created', 'offer sent', 'bill sent', 'bill payed'];

  @ViewChild('actionInput') actionInput: ElementRef<HTMLInputElement>;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {
    this.filteredActions = this.actionCtrl.valueChanges.pipe(
      startWith(null),
      map((action: string | null) => (action ? this._filter(action) : this.allActions.slice())),
    );
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log('userId is:', this.userId);
      this.getUser();
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our action
    if (value) {
      this.actions.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.actionCtrl.setValue(null);

    //save actions
    this.save();
  }

  remove(action: string): void {
    const index = this.actions.indexOf(action);

    if (index >= 0) {
      this.actions.splice(index, 1);
    }

    //save actions
    this.save();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.actions.push(event.option.viewValue);
    //save actions
    this.save();
    this.actionInput.nativeElement.value = '';
    this.actionCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allActions.filter(action => action.toLowerCase().includes(filterValue));
  }

  save() {
    this.user.actions = this.actions;
    this.firestore
      .collection('crmusers')
      .doc(this.userId)
      .update(this.user.toJSON())
      .then(() => {
        console.log(this.user.toJSON());
      })
  }

  getUser() {
    this.firestore
      .collection('crmusers')
      .doc(this.userId)
      .valueChanges()
      .subscribe((user: any) => {
        this.user = new User(user);
        this.actions = user.actions;
        console.log('Retrieved user', this.user);
      });
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
    dialog.componentInstance.vatcheck.vatState = this.user.vatState;
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

}



