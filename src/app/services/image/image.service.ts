import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseUrl = 'http://localhost:3000/image';

  constructor(private http: HttpClient) {}

  uploadImage(id: number, title: string, context: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    console.log('formData', formData);
    console.log('file', file);
    return this.http.post(`${this.baseUrl}/save/${id}/${title}/${context}`, formData);
  }
}
