import React, { useState } from 'react';
import { TabEnumType } from '../models/tab-enum-type';
import "./tab.scss"
import FooterComponent from '../footer/Footer';
import HeaderComponent from '../header/Header';
import SettingsComponent from '../settings/Settings';
import RunnersProfilesComponent from '../runners-profiles/RunnersProfiles';
import RunnersComponent from '../runners/Runners';

const TabManagerComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(TabEnumType.HOME);

  const renderContent = () => {
    switch (activeTab) {
      case TabEnumType.HOME:
        return <div>🏠 Home Content</div>;
      case TabEnumType.ENDPOINTS:
        return <div>👤 ENDPOINTS Content</div>;
      case TabEnumType.RUNNERS_PROFILES:
        return <RunnersProfilesComponent />;
      case TabEnumType.RUNNERS:
        return <RunnersComponent />;
      case TabEnumType.SCRIPTS:
        return <div>⚙️ Scripts Content</div>;
      case TabEnumType.SETTINGS:
        return <SettingsComponent />;
      case TabEnumType.PLANNER:
        return <div>⚙️ PLANNER Content</div>;
      case TabEnumType.DOCUMENTATION:
        return <div>⚙️ DOCUMENTATION Content</div>;
      default:
        return <div>404 - Tab not found</div>;
    }
  };

  return (
    <div className="tab-container">
      <HeaderComponent activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        {renderContent()}
      </div>
      <FooterComponent />
    </div>
  );
}

export default TabManagerComponent;
