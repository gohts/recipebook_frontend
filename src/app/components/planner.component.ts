import { Component, OnInit } from '@angular/core';
import { ViewChild, TemplateRef } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarView } from 'angular-calendar';
import { RecipeDetails } from '../models';
import { PlannerService } from '../planner.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})

export class PlannerComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteEvent(event);
      },
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private plannerSvc: PlannerService) {}

  ngOnInit(): void {
    this.fetchEvents();
    this.fetchIngredients();
  }

  fetchEvents(): void {
    this.plannerSvc.getPlanRecipe()
      .then(r => {
        const result = r as RecipeDetails[]
        
        for (let i=0; i<result.length; i++) {

            const event: CalendarEvent = {
              start: new Date(result[i]['plannedDate']),
              title: result[i]['title'],
              color: colors.blue,
              actions: this.actions,
              meta: {
                id: result[i]['id'],
                image: result[i]['image'],
                url: result[i]['spoonacularSourceUrl'],
                instructions: result[i]['instructions'],
                oid: result[i]['_id'],
                isMeal: true
              }
            }
            this.events.push(event)
            this.viewDate = new Date();
        }
      })
      .catch(e => console.error(e))
  }

  // need to settle
  fetchIngredients(): void {
    this.plannerSvc.getPlanIngredients()
      .then(r => {
        const result = r as []

        for (let i=0; i<result.length; i++) {

            const event: CalendarEvent = {
              start: new Date(result[i]['_id']),
              title: 'Marketing List',
              color: colors.yellow,
              meta: {
                ingredients: result[i]['ingredients'],
                isMeal: false

              }
            }
            this.events.push(event)
            this.viewDate = new Date();
        }
      })
      .catch(e => console.error(e))
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  deleteEvent(eventToDelete: CalendarEvent) {

    this.events = this.events.filter((event) => event !== eventToDelete);

    const oid = eventToDelete.meta.oid

    this.plannerSvc.removePlannedRecipe(oid)
      .then(r => console.log(r))
      .then(e => console.log(e))

  }
  
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}



