//===== React and Redux =====
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { RootReducerInterface } from '../../Redux/Reducers/Reducers';

//===== Components =====
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Chats from '../Chats/Chats';
import SettingsList from '../../Components/Settings-list/SettingsList';

//===== Styles =====
import './Sidebar.scss';

//===== Interface =====
interface ISidebar {
  readonly title: string;
}

//===== Main =====
const Sidebar: React.FC<ISidebar> = ({ title }) => {
  const state = useSelector((state: RootReducerInterface) => state);
  return (
    <Tabs>
      <section className='sidebar'>
        <div className='sidebar-tabs'>
          <div className='tabs'>
            <TabList>
              <div className='sidebar-header'>
                <h2 className='sidebar-header__title'>{title}</h2>
              </div>
              <Tab>Chats</Tab>
              <Tab>Settings</Tab>
            </TabList>

            <TabPanel>
              <Chats chats={state.chats} />
            </TabPanel>
            <TabPanel>
              <SettingsList userId={state.user.user_id} />
            </TabPanel>
          </div>
        </div>
      </section>
    </Tabs>
  );
};

export default memo(Sidebar);
