import { useEffect, useState } from "react";
import {Modal,Text, mergeStyleSets, getTheme,FontWeights, IButtonStyles, DefaultButton, PrimaryButton,TextField, DatePicker, MaskedTextField} from "@fluentui/react";
import { UpdateStudenteForm } from "../../../core/components/form/UpdateStudenteForm";

interface AddStudenteModalProps {
    showModal: boolean;
    onCloseModal: () => void;
}

const AddStudenteModal: React.FC<AddStudenteModalProps> = ({showModal, onCloseModal}) =>{
    const theme = getTheme();
    const contentStyles = mergeStyleSets({
      container: {
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "stretch",
        maxWidth: "50%",
        minWidth: "50%",
        maxHeight: "max-content%",
        minHeight: "60%",
      },
      header: [
        theme.fonts.xLarge,
        {
          flex: "4 4 auto",
          borderTop: `4px solid ${theme.palette.themePrimary}`,
          color: theme.palette.neutralPrimary,
          display: "flex",
          alignItems: "center",
          fontWeight: FontWeights.semibold,
          padding: "12px 12px 14px 24px",
        },
      ],
      body: {
        flex: "4 4 auto",
        padding: "0 24px 0px 24px",
        bottom:0,
        marginBottom: '20px',
        // overflowY: "hidden",
        
      },
    });
  
    return(
        <>
            <div className="flex-column d-flex align-content stretch w-100">
                <Modal isOpen={showModal} onDismiss={onCloseModal} isBlocking={true} containerClassName={contentStyles.container}>
                    <div className={contentStyles.header}>
                        <span>Modifica Studente</span>
                    </div> 
                    <div className={contentStyles.body}>
                        <UpdateStudenteForm onCloseModal={onCloseModal} />
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default AddStudenteModal;