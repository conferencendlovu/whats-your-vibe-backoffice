import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { read } from 'fs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories = [];
  addCategoryForm: FormGroup;
  editCategoryForm: FormGroup;
  selectedImage: any = null;
  imgSrc = '/assets/images/place_holder_image.png';
  editImage: string;

  constructor(private service: FirebaseService, private formBuilder: FormBuilder, private storage: AngularFireStorage) { }

  ngOnInit() {

    this.service.categories().subscribe(data => {
      console.log(data);

      this.categories = data;

    });

    this.initForm();

  }

  initForm(): void {

    this.addCategoryForm = this.formBuilder.group({

      title: ['', Validators.required],
      description: ['', Validators.required],
      url: ['']

    });

  }

  editCategory(category) {

    this.editImage = category.url;

    this.editCategoryForm = this.formBuilder.group({

      title: [category.title, Validators.required],
      description: [category.description, Validators.required],
      url: [category.url]

    });
  }

  showPreview(event: any) {

    if (event.target.files && event.target.files[0]) {

      const reader = new FileReader();

      reader.onload = (e: any) => this.imgSrc = e.target.result;

      reader.readAsDataURL(event.target.files[0]);

      this.selectedImage = event.target.files[0];

    } else { // if no file was selected, reset to default
      this.selectedImage = null;
      this.imgSrc = '/assets/images/place_holder_image.png';
    }
  }

  onSubmit(formData) {

    const filePath = 'images/categories/' + this.selectedImage.name + new Date().getTime();

    const fileRef = this.storage.ref(filePath);

    this.storage.upload(filePath, this.selectedImage)
      .snapshotChanges()
      .pipe(finalize(() => {

        fileRef.getDownloadURL().subscribe(url => {
          formData.url = url;


          this.service.addCategory(formData).then(() => {

            console.log(this.addCategoryForm.value);

            this.initForm();
          })
            .catch(err => {
              console.log('An error occured');
            });

        });

      }))
      .subscribe();
  }

  removeCategory(key) {

    this.service.removeCategory(key)
      .then(() => alert('Category Removed'))
      .catch(err => {
        console.log(err);

        alert('An error occured');
      });

  }
}
