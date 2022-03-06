import { createElement } from 'lwc';
import DatetimePicker from 'c/datetimepicker';

describe('c-datetimepicker', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while(document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  })

  it('update endDate input when a new value is set on startDate input', () => {
    const element = createElement('c-datetimepicker', {
      is: DatetimePicker
    });
    // element.rangeInMillisecs = 3600000;
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

  it('', () => {
    
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