import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Defaults, AppProvider, Strings, User } from '../../providers';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


declare var google: any;
@IonicPage({
  segment: 'signup',
  defaultHistory: ["LoginPage"]
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  @ViewChild('address', { read: ElementRef }) address: ElementRef;

  autocomplete: any;
  GoogleAutocomplete: any;
  geocoder: any
  autocompleteItems: any;
  searchAddress: boolean = true;

  account: any = {
    firstname: null,
    lastname: null,
    address: null,
    city: null,
    state: null,
    zipcode: null,
    email: null,
    phone: null,
    phonetype: null,
    is_full_time: null,
    have_crews: null,
    no_of_crews: 0,
    work_sched: {
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
    },
    date_start: null,
    num_of_jobs: 0,
    eq: [],
    lng: null,
    lat: null
  }

  eqList: any;
  formAccount: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public zone: NgZone,
    private app: AppProvider,
    private user: User) {
    this.eqList = Defaults.equipments;

    this.formAccount = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.compose([Validators.email, Validators.required])],
      phone: [null, Validators.required],
      phonetype: [null, Validators.required],
      address: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.compose([Validators.maxLength(2), Validators.required])],
      zipcode: [null, Validators.required],

      is_full_time: [null, Validators.required],
      have_crews: [null, Validators.required],
      no_of_crews: [null, Validators.required],
      work_sched: [null, Validators.required],
      date_start: [null, Validators.required],
      num_of_jobs: [null, Validators.required],
      eq: [[], Validators.required],
    });

    this.geocoder = new google.maps.Geocoder;
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    };
    this.autocompleteItems = [];
  }


  doSignup() {
    console.log(this.formAccount.value)
    this.user.signup(this.formAccount.value).subscribe((res: any) => {
      console.log(res)
     
    }, (err) => {
      this.app.alertMsg(JSON.stringify(err))
    });
  }


  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        if (predictions) {
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
      });
  }

  selectSearchResult(item) {
    this.app.loadingShow(Strings.LOADING_WAIT)
    this.autocompleteItems = [];
    this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
      if (status === 'OK' && results[0]) {
        let position = {
          lat: results[0].geometry.location.lat,
          lng: results[0].geometry.location.lng
        };
        console.log(JSON.stringify(results))

        let postal_code;
        let state;
        let result = results[0];
        for (let index = 0; index < result.address_components.length; index++) {
          if (result.address_components[index].types[0] == "postal_code")
            postal_code = result.address_components[index].short_name
          if (result.address_components[index].types[0] == "administrative_area_level_1")
            state = result.address_components[index].short_name
        }

        this.autocomplete.input = result.formatted_address;
        let shortAddress = this.autocomplete.input.substr(result.formatted_address.indexOf(','));

        this.account.address = this.autocomplete.input.replace(shortAddress, "");
        this.account.city = result.address_components[3].short_name
        this.account.lng = position.lng;
        this.account.lat = position.lat;
        this.account.state = state
        this.account.zipcode = postal_code
        this.searchAddress = false;
        console.log(this.account.address)
      }

      this.app.loadingHide();
    });
  }


  isSearchAddress(){
    this.searchAddress = !this.searchAddress
  }

}
