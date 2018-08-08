import React from "react";

import { Item, Input, Text, Label, View } from "native-base";

export const renderInput = ({
  input: { onChange, ...restInput },
  label,
  type,
  meta: { touched, error, warning }
}: any) => {
  let hasError = false;
  if (touched && error !== undefined) {
    hasError = true;
  }

  return (
    <View>
      <Item stackedLabel error={hasError}>
        <Label>{label}</Label>

        <Input onChangeText={onChange} {...restInput} />
      </Item>
      {touched &&
        ((error && <Text style={{ color: "red" }}>{error}</Text>) ||
          (warning && <Text style={{ color: "yellow" }}>{warning}</Text>))}
    </View>
  );
};
