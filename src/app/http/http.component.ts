import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.css'],
})
export class HttpComponent implements OnInit {
  /**
   * Fire base practice
   */
  arr = [];
  form: FormControl;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.http
    //   .post(
    //     'https://my-project-go-77d65-default-rtdb.firebaseio.com/posts.json',
    //     { title: 'SI is not king', data: 'My SI is king' }
    //   )
    //   .subscribe(console.log);

    // this.http
    //   .delete(
    //     'https://my-project-go-77d65-default-rtdb.firebaseio.com/posts/'
    //   )
    //   .subscribe();

    this.getData();
    this.form = new FormControl('');
  }

  getData() {
    this.http
      .get('https://my-project-go-77d65-default-rtdb.firebaseio.com/posts.json')
      .pipe(
        map((data) => {
          let arr = [];
          for (const key in data) {
            arr.push({ ...data[key], id: key });
          }

          return arr;
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.arr = [data[0].id];
        console.log(this.arr);
      });
  }

  onSubmit() {
    this.http
      .post(
        'https://my-project-go-77d65-default-rtdb.firebaseio.com/posts.json',
        { title: this.form.value, data: 'My SI is 2' }
      )
      .subscribe(console.log);
    this.getData();

    this.form.reset();
  }
  onDelete() {
    this.http
      .delete(
        `https://my-project-go-77d65-default-rtdb.firebaseio.com/posts/${this.arr[0]}.json`
      )
      .subscribe();
  }
}
