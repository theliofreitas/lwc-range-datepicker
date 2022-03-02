import { LightningElement, api } from 'lwc';
import { defaultInputDate } from './helper';

export default class Datetimepicker extends LightningElement {	
	@api startDatetime = defaultInputDate().startDate;
	@api endDatetime = defaultInputDate().endDate;
	@api rangeInMinutes = 60;

	handleStartDateChange(event) {
		const currentStartDate = new Date(event.detail.value);
		this.startDatetime = currentStartDate.toISOString();

		const newEndDate = new Date(currentStartDate);
		newEndDate.setMinutes(currentStartDate.getMinutes() + this.rangeInMinutes);
		this.endDatetime = newEndDate.toISOString();
	}

	handleEndDateChange(event) {
		const currentStartDate = new Date(this.startDatetime);
		const currentEndDate = new Date(event.detail.value);

		if (currentEndDate <= currentStartDate) {
			const newStartDate = new Date(currentEndDate);
			newStartDate.setMinutes(currentEndDate.getMinutes() - this.rangeInMinutes);
		
			this.startDatetime = newStartDate.toISOString();
		}
		else if (currentEndDate > currentStartDate) {
			const hours = (currentEndDate.getHours() - currentStartDate.getHours());
			const newRange = (currentEndDate.getMinutes() - currentStartDate.getMinutes()) + (hours * 60);

			this.rangeInMinutes = newRange;
		}
	}
}