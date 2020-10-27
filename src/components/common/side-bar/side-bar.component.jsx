import React, {Component} from 'react';
import {
    Button,
    Checkbox,
    Grid,
    Header,
    Icon,
    Image,
    Menu,
    Segment,
    Sidebar,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import {withTranslation} from "react-i18next";
import './side-bar.component.css';
import logo from '../../../assets/images/menu-logo-01.svg';
import homeIcon from '../../../assets/icons/home-01.svg';
import chatIcon from '../../../assets/icons/chat.svg';
import profileIcon from '../../../assets/icons/profile-01.svg';
import templateIcon from '../../../assets/icons/template.svg';
import settingIcon from '../../../assets/icons/settings.svg';
import logoutIcon from '../../../assets/icons/logout-01.svg';
class SideBarComponent extends Component {
    render() {
        const { t } = this.props;
        const isArabic = this.props.i18n.language === 'ar';
        const direction = isArabic ? 'right':'left';
        return (
            <Sidebar
                as={Menu}
                animation={'slide out'}
                direction={direction}
                icon='labeled'
                inverted
                vertical
                visible={true}
                width='wide'
            >
                <Menu.Header >
                    <Image src={logo} width={150} style={{margin:'25px auto'}}/>
                </Menu.Header>
                <Menu.Item as='a'>
                    <Image src={homeIcon} className='icon' width={25} />
                    {t('menu.dashboard')}
                </Menu.Item>
                <Menu.Item as='a'>
                    <Image src={chatIcon} className='icon' width={25} />
                    {t('menu.chats')}
                </Menu.Item>
                <Menu.Item as='a'>
                    <Image src={profileIcon} className='icon' width={25} />
                    {t('menu.profile')}
                </Menu.Item>
                <Menu.Item as='a'>
                    <Image src={templateIcon} className='icon' width={25} />
                    {t('menu.templates')}
                </Menu.Item>
                <Menu.Item as='a'>
                    <Image src={settingIcon} className='icon' width={25} />
                    {t('menu.settings')}
                </Menu.Item>
                <Menu.Item as='a'>
                    <Image src={logoutIcon} className='icon logout' width={25} />
                    {t('menu.logout')}
                </Menu.Item>
            </Sidebar>
        );
    }
}

export default withTranslation("translation") (SideBarComponent);