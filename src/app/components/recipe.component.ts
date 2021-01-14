import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { RecipeDetails } from '../models';
import { PlannerService } from '../planner.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { startOfWeek } from 'date-fns';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  modalForm: FormGroup
  modalData
  modalReference
  canPlan: boolean

  recipes: RecipeDetails[]

  constructor(private plannerSvc: PlannerService, private modal: NgbModal, private fb: FormBuilder, private authSvc: AuthService) { }

  ngOnInit(): void {

    this.modalForm = this.fb.group({
      plannedDate: this.fb.control('',[Validators.required])
    })

    this.plannerSvc.getRecipe()
      .then(r => {
        
        this.recipes = r as RecipeDetails[]
        for (let i=0; i<this.recipes.length; i++){
          delete this.recipes[i]['_id']
        }
        
      })
      .catch(e => console.error(e))
    
      this.canPlan = this.authSvc.isLogin()

  }

  toggleDetails(id: number) {
    const idx = this.recipes.findIndex(r => r.id == id)
    this.recipes[idx].showDetails = !this.recipes[idx].showDetails
  }

  planClicked(id: number) {
    const idx = this.recipes.findIndex(r => r.id == id)
    this.modalData = this.recipes[idx]    
    this.modalReference = this.modal.open(this.modalContent, { size: 'lg' });
  }

  planRecipe(id: number) {
    
    const idx = this.recipes.findIndex(r => r.id == id);
    const recipeplan = this.recipes[idx];
    const plannedDate = new Date(this.modalForm.controls['plannedDate'].value)
    const weekStart = startOfWeek(new Date(plannedDate))

    recipeplan['plannedDate'] = plannedDate
    recipeplan['weekStart'] = weekStart

    this.plannerSvc.planRecipe(recipeplan)
        .then( r => console.info(r))
        .catch(e => console.error(e))
    
    this.modalForm.reset()
    this.modalReference.close()

  }


}