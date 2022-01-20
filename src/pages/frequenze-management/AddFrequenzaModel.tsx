import { useEffect, useState } from "react";
import {Modal, mergeStyleSets, getTheme,FontWeights, constructKeytip} from "@fluentui/react";
import { AddFrequenzaForm } from "../../core/components/form/AddFrequenzaForm";


interface AddFrequenzaModalProps {
    showModal: boolean;
    onCloseModal: () => void;
}

export const AddFrequenzaModal: React.FC<AddFrequenzaModalProps> = ({showModal, onCloseModal}) =>{
    const theme = getTheme();
    const contentStyles = mergeStyleSets({
      container: {
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "stretch",
        maxWidth: "50%",
        minWidth: "50%",
        maxHeight: "max-content",
        minHeight: "max-content",
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
        marginBottom: '20px'        
      },
    });
  
    return(
        <>
            <div className="flex-column d-flex align-content stretch w-100">
                <Modal isOpen={showModal} onDismiss={onCloseModal} isBlocking={true} containerClassName={contentStyles.container}>
                    <div className={contentStyles.header}>
                        <span>Nuova Frequenza</span>
                    </div> 
                    <div className={contentStyles.body}>
                        <AddFrequenzaForm onCloseModal={onCloseModal}/>
                        
                    </div>
                </Modal>
            </div>
        </>
    )
}