import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { RecipeDetails } from "./models";

@Injectable()
export class PlannerService {

    baseUrl = 'http://localhost:3000'
    constructor (private http: HttpClient, private authSvc: AuthService) {}

    saveRecipe (recipe: RecipeDetails) {

        recipe['username']=this.authSvc.username
        recipe['useremail']=this.authSvc.useremail
        recipe['useravatar']=this.authSvc.profilepic
        console.log('>>Save Recipe ',recipe);

        const body = { recipe }

        return this.http.post('/api/recipe', body)
          .toPromise()
    }

    getRecipe () {

      return this.http.get('/api/recipe')
        .toPromise()
    }

    // add recipe to meal planner
    planRecipe (recipeplan) {

      const useremail=this.authSvc.useremail

      const body = { recipeplan }

      return this.http.post(`/api/recipeplan/${useremail}`, body)
        .toPromise()
    }


    // get all planned recipes
    getPlanRecipe () {

      return this.http.get(`/api/recipeplan/${this.authSvc.useremail}`)
        .toPromise()
    }

    // get all planned ingredients
    getPlanIngredients () {

      return this.http.get(`/api/ingredient/${this.authSvc.useremail}`)
        .toPromise()
    }

    removePlannedRecipe (oid: number) {

      return this.http.delete(`/api/recipeplan/${oid}`)
        .toPromise()      
    }

}