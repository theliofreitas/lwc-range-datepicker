# LWC Range Datepicker

> A component that mimics the behavior of the standard Salesforce start/end datetime inputs. ☁

## About

Collect range datetime information from the users in a Screen Flow or LWC parent component.
When the user set a value on the **startDate** input, the **endDate** input is autopopulated with a predefined time range.

![Component GIF](https://media.giphy.com/media/dvUUxDrMEr3wtZE9Ro/giphy.gif)

## Instructions

### Prerequisites

- [Install](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3i000002exe7AAA) the managed package in your org.

### Adding the component inside a Screen Flow

  - Search for the **datepicker** component and drag it into your Screen Flow.
  - Fill the input and output fields:
  	- `Range in milliseconds`: _Range between start and end date (in ms)_
    - `Start date (label)`: _Label for start date input_
    - `End date (label)`: _Label for end date output_
    - `Start date (output)`: _Variable of datetime type to store the output value_
    - `End date (output)`: _Variable of datetime type to store the output value_

  ![Screen Flow Setup](https://i.ibb.co/Kbcf2Mq/screen-flow-setup-example.jpg)

&nbsp;

### Adding the component inside another LWC Component

  If you have enabled the [Lightning Web Security](https://help.salesforce.com/s/articleView?id=000363550&type=1) setting, you can add the `<tfdev-datetimepicker></tfdev-datetimepicker>` component inside any LWC component in your org.

  > 💡 In order to enable the Lightning Web Security setting go to **Setup** > **Session Settings** > Check the **"Use Lightning Web Security for Lightning web components"** option.

  &nbsp;

  There's an example of this implementation:
  
  ```html
  <template>
    <tfdev-datetimepicker
      range-in-millisecs={range}
      start-date-label="Label for start date"
      end-date-label="Label for end date"
      ongetdatevalues={handleGetDates}>
    </tfdev-datetimepicker>
  </template>
  ```

  ```js
  import { LightningElement, api } from 'lwc';

  export default class FormTest extends LightningElement {
    @api range = 3600000;

    handleGetDates(event) {
      console.log(event.detail.startDate);
      console.log(event.detail.endDate);
    }
  }
  ```

&nbsp;

## What I've learned

- Test LWC components with Jest
  - How to filter `shadowRoot.querySelectorAll()` results to find the exact target element.
  - Using `Promise.resolve().then()` before asserting the results to ensure that the components were updated on screen.
  - Debbuging Jest tests
  - Mocking `Date.now()` in Jest with `jest.spyOn()` and `mockImplementationOnce()`.
- Setting default value in a public `@api property` when no value was defined by a parent component or a target config in Flow Screens/Lightning Pages, using `constructor()`. However, if a value is defined by the parent component, the constructor will be override.
- Use of `connectedCallback()` to wait for the component be loaded in the DOM.
- Pass output values from LWC component to Flow Screens.
- Pass output values to parent LWC components with `CustomEvent()`.
- How to setup Namespaces and Second-Generation Managed Packages.
- [Lightning Web Security](https://help.salesforce.com/s/articleView?id=000363550&type=1) enablement to allow cross-namespace component use.
