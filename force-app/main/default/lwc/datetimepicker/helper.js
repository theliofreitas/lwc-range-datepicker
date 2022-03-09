export function defaultInputDate(range) {
	let startDate = new Date(Date.now());
  startDate.setHours(startDate.getHours() + 1)
  startDate.setMinutes(0);
	startDate.setSeconds(0);
	startDate.setMilliseconds(0);

  let endDate = new Date(startDate);
	endDate.setTime(startDate.getTime() + range);
	endDate.setSeconds(0);
	endDate.setMilliseconds(0);

	startDate = startDate.toISOString();
	endDate = endDate.toISOString();

	return { startDate, endDate };
}