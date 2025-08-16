import React, { useEffect, useRef, useState } from 'react';
import { TabEnumType } from '../models/tab-enum-type';
import "./tab.scss"
import TabComponent from './tab';
import RunnersComponent from '../runners/runners';
import { loadTab, saveTab } from '../db/db-tabs';

const scrollByAmount = 150;

const TabManagerComponent: React.FC = () => {
  const isInitialRender = useRef(false);
  const [activeTab, setActiveTab] = useState<string>(TabEnumType.HOME);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    loadTab().then((response) => {
      const loadedTab: TabEnumType = response.data;
      if (loadedTab === activeTab) {
        return;
      }

      setActiveTab(loadedTab);
    }).catch(() => {
      setActiveTab(TabEnumType.HOME);
    });
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const activeTabEl = tabRefs.current[activeTab];
    saveTab(activeTab);
    if (activeTabEl && scrollRef.current) {
      activeTabEl.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeTab]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case TabEnumType.HOME:
        return <div>🏠 Home Content</div>;
      case TabEnumType.ENDPOINTS:
        return <div>👤 ENDPOINTS Content</div>;
      case TabEnumType.RUNNERS:
        return <RunnersComponent />;
      case TabEnumType.SCRIPTS:
        return <div>⚙️ SETTINGS Content</div>;
      case TabEnumType.SETTINGS:
        return <div>⚙️ SETTINGS Content</div>;
      case TabEnumType.DOCUMENTATION:
        return <div>⚙️ DOCUMENTATION Content</div>;
      default:
        return <div>404 - Tab not found</div>;
    }
  };

  return (
    <div className="tab-container tab-scroll-wrapper">
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
        <button className="scroll-arrow left" onClick={scrollLeft}>&#x2039;</button>
        <div className="tab-buttons" ref={scrollRef}>
          {Object.keys(TabEnumType).map((tabType) => (
            <TabComponent key={tabType} activeTab={activeTab === tabType} type={tabType} setActiveTab={() => setActiveTab(tabType)} tabRefs={tabRefs}></TabComponent>
          ))
          }
        </div>
        <button className="scroll-arrow right" onClick={scrollRight}>&#x203A;</button>
      </div>
      <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default TabManagerComponent;
