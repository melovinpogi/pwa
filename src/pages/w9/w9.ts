import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Defaults, AppProvider } from '../../providers';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage({
  segment: "form/w9",
  defaultHistory: ["HomePage"]
})
@Component({
  selector: 'page-w9',
  templateUrl: 'w9.html',
})
export class W9Page {

  w9Info: any ={
    name: null,
    business_name: null,
    tax_classification: null,
    exemptions_payee_code: null,
    exemptions_from_fatca_code: null,
    address: null,
    city: null,
    state: null,
    zip: null,
    requester_name_address: null,
    list_account_number: null,
    ssn: null,
    ein: null,
    date: null,
    cb_signature: false,
    crew_id: null
  }

  w9Form: FormGroup;
  taxClass: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private app: AppProvider) {

                this.w9Form =  this.formBuilder.group({
                  name: [null,Validators.required],
                  business_name: [null],
                  tax_classification: [null,Validators.required],
                  exemptions_payee_code: [null],
                  exemptions_from_fatca_code: [null],
                  address: [null,Validators.required],
                  city: [null,Validators.required],
                  state: [null,Validators.required],
                  zip: [null,Validators.required],
                  requester_name_address: [null],
                  list_account_number: [null],
                  ssn: [null,Validators.required],
                  ein: [null,Validators.required],
                  date: [new Date(),Validators.required],
                  cb_signature: [false,Validators.required],
                })

                this.taxClass = Defaults.taxClassification;
                
  }


}
