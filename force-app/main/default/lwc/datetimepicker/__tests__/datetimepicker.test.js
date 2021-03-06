import { createElement } from 'lwc';
import DatetimePicker from 'c/datetimepicker';

describe('c-datetimepicker', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while(document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  })

  it('load the component with the correct default startDate and endDate', () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() =>
        new Date('2022-03-01T09:10:00.000Z').valueOf()
      );
      
    const element = createElement('c-datetimepicker', {
      is: DatetimePicker
    });
    element.rangeInMillisecs = 1800000 // 1800000 ms = 30 minutes;
    document.body.appendChild(element);

    // Query for lightning-input elements on the component
    const querySelectorResult = element.shadowRoot.querySelectorAll('lightning-input');
    const { startDateInput, endDateInput } = getInputs(querySelectorResult);

    // Wait the change event update the values on the screen
    return Promise.resolve().then(() => {
      expect(startDateInput.value).toBe('2022-03-01T10:00:00.000Z');
      expect(endDateInput.value).toBe('2022-03-01T10:30:00.000Z');
    });
  });

  it('update endDate input when a new value is set on startDate input', () => {
    const element = createElement('c-datetimepicker', {
      is: DatetimePicker
    });
    element.rangeInMillisecs = 3600000;
    document.body.appendChild(element);

    // Query for lightning-input elements on the component
    const querySelectorResult = element.shadowRoot.querySelectorAll('lightning-input');
    const { startDateInput, endDateInput } = getInputs(querySelectorResult);

    // Trigger startDate input change
    startDateInput.value = '2022-03-03T10:00:00.000Z';
    startDateInput.dispatchEvent(new CustomEvent('change', { target: {
      value: startDateInput.value
    }}));

    // Wait the change event update the values on the screen
    return Promise.resolve().then(() => {
      expect(endDateInput.value).toBe('2022-03-03T11:00:00.000Z');
    });
  });

  it('update startDate input when a lower date value is set on endDate input', () => {
    const element = createElement('c-datetimepicker', {
      is: DatetimePicker
    });
    element.rangeInMillisecs = 3600000;
    document.body.appendChild(element);

    // Query for lightning-input elements on the component
    const querySelectorResult = element.shadowRoot.querySelectorAll('lightning-input');
    const { startDateInput, endDateInput } = getInputs(querySelectorResult);

    // Trigger endDate input change
    endDateInput.value = '2022-03-03T09:00:00.000Z';
    endDateInput.dispatchEvent(new CustomEvent('change', { target: {
      value: endDateInput.value
    }}));

    // Wait the change event update the values on the screen
    return Promise.resolve().then(() => {
      expect(startDateInput.value).toBe('2022-03-03T08:00:00.000Z');
    })
  });

  it('update time range when a new value is set on endDate input', () => {
    const element = createElement('c-datetimepicker', {
      is: DatetimePicker
    });
    element.rangeInMillisecs = 3600000;
    document.body.appendChild(element);

    // Query for lightning-input elements on the component
    const querySelectorResult = element.shadowRoot.querySelectorAll('lightning-input');
    const { startDateInput, endDateInput } = getInputs(querySelectorResult);

    // Trigger startDate input change
    startDateInput.value = '2022-03-03T10:00:00.000Z';
    startDateInput.dispatchEvent(new CustomEvent('change', { target: {
      value: startDateInput.value
    }}));

    // Trigger endDate input change
    endDateInput.value = '2022-03-03T14:00:00.000Z';
    endDateInput.dispatchEvent(new CustomEvent('change', { target: {
      value: endDateInput.value
    }}));

    // Wait the change event update the values on the screen
    return Promise.resolve().then(() => {
      expect(element.rangeInMillisecs).toBe(14400000);
    })
  });

  it('update endDate input with a range of 1 day', () => {
    const element = createElement('c-datetimepicker', {
      is: DatetimePicker
    });
    // Set time range equals 1 day
    element.rangeInMillisecs = 86400000;
    document.body.appendChild(element);

    // Query for lightning-input elements on the component
    const querySelectorResult = element.shadowRoot.querySelectorAll('lightning-input');
    const { startDateInput, endDateInput } = getInputs(querySelectorResult);

    // Trigger startDate input change
    startDateInput.value = '2022-03-04T07:00:00.000Z';
    startDateInput.dispatchEvent(new CustomEvent('change', { target: {
      value: startDateInput.value
    }}));

    return Promise.resolve().then(() => {
      expect(endDateInput.value).toBe('2022-03-05T07:00:00.000Z')
    });
  });

  // Helper function to find the correct Lightning inputs returned by the querySelectorAll() method.
  function getInputs(queryResult) {
    let startDateInput;
    let endDateInput;

    for (var item of queryResult) {
      if(item.name == 'startDate') {
        startDateInput = item;
      }
      else if (item.name == 'endDate') {
        endDateInput = item;
      }
    }

    return { startDateInput, endDateInput }
  }
});