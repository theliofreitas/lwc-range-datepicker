# LWC Start/End datetime picker

> A component that mimics the behavior of the standard Salesforce start/end datetime inputs. ☁

## About

Collect range datetime information from the users in a Screen Flow or another LWC component.
When the user set a value on the "startDate" input, the "endDate" input is autopopulated with a predefined time range.


## What I've learned

- Test LWC components with Jest
  - How to filter `shadowRoot.querySelectorAll()` results to find the exact target element
  - Using `Promise.resolve().then()` before asserting the results to ensure that the components were updated on screen