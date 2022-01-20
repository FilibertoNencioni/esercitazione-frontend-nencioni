import { FC, useEffect } from "react";
import { PrimaryButton, DefaultButton, MessageBar, IComboBoxOption, Toggle } from "@fluentui/react";
import { ControlledDatePicker } from "../input/ControlledDatePicker";
import { ControlledTextField } from "../input/ControlledTextField";
import { useForm } from "react-hook-form";
import { nameof  } from "../../../utils";
import { Corso } from "../../../models/corso";
import { useDispatch, useSelector } from "react-redux";
import { ControlledDropdown } from "../input/ControlledDropdown";
import { getAllDocente } from "../../store/docente/docente.action";
import { RootState } from "../../store/store";
import { insertCorso, updateCorso } from "../../store/corso/corso.action";



interface CorsoFormProps{
    onCloseModal: ()=>void;
}
export const UpdateCorsoForm: FC<CorsoFormProps> = ({onCloseModal}) =>{
    const dispatch = useDispatch();
    const {docenti} = useSelector((state: RootState)=> state.docente);
    const {selectedCorso} = useSelector((state: RootState)=>state.corso);

    const { handleSubmit, control, setValue } = useForm<Corso, any>({
        defaultValues: {
            id: selectedCorso?.id,
            nome: selectedCorso?.nome,
            descrizione: selectedCorso?.descrizione,
            data_partenza: selectedCorso?.data_partenza,
            data_conclusione: selectedCorso?.data_conclusione,
            ore_tot: selectedCorso?.ore_tot,
            id_d: selectedCorso?.id_d,
            is_over: selectedCorso?.is_over
        },
        reValidateMode: "onSubmit",
        mode: "all"
      });

    const comboboxItems: IComboBoxOption[] = [];

    useEffect(()=>{
        dispatch(getAllDocente());
    },[]);
    useEffect(()=>{
        comboboxItems.slice(0,comboboxItems.length);
        docenti.forEach((item)=>{
            const info: string = item.id+" - "+item.nome+" "+item.cognome;
            comboboxItems.push({key: item.id, text:info});
        })
    },[docenti])

      const onSave = () => {
        handleSubmit(
          (data) => {
                console.log(data);
                dispatch(updateCorso(data));
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
                            label="Nome corso" 
                            required={true}
                            control={control}
                            name={nameof<Corso>("nome")}
                            rules={{required:"Il campo non può essere omesso"}}/>

                            <ControlledTextField 
                            label="Descrizione"
                            multiline rows={8} 
                            required={true}
                            control={control}
                            name={nameof<Corso>("descrizione")}
                            rules={{required:"Il campo non può essere omesso"}}/>

                        </div>
                        <div className="col w-50">
                        <ControlledDatePicker 
                            label="Data di partenza" 
                            isRequired={true}
                            control={control}
                            name={nameof<Corso>("data_partenza")}
                            rules={{required:"Il campo non può essere omesso"}}/>

                        <ControlledDatePicker 
                            label="Data di conclusione" 
                            isRequired={true}
                            control={control}
                            name={nameof<Corso>("data_conclusione")}
                            rules={{required:"Il campo non può essere omesso"}}/>

                            <ControlledTextField 
                            label="Ore totali" 
                            type="number"
                            required={true}
                            control={control}
                            name={nameof<Corso>("ore_tot")}
                            rules={{required:"Il campo non può essere omesso"}}/>

                            <ControlledDropdown
                            label="Docente di riferimento"
                            required={true}
                            control={control}
                            name={nameof<Corso>("id_d")}
                            rules={{required:"Il campo non può essere omesso"}}
                            options={comboboxItems}
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