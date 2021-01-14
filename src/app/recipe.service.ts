import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { RecipeDetails } from "./models";

@Injectable()
export class RecipeService {

    constructor ( private http: HttpClient ) {}

    searchRecipe (q: string, c: string, m: string) {
        
        const url: string = 'https://api.spoonacular.com/recipes/complexSearch'
        const apiKey = environment['apiKey']
        const resultCount: number = 3
        const query: string = q
        const instructionsRequired: boolean = true

        const params = new HttpParams()
            .set('apiKey', apiKey)
            .set('number', `${resultCount}`)
            .set('query', query)
            .set('instructionsRequired', `${instructionsRequired}`)
            // .set('cuisine', c)
            // .set('type', m)

        return this.http.get(url, { 'params': params })
            .toPromise()
    }

    getRecipeInformation (id: number) {

        const url: string = `https://api.spoonacular.com/recipes/${id}/information`

        const apiKey = environment['apiKey']
        const params = new HttpParams()
            .set('apiKey', apiKey)

        return this.http.get(url, { 'params': params })
            .toPromise()
    }

    queryRecipe(q: string, c: string, m: string) {
        
        const params = new HttpParams()
            .set('q', q)
            // .set('cuisine', c)
            // .set('type', m)

        return this.http.get('/api/spoon', { 'params': params })
        .toPromise()
    }

}