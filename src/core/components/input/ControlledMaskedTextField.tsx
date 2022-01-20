import { FC } from "react";
import { Controller } from "react-hook-form";
import { IMaskedTextFieldProps, MaskedTextField } from "@fluentui/react";
import { HookFormProps } from "./HookFormProps"

export const ControlledMaskedTextField: FC<HookFormProps & IMaskedTextFieldProps> = (
  props
) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      defaultValue={props.defaultValue || ""}
      render={({
        field: { onChange, onBlur, name: fieldName, value },
        fieldState: { error }
      }) => (
        <MaskedTextField
          {...props}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          name={fieldName}
          errorMessage={error && error.message}
          defaultValue={undefined}
        />
      )}
    />
  );
};
