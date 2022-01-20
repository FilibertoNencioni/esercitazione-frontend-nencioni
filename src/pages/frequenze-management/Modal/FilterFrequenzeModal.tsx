import { useEffect, useState } from "react";
import {Modal, mergeStyleSets, getTheme,FontWeights, constructKeytip} from "@fluentui/react";
import { FilterFrequenzaForm } from "../../../core/components/form/FilterFrequenzeForm";


interface FilterFrequenzeModalProps {
    showModal: boolean;
    onCloseModal: () => void;
}

export const FilterFrequenzeModal: React.FC<FilterFrequenzeModalProps> = ({showModal, onCloseModal}) =>{
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
          width:"100%"
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
                      <div className="d-flex justify-content-center align-self-center w-100">
                        <div className="container">
                          <div className="row mt-2">
                            <div className="col">
                              <span>Filtra per studente</span>
                            </div>
                            <div className="col">
                              <span>Filtra per corso</span>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div> 
                    <div className={contentStyles.body}>
                        <FilterFrequenzaForm onCloseModal={onCloseModal}/>
                        
                    </div>
                </Modal>
            </div>
        </>
    )
}