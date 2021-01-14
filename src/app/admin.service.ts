import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AdminService {

    constructor (private http: HttpClient) {}

    getUsers() {
        return this.http.get('/api/admin')
            .toPromise()
    }

    addUser(email, role, name) {
        const body = {email, role, name}

        return this.http.post('/api/admin', body)
            .toPromise()
    }

    deleteUser(email) {

        return this.http.delete(`/api/admin/${email}`)
            .toPromise()
    }

    updateUser(email, role) {
        const body = {role}

        return this.http.put(`/api/admin/${email}`, body)
            .toPromise()
    }


}