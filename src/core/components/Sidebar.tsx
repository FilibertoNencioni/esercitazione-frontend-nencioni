import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import { Nav, INavLink, INavStyles, INavLinkGroup } from '@fluentui/react/lib/Nav';
import { setCurrentPage } from '../store/header/headerSlice';
import {} from "@fluentui/react/lib/Icons";


const Sidebar: React.FC = () =>{
    const dispatch = useDispatch();
    const currentPage = useSelector((state: RootState)=>state.header.pageKey);
  
    const onLinkClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
      dispatch(setCurrentPage(item?.key || ""))
    }

    const navStyles: Partial<INavStyles> = {
        root: {
            height: "100%",
            boxSizing: 'border-box',
            overflowY: 'auto'
        },
      };
      
    const navLinkGroups: INavLinkGroup[] = [
    {
        links: [    
        {
            key:"1",
            name: 'Studenti',
            url: '#/studenti',
            icon: 'Contact'
        },
        {
            key:"2",
            name: 'Corsi',
            url: '#/corsi',
            icon: 'PublishCourse'
        },
        {
            key:"3",
            name: 'Frequenze',
            url: '#/frequenze',
            icon:'PeopleAdd'
        }
        ],
    },
    ];

    

    return(
        <Nav
            styles={navStyles}
            groups={navLinkGroups}
            onLinkClick={onLinkClick}
            initialSelectedKey={currentPage}
        />
    )
}

export default Sidebar;