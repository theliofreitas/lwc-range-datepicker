import { LightningElement, api } from 'lwc';
import { defaultInputDate } from './helper';

export default class Datetimepicker extends LightningElement {	
	@api startDatetime = defaultInputDate().startDate;
	@api endDatetime = defaultInputDate().endDate;
}