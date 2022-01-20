import { FC } from "react";
import { PrimaryButton, DefaultButton } from "@fluentui/react";
import { ControlledDatePicker } from "../input/ControlledDatePicker";
import { ControlledTextField } from "../input/ControlledTextField";
import { useForm } from "react-hook-form";
import { nameof } from "../../../utils";
import { Studente } from "../../../models/studente";
import { ControlledMaskedTextField} from "../input/ControlledMaskedTextField";
import { useDispatch, useSelector } from "react-redux";
import { updateStudente } from "../../store/studente/studente.action";
import { RootState } from "../../store/store";


interface UpdateStudenteFormProps{
    onCloseModal: ()=>void;
}
export const UpdateStudenteForm: FC<UpdateStudenteFormProps> = ({onCloseModal}) =>{
    const dispatch = useDispatch();
    const {selectedStudente} = useSelector((state: RootState)=>state.studente);

    const { handleSubmit, control, setValue } = useForm<Studente, any>({
        defaultValues: {
            cod_fiscale:selectedStudente?.cod_fiscale,
            nome: selectedStudente?.nome,
            cognome: selectedStudente?.cognome,
            comune_nascita:selectedStudente?.comune_nascita,
            data_nascita:selectedStudente?.data_nascita,
            num_tel:selectedStudente?.num_tel,
            indirizzo_res: selectedStudente?.indirizzo_res,
            civico_res: selectedStudente?.civico_res,
            cap_res: selectedStudente?.cap_res
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
                dispatch(updateStudente(data));
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
                            rules={{required:"Il campo non può essere omesso"}}
                            disabled/>

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