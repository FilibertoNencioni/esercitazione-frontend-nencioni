import { CommandBar, Text, ICommandBarItemProps } from "@fluentui/react";
import logo from "./logo.svg"



const Header: React.FC = () =>{
    return(
        <div className="header">
            <img src={logo} className="logo"/>
            <div className="title">
                <Text variant="xLarge"> Esercitazione Nencioni </Text>
            </div>
            
        </div>
    )
}

export default Header;