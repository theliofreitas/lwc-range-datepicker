import { LightningElement, api } from 'lwc';
import { defaultInputDate } from './helper';

export default class Datetimepicker extends LightningElement {	
	startDate = defaultInputDate().startDate;
	endDate = defaultInputDate().endDate;
	@api rangeInMillisecs;

	constructor() {
		super();
		// Default time interval in milliseconds: 3600000 ms = 1 hour
		this.rangeInMillisecs = 3600000;
	}

	handleStartDateChange(event) {
		const currentStartDate = new Date(event.target.value);
		this.startDate = currentStartDate.toISOString();

		const newEndDate = new Date(currentStartDate);
		newEndDate.setTime(currentStartDate.getTime() + this.rangeInMillisecs);

		this.endDate = newEndDate.toISOString();
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
	}
}