import { useEffect, useState } from "react";
import {Modal, mergeStyleSets, getTheme,FontWeights, constructKeytip} from "@fluentui/react";
import {AddCorsoForm} from "../../../core/components/form/AddCorsoForm";

interface AddCorsoModalProps {
    showModal: boolean;
    onCloseModal: () => void;
}

export const AddCorsoModal: React.FC<AddCorsoModalProps> = ({showModal, onCloseModal}) =>{
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
        marginBottom: '20px'        
      },
    });
  
    return(
        <>
            <div className="flex-column d-flex align-content stretch w-100">
                <Modal isOpen={showModal} onDismiss={onCloseModal} isBlocking={true} containerClassName={contentStyles.container}>
                    <div className={contentStyles.header}>
                        <span>Nuovo Corso</span>
                    </div> 
                    <div className={contentStyles.body}>
                        <AddCorsoForm onCloseModal={onCloseModal}/>
                        
                    </div>
                </Modal>
            </div>
        </>
    )
}