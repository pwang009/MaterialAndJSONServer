import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/models/user/user.module';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})

export class CreateRegistrationComponent implements OnInit {
  packages = ["Monthly", "Quarterly", "Yearly"];
  genders = ["Male", "Female"];
  importantList = ["Fat reduction", "Endurance", "Muscle", "Digestive", "Craving Body", "Fitness"];
  YesOrNo = ["Yes", "No"];

  registerForm!: FormGroup;
  userId!: number;
  isUpdateActive: boolean = false;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
    private api: ApiService, private toastr: NgToastService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      // email: ['', Validators.required, Validators.email],
      // mobile: ['', Validators.required],
      // weight: ['', Validators.required],
      // height: ['', Validators.required],
      // importantList: ['', Validators.required],
      // package: ['', Validators.required],
      // gender: ['', Validators.required],
      // requestTrainer: ['', Validators.required],
      // beenGym: ['', Validators.required],
      // enquiryDate: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      importantList: [''],
      package: [''],
      gender: [''],
      requestTrainer: [''],
      beenGym: [''],
      enquiryDate: [''],
    });

    this.registerForm.controls['height'].valueChanges.subscribe(res => {
      this.calBmi(res);
    });

    this.activatedRoute.params.subscribe(val => {
      this.userId = val['id'];
      this.api.getUserById(this.userId).subscribe(res => {
        this.isUpdateActive = true;
        this.fillFormToUpdate(res);
      })
    })


  }
  fillFormToUpdate(user: User) {
    this.registerForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      importantList: user.importantList,
      package: user.package,
      gender: user.gender,
      requestTrainer: user.requestTrainer,
      beenGym: user.beenGym,
      enquiryDate: user.enquiryDate
    })
  }

  submit() {
    this.api.createUser(this.registerForm.value)
    .subscribe(res => {
      this.toastr.success({detail: "success", summary: "user created", duration: 3000});
      this.registerForm.reset();
    });
  }

  calBmi(heightValue: number) {
    const weight = this.registerForm.value.weight;
    const height = heightValue;
    const bmi = weight / (height * height);
    this.registerForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registerForm.controls['bmiResult'].patchValue("underweight");
        break;
      case (bmi >= 18.5 && bmi < 24.5):
        this.registerForm.controls['bmiResult'].patchValue("normal");
        break;
      case (bmi >= 24.5 && bmi < 30):
        this.registerForm.controls['bmiResult'].patchValue("overweight");
        break;
      default:
        this.registerForm.controls['bmiResult'].patchValue("obese");
        break;
    }
  }

  update(){
    this.api.updateUser(this.registerForm.value, this.userId)
    .subscribe(res => {
      this.toastr.success({detail: "success", summary: "user created", duration: 3000});
      this.registerForm.reset();
      this.router.navigate(['list']);
    });
  }
}
