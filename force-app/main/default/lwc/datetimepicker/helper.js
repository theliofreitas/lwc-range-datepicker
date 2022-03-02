export function defaultInputDate() {
	let startDate = new Date(Date.now());
  startDate.setHours(startDate.getHours() + 1)
  startDate.setMinutes(0);
	
  let endDate = new Date(startDate);
	endDate.setHours(startDate.getHours() + 1);
  endDate.setMinutes(0);

	startDate = startDate.toISOString();
	endDate = endDate.toISOString();

	return { startDate, endDate };
}