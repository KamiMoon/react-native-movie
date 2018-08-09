import { InjectedFormProps } from "src/ui/form";

export function getNavigationMock() {
  return {
    navigate: jest.fn(),
    getParam: jest.fn()
  };
}

export class ReduxFormProps implements InjectedFormProps {
  anyTouched: false;
  array: any;
  asyncValidate: () => {};
  asyncValidating: false;
  autofill: (field: string, value: any) => {};
  blur: (field: string, value: any) => {};
  change: (field: string, value: any) => {};
  clearAsyncError: (field: string) => {};
  destroy: () => {};
  dirty: false;
  error: "";
  form: "";
  handleSubmit: () => {};
  initialize: any;
  initialized: false;
  initialValues: any;
  invalid: false;
  pristine: true;
  reset: any;
  submitFailed: false;
  submitSucceeded: false;
  submitting: false;
  touch: any;
  untouch: any;
  valid: true;
  warning: any;
  registeredFields: any;
}
