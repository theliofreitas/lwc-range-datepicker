import { LightningElement, api } from 'lwc';
import { defaultInputDate } from './helper';

export default class Datetimepicker extends LightningElement {	
	@api rangeInMillisecs;
	@api startDate;
	@api endDate;
	@api startDateLabel;
	@api endDateLabel;

	constructor() {
		super();
		this.rangeInMillisecs = 3600000; // 3600000 ms = 1 hour
		this.startDateLabel = 'Start date';
		this.endDateLabel = 'End date';
	}

	connectedCallback() {
		const range = this.rangeInMillisecs;
		const {startDate, endDate} = defaultInputDate(range); 

		this.startDate = startDate;
		this.endDate = endDate;
	} 

	handleStartDateChange(event) {
		const currentStartDate = new Date(event.target.value);
		this.startDate = currentStartDate.toISOString();

		const newEndDate = new Date(currentStartDate);
		newEndDate.setTime(currentStartDate.getTime() + this.rangeInMillisecs);

		this.endDate = newEndDate.toISOString();

		this.dispatchEvent(createEvent({startDate: this.startDate, endDate: this.endDate}));
	}

	handleEndDateChange(event) {
		const currentStartDate = new Date(this.startDate);
		const currentEndDate = new Date(event.target.value);

		if (currentEndDate <= currentStartDate) {
			const newStartDate = new Date(currentEndDate);
			newStartDate.setTime(currentEndDate.getTime() - this.rangeInMillisecs);

			this.startDate = newStartDate.toISOString();
		}
		else if (currentEndDate > currentStartDate) {
			const timeInterval = (currentEndDate - currentStartDate);
			
			this.rangeInMillisecs = timeInterval;
		}

		this.endDate = currentEndDate.toISOString();

		this.dispatchEvent(createEvent({startDate: this.startDate, endDate: this.endDate}));
	}
}

function createEvent(data) {
	const event = new CustomEvent('getdatevalues', {
		detail: data
	});

	return event;
}