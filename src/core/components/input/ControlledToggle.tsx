import { IToggleProps, Toggle } from "@fluentui/react";
import { HookFormProps } from "./HookFormProps";
import { Controller } from "react-hook-form";
import { Corso } from "../../../models/corso";


export const ControlledToggle: React.FC<HookFormProps & IToggleProps> = (
    props
  ) => {
    return (
      <Controller
        name={props.name}
        control={props.control}
        rules={props.rules}
        defaultValue={props.defaultValue || ''}
        render={({
          field: { onChange, onBlur, name: fieldName, value },
          fieldState: { error }
        }) => (
          <Toggle
            {...props}
            onChange={(e,val)=>{
                console.log("recieved from toggle "+val);
                console.log("recieved from controller "+value);
                value=val;
            }}
            defaultChecked={value}
            onBlur={onBlur}
            defaultValue={undefined}
          />
        )}
      />
    );
  };