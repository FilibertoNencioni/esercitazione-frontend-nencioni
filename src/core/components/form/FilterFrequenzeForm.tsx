import { FC, useEffect } from "react";
import { PrimaryButton, DefaultButton, Text, IComboBoxOption } from "@fluentui/react";
import { ControlledDatePicker } from "../input/ControlledDatePicker";
import { ControlledTextField } from "../input/ControlledTextField";
import { useForm } from "react-hook-form";
import { nameof  } from "../../../utils";
import { Corso } from "../../../models/corso";
import { useDispatch, useSelector } from "react-redux";
import { ControlledDropdown } from "../input/ControlledDropdown";
import { getAllDocente } from "../../store/docente/docente.action";
import { RootState } from "../../store/store";
import { insertCorso } from "../../store/corso/corso.action";
import { Frequenza } from "../../../models/frequenza";
import { insertFrequenza, setFilteredFrequenze } from "../../store/frequenza/frequenza.action";


interface FrequenzaFormProps{
    onCloseModal: ()=>void;
}
export const FilterFrequenzaForm: FC<FrequenzaFormProps> = ({onCloseModal}) =>{
    const dispatch = useDispatch();
    const {studenti} = useSelector((state: RootState)=> state.studente);
    const {corsi} = useSelector((state: RootState)=> state.corso);
    const {frequenze} = useSelector((state: RootState)=> state.frequenza);


    const { handleSubmit, control, setValue } = useForm<Frequenza, any>({
        defaultValues: {
            cod_fiscale: undefined,
            id_c: undefined
        },
        reValidateMode: "onSubmit",
        mode: "all"
      });

    const dropdownStudenti: IComboBoxOption[] = [];
    const dropdownCorsi: IComboBoxOption[] = [];

    useEffect(()=>{
        dispatch(getAllDocente());
    },[]);
    useEffect(()=>{
        dropdownCorsi.slice(0,dropdownCorsi.length);
        corsi.forEach((item)=>{
            const info: string = item.id+" - "+item.nome;
            dropdownCorsi.push({key: item.id, text:info});
        })
    },[corsi])

    useEffect(()=>{
        dropdownStudenti.slice(0,dropdownStudenti.length);
        studenti.forEach((item)=>{
            const info: string = item.cod_fiscale+" - "+item.nome+" "+item.cognome;
            dropdownStudenti.push({key: item.cod_fiscale, text:info});
        })
    },[studenti])

      const onSave = () => {
        handleSubmit(
          (data) => {
                if(data.id_c.toString()!=="" && data.cod_fiscale!==""){
                    const filtered= frequenze.filter(item=>item.id_c.toString()===data.id_c.toString() && item.cod_fiscale===data.cod_fiscale);
                    dispatch(setFilteredFrequenze(filtered));
                }
                else if(data.id_c.toString()==="" && data.cod_fiscale!==""){
                    const filtered= frequenze.filter(item=> item.cod_fiscale===data.cod_fiscale);
                    dispatch(setFilteredFrequenze(filtered));
                }else if(data.id_c.toString()!=="" && data.cod_fiscale===""){
                    const filtered= frequenze.filter(item=>item.id_c.toString()===data.id_c.toString());
                    dispatch(setFilteredFrequenze(filtered));
                }

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
                            <ControlledDropdown
                            label="Studente"
                            required={false}
                            control={control}
                            name={nameof<Frequenza>("cod_fiscale")}
                            options={dropdownStudenti}
                            />

                        </div>
                        <div className="col w-50">
                            <ControlledDropdown
                            label="Corso"
                            required={false}
                            control={control}
                            name={nameof<Frequenza>("id_c")}
                            options={dropdownCorsi}
                            />
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