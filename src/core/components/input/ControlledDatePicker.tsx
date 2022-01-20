import { FC } from "react";
import { Controller } from "react-hook-form";
import { DatePicker, IDatePickerProps } from "@fluentui/react";
import { HookFormProps } from "./HookFormProps";
import { Studente } from "../../../models/studente";
import { Corso } from "../../../models/corso";
import { nameof } from "../../../utils";

export const ControlledDatePicker: FC<HookFormProps & IDatePickerProps> = (
  props
) => {
    console.log("props");
    console.log(props.control._defaultValues);
    console.log(props.name);
    let date = new Date();
    if(props.name === nameof<Studente>("data_nascita") && (props.control._defaultValues as Studente).data_nascita !== undefined){
        date = new Date((props.control._defaultValues as Studente).data_nascita);
    }
    if(props.name === nameof<Corso>("data_partenza") && (props.control._defaultValues as Corso).data_partenza !== undefined){
      date = new Date((props.control._defaultValues as Corso).data_partenza);
    }
    if(props.name === nameof<Corso>("data_conclusione") && (props.control._defaultValues as Corso).data_conclusione !== undefined){
      date = new Date((props.control._defaultValues as Corso).data_conclusione);
    }
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
        <DatePicker
          {...props}
          textField={{
            name: fieldName,
            //onChange,
            //onBlur,
            errorMessage: error && error.message
          }}
          onSelectDate={(date) => {
            onChange(date);
          }}
          value={date}
          onBlur={onBlur}
          defaultValue={""}
        />
      )}
    />
  );
};
