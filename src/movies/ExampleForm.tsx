import React from "react";

import {
  Container,
  Header,
  Body,
  Content,
  Title,
  Button,
  Text,
  Form
} from "native-base";

import { Field, InjectedFormProps, reduxForm } from "redux-form";

import { renderInput } from "src/ui/form/Form";

const validate = values => {
  const error: any = {};
  error.email = "";
  error.name = "";
  var ema = values.email;
  var nm = values.name;
  if (values.email === undefined) {
    ema = "";
  }
  if (values.name === undefined) {
    nm = "";
  }
  if (ema.length < 8 && ema !== "") {
    error.email = "too short";
  }
  if (!ema.includes("@") && ema !== "") {
    error.email = "@ not included";
  }
  if (nm.length > 8) {
    error.name = "max 8 characters";
  }
  return error;
};

const submit = values => {
  console.log("submitting form", values);
};

interface Props {}

class SimpleForm extends React.Component<Props & InjectedFormProps> {
  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <Container>
        <Header>
          <Body>
            <Title>Redux Form</Title>
          </Body>
        </Header>
        <Content padder>
          <Form>
            <Field name="email" label="Email:" component={renderInput} />
            <Field name="name" label="Name:" component={renderInput} />
          </Form>
          <Button
            block
            primary
            onPress={handleSubmit(submit)}
            disabled={submitting}
          >
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
export default reduxForm({
  form: "test",
  validate
})(SimpleForm);
