import { FC, useState } from "react";
import { PrimaryButton, DefaultButton, MessageBar, MessageBarType } from "@fluentui/react";
import { ControlledDatePicker } from "../input/ControlledDatePicker";
import { ControlledTextField } from "../input/ControlledTextField";
import { DeepMap, FieldError, useForm } from "react-hook-form";
import { nameof, sleep } from "../../../utils";
import { Studente } from "../../../models/studente";
import {ControlledMaskedTextField} from "../input/ControlledMaskedTextField";
import { useDispatch } from "react-redux";
import { insertStudente } from "../../store/studente/studente.action";


interface StudenteFormProps{
    onCloseModal: ()=>void;
}
export const StudenteForm: FC<StudenteFormProps> = ({onCloseModal}) =>{
    const dispatch = useDispatch();
    const { handleSubmit, control, setValue } = useForm<Studente, any>({
        defaultValues: {
            cod_fiscale:undefined,
            nome: undefined,
            cognome: undefined,
            comune_nascita:undefined,
            data_nascita:undefined,
            num_tel:undefined,
            indirizzo_res: undefined,
            civico_res: undefined,
            cap_res: undefined
        },
        reValidateMode: "onSubmit",
        mode: "all"
      });
    
      const onSave = () => {
        handleSubmit(
          (data) => {
                console.log(data);
                const newNumber = data.num_tel.slice(0,data.num_tel.length-1);
                data.num_tel = newNumber;
                dispatch(insertStudente(data));
                onCloseModal();
          },
          (err) => {
                console.log(err);
          }
        )();
      };


    return(
        <div>
            <div className="d-flex justify-content-center align-self-center">
                <div className="container">
                    <div className="row mt-2">
                        
                        <div className="col">
                            <ControlledTextField 
                            label="Codice Fiscale" 
                            required={true}
                            control={control}
                            name={nameof<Studente>("cod_fiscale")}
                            rules={{required:"Il campo non può essere omesso"}}/>

                            <ControlledTextField 
                            label="Nome" 
                            required={true}
                            control={control}
                            name={nameof<Studente>("nome")}
                            rules={{required:"Il campo non può essere omesso"}}/>

                            <ControlledTextField 
                            label="Cognome" 
                            required={true}
                            control={control}
                            name={nameof<Studente>("cognome")}
                            rules={{required:"Il campo non può essere omesso"}}/>

                            <ControlledTextField 
                            label="Comune di nascita" 
                            required={true}
                            control={control}
                            name={nameof<Studente>("comune_nascita")}
                            rules={{required:"Il campo non può essere omesso"}}/>

                            <ControlledDatePicker 
                            label="Data di nascita" 
                            isRequired={true}
                            control={control}
                            name={nameof<Studente>("data_nascita")}
                            rules={{required:"Il campo non può essere omesso"}}/>

                        </div>
                        <div className="col w-50">
                            <ControlledMaskedTextField 
                            label="Numero di telefono" 
                            required={true}
                            control={control}
                            name={nameof<Studente>("num_tel")}
                            mask="+999 (999) 999-9999"
                            rules={{required:"Il campo non può essere omesso", 
                            pattern:{
                                value: /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g,
                                message:"Formato non valido"
                            }
                            }}/>

                            <ControlledTextField 
                            label="Indirizzo" 
                            required={true}
                            control={control}
                            name={nameof<Studente>("indirizzo_res")}
                            rules={{required:"Il campo non può essere omesso"}}/>

                            <ControlledTextField 
                            label="Numero civico" 
                            required={true}
                            control={control}
                            name={nameof<Studente>("civico_res")}
                            rules={{required:"Il campo non può essere omesso"}}/>

                            <ControlledTextField 
                            label="CAP" 
                            required={true}
                            control={control}
                            name={nameof<Studente>("cap_res")}
                            type="number"
                            rules={{ 
                                validate:{exist: (value)=> value!== undefined},
                                required:"Il campo non può essere omesso"
                                }}/>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="d-flex flex-row-reverse mb-0 gap-2 ">
                            <PrimaryButton text="Salva" onClick={() => onSave()}/>
                            <DefaultButton text="Annulla" onClick={() => onCloseModal()} />
                        </div>
                    </div>
                </div>

                        
            </div>
                
        </div>
    );
}