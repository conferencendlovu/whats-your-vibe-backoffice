import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { read } from 'fs';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"]
})
export class CategoriesComponent implements OnInit {
  categories = [];
  available = false;
  addCategoryForm: FormGroup;
  editCategoryForm: FormGroup;
  selectedImage: any = null;
  imgSrc = "/assets/images/place_holder_image.png";
  editImage: string;
  loading = false;
  success = false;
  failer = false;
  errorMessage = "";

  constructor(
    private service: FirebaseService,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.showCategories();
    this.initForm();
  }

  showCategories() {
    this.service.getCategories().subscribe(categoryList => {
      this.categories = [];

      categoryList.forEach(a => {
        const category: any = a.payload.doc.data();

        category.id = a.payload.doc.id;

        this.categories.push(category);
      });

      if (this.categories.length > 0) {
        this.available = true;
        console.log(this.categories);
      } else {
        this.available = false;
      }

      // this.spinner.hide();
    });
  }

  initForm(): void {
    this.addCategoryForm = this.formBuilder.group({
      title: ["", Validators.required],
      url: [""]
    });
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => (this.imgSrc = e.target.result);

      reader.readAsDataURL(event.target.files[0]);

      this.selectedImage = event.target.files[0];
    } else {
      // if no file was selected, reset to default
      this.selectedImage = null;
      this.imgSrc = "/assets/images/place_holder_image.png";
    }
  }

  onSubmit(formData) {
    const filePath =
      "images/categories/" + this.selectedImage.name + new Date().getTime();

    const fileRef = this.storage.ref(filePath);

    this.loading = true;

    this.storage
      .upload(filePath, this.selectedImage)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            formData.url = url;

            this.service
              .addCategory(formData)
              .then(() => {
                console.log(this.addCategoryForm.value);
                this.loading = false;
                this.initForm();
                this.success = true;
                this.imgSrc = "/assets/images/place_holder_image.png";
              })
              .catch(err => {
                console.log("An error occured");
                this.loading = false;
                this.errorMessage = err;
                this.failer = true;
              });
          });
        })
      )
      .subscribe(
        () => {
          console.log("loading image");
        },
        error => {
          console.log(error);
          this.initForm();
          this.loading = false;
          this.errorMessage = error;
          this.failer = true;
        }
      );
  }

  removeCategory(key) {
    this.service
      .removeCategory(key)
      .then(() => console.log("Category Removed"))
      .catch(err => {
        console.log(err);

        alert("An error occured");
      });
  }
}
