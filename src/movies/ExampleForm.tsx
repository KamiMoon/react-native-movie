import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

// import {
//   Container,
//   Item,
//   Input,
//   Header,
//   Body,
//   Content,
//   Title,
//   Button,
//   Text
// } from "native-base";

import {
  Field,
  InjectedFormProps,
  BaseFieldProps,
  reduxForm
} from "redux-form";

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

const renderInput = ({
  input: { onChange, ...restInput },
  meta: { touched, error, warning }
}: any) => {
  return (
    <View>
      <TextInput style={styles.input} onChangeText={onChange} {...restInput} />
      {touched &&
        ((error && <Text style={{ color: "red" }}>{error}</Text>) ||
          (warning && <Text style={{ color: "yellow" }}>{warning}</Text>))}
    </View>
  );
};

interface Props {}

class SimpleForm extends React.Component<Props & InjectedFormProps> {
  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <View style={styles.container}>
        <Text>Name:</Text>
        <Field name="name" component={renderInput} />
        <Text>Email:</Text>
        <Field name="email" component={renderInput} />
        <TouchableOpacity onPress={handleSubmit(submit)} disabled={submitting}>
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default reduxForm({
  form: "test",
  validate
})(SimpleForm);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    color: "white",
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: "center",
    width: 250
  },
  container: {},
  input: {
    borderColor: "black",
    borderWidth: 1,
    height: 37,
    width: 250
  }
});

// interface Props {
//   handleSubmit: any;
//   reset: any;
// }

// class SimpleForm extends Component<Props> {
//   constructor(props) {
//     super(props);

//     this.renderInput = this.renderInput.bind(this);
//   }

//   renderInput({ input, label, type, meta: { touched, error, warning } }) {
//     var hasError = false;
//     if (error !== undefined) {
//       hasError = true;
//     }
//     return (
//       <Item error={hasError}>
//         <Input {...input} />
//         {hasError ? <Text>{error}</Text> : <Text />}
//       </Item>
//     );
//   }
//   render() {
//     const { handleSubmit, reset } = this.props;

//     return (
//       <Container>
//         <Header>
//           <Body>
//             <Title>Redux Form</Title>
//           </Body>
//         </Header>
//         <Content padder>
//           <Field name="email" component={this.renderInput} />
//           <Field name="name" component={this.renderInput} />
//           <Button block primary onPress={reset}>
//             <Text>Submit</Text>
//           </Button>
//         </Content>
//       </Container>
//     );
//   }
// }
// export default reduxForm({
//   form: "test",
//   validate
// })(SimpleForm);
