import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Defaults, AppProvider } from '../../providers';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';



@IonicPage({
  segment: "form/agreement",
  defaultHistory: ["HomePage"]
})
@Component({
  selector: 'page-agreement',
  templateUrl: 'agreement.html',
})
export class AgreementPage {

  formInfo: any= {
    day: null,
    month: null,
    year: null,
    individual_company_name: null,
    contact_person: null,
    address: null,
    city: null,
    state: null,
    zip: null,
    email: null,
    tel_no: null,
    cell_no: null,
    alt_contact_phone_or_person: null,
    id_type: null,
    id_number: null,
    cb_signature: false,
    printed_name: null,
    date: null,
    crew_id: null
  }

  agForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private app: AppProvider) {


      this.agForm =  this.formBuilder.group({
        day: [null,Validators.required],
        month: [null,Validators.required],
        year: [null,Validators.required],
        individual_company_name: [null,Validators.required],
        contact_person: [null,Validators.required],
        address: [null,Validators.required],
        city: [null,Validators.required],
        state: [null,Validators.required],
        zip: [null,Validators.required],
        email: [null,Validators.required],
        tel_no: [null,Validators.required],
        cell_no: [null,Validators.required],
        alt_contact_phone_or_person: [null,Validators.required],
        id_type: [null,Validators.required],
        id_number: [null,Validators.required],
        cb_signature: [false,Validators.required],
        printed_name: [null,Validators.required],
        date: [new Date(),Validators.required],
        
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgreementPage');
  }

}
