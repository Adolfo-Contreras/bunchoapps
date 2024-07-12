import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { caretBack, caretForward } from 'ionicons/icons';
import { DateTime, Info, Interval } from 'luxon';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  imports: [IonIcon, CommonModule],
  standalone: true,
})
export class CalendarComponent implements OnInit {
  today: Signal<DateTime> = signal(DateTime.local());
  firstDayOfMonth: WritableSignal<DateTime> = signal(this.today().startOf('month'));
  weekdays: Signal<string[]> = signal(Info.weekdays('short'));
  daysofMonth: Signal<DateTime[]> = computed(() => {
    return Interval.fromDateTimes(
      this.firstDayOfMonth().startOf('week'),
      this.firstDayOfMonth().endOf('month').endOf('week')
    ).splitBy({ day: 1 }).map(
      (d) => {
      if (d.start === null){
        throw new Error('wrong dates');
      }
      return d.start
    })
  })
  constructor() {
    addIcons({caretBack, caretForward})
   }

  ngOnInit() { }

}
