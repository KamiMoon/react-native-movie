import React from "react";

import { Item, Input, Text, Label, View } from "native-base";

export const TextInput = ({
  input: { onChange },
  label,
  type,
  meta: { touched, error, warning },
  ...rest
}: any) => {
  let hasError = false;
  if (touched && error !== undefined) {
    hasError = true;
  }

  return (
    <View>
      <Item stackedLabel error={hasError}>
        <Label>{label}</Label>

        <Input onChangeText={onChange} {...rest} />
      </Item>
      {touched &&
        ((error && <Text style={{ color: "red" }}>{error}</Text>) ||
          (warning && <Text style={{ color: "yellow" }}>{warning}</Text>))}
    </View>
  );
};
