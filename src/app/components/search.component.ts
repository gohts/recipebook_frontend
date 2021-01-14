import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeDetails } from '../models';
import { PlannerService } from '../planner.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  mealType: string[] = [
    'main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink'
  ]
  
  cuisineType: string[] = [
    'African',	'American',	'British',	'Cajun',	'Caribbean',	'Chinese',	'Eastern European',	'European',	'French',	'German',	'Greek',	'Indian',	'Irish',	'Italian',	'Japanese',	'Jewish',	'Korean',	'Latin American',	'Mediterranean',	'Mexican',	'Middle Eastern',	'Nordic',	'Southern',	'Spanish',	'Thai',	'Vietnamese'
  ]

  searchResults: RecipeDetails[] = [  ]

  form: FormGroup

  constructor(private fb: FormBuilder, private recipeSvc: RecipeService, private plannerSvc: PlannerService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      query: this.fb.control('', [Validators.required]),
      cuisineType: this.fb.control(null, [Validators.required]),
      mealType: this.fb.control(null, [Validators.required])
    })

  }

  searchRecipe() {
    const q: string = this.form.controls['query'].value
    const c: string = this.form.controls['cuisineType'].value
    const m: string = this.form.controls['mealType'].value

    this.recipeSvc.searchRecipe(q, c, m)
      .then(async (r) => {
        this.searchResults = []
        for (let i=0; i<r['results'].length; i++){
          const id = r['results'][i]['id']
          await this.recipeSvc.getRecipeInformation(id)
            .then(r => {
                if(!r['image'])
                  r['image'] = 'assets/images/Cook-Book-placeholder.png'
                r['showDetails'] = false
                delete r['vegetarian'];
                delete r['vegan'];
                delete r['glutenFree'];
                delete r['dairyFree'];
                delete r['cheap'];
                delete r['sustainable'];
                delete r['weightWatcherSmartPoints'];
                delete r['gaps'];
                delete r['lowFodmap'];
                delete r['aggregateLikes'];
                delete r['spoonacularScore'];
                delete r['healthScore'];
                delete r['creditsText'];
                delete r['license'];
                delete r['sourceName'];
                delete r['pricePerServing'];
                delete r['imageType'];
                delete r['cuisines'];
                delete r['dishTypes'];
                delete r['diets'];
                delete r['occasions'];
                delete r['winePairing'];
                delete r['originalId'];
                delete r['author'];
                this.searchResults.push(r as RecipeDetails)
            })
        }
        console.log('>>>resultSet: ', this.searchResults);
      })
      .catch(e => console.error(e))

  }

  queryRecipe() {
    const q: string = this.form.controls['query'].value
    const c: string = this.form.controls['cuisineType'].value
    const m: string = this.form.controls['mealType'].value

    this.recipeSvc.queryRecipe(q, c, m)
      .then(result => {
        console.log(result['r']);
        
        this.searchResults = result['r'] as []
      })
      .catch(e => console.error(e))

  }

  toggleDetails(id: number) {
    const idx = this.searchResults.findIndex(r => r.id == id)
    this.searchResults[idx].showDetails = !this.searchResults[idx].showDetails
  }

  saveRecipe(id: number) {
    const idx = this.searchResults.findIndex(r => r.id == id);
    const recipe = this.searchResults[idx];
    recipe['showDetails'] = false

    this.plannerSvc.saveRecipe(recipe)
        .then( r => console.info(r))
        .catch(e => console.error(e))

  }

}

