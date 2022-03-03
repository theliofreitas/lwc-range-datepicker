import { LightningElement, api } from 'lwc';
import { defaultInputDate } from './helper';

export default class Datetimepicker extends LightningElement {	
	@api startDatetime = defaultInputDate().startDate;
	@api endDatetime = defaultInputDate().endDate;
	// Time interval in milliseconds: 3600000 ms = 1 hour
	@api rangeInMillisecs = 3600000;

	handleStartDateChange(event) {
		const currentStartDate = new Date(event.detail.value);
		this.startDatetime = currentStartDate.toISOString();

		const newEndDate = new Date(currentStartDate);
		newEndDate.setTime(currentStartDate.getTime() + this.rangeInMillisecs);

		this.endDatetime = newEndDate.toISOString();
	}

	handleEndDateChange(event) {
		const currentStartDate = new Date(this.startDatetime);
		const currentEndDate = new Date(event.detail.value);

		if (currentEndDate <= currentStartDate) {
			const newStartDate = new Date(currentEndDate);
			newStartDate.setTime(currentEndDate.getTime() - this.rangeInMillisecs);

			this.startDatetime = newStartDate.toISOString();
		}
		else if (currentEndDate > currentStartDate) {
			const timeInterval = (currentEndDate - currentStartDate);
			
			this.rangeInMillisecs = timeInterval;
		}
	}
}