import { Controller } from "react-hook-form";
import { Dropdown, IDropdownProps } from "@fluentui/react";
import { HookFormProps } from "./HookFormProps";
import { nameof } from "../../../utils";
import { Corso } from "../../../models/corso";

export const ControlledDropdown: React.FC<HookFormProps & IDropdownProps> = (
  props
) => {
  let initialValue:number | undefined = undefined;
  console.log("DROPDOWN NAME "+props.name );
  console.log(props.control._defaultValues);
  if(props.name === nameof<Corso>("id_d")){
    initialValue = (props.control._defaultValues as Corso).id_d;
  }

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
        <Dropdown
          {...props}
          selectedKey={value}
          onChange={(_e, option) => {
            onChange(option!.key);
          }}
          onBlur={onBlur}
          errorMessage={error && error.message}
          // defaultValue={initialValue}
          // defaultSelectedKey={initialValue}
          
        />
      )}
    />
  );
};
