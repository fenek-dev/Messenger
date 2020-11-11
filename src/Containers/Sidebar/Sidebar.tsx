import React from 'react';
import './Sidebar.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Chats from '../Chats/Chats';
import SettingsList from '../../Components/Settings-list/SettingsList';
import { useSelector } from 'react-redux';
import { RootReducerInterface } from '../../Redux/Reducers/Reducers';
export interface ISidebar {
  title: string;
}

const Sidebar: React.FC<ISidebar> = ({ title }) => {
  const state = useSelector((state: RootReducerInterface) => state.chats);

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
              <Chats chats={state} />
            </TabPanel>
            <TabPanel>
              <SettingsList />
            </TabPanel>
          </div>
        </div>
      </section>
    </Tabs>
  );
};

export default Sidebar;
