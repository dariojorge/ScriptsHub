import { useEffect, useRef, useState } from "react";
import { TabEnumType } from "../models/tab-enum-type";
import TabComponent from "../tab-manager/tab";
import { loadTab, saveTab } from "../db/db-tabs";

const scrollByAmount = 150;

const HeaderComponent = (props: { activeTab: string, setActiveTab: any }) => {
    const isInitialRender = useRef(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    
    const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        loadTab().then((response) => {
            const loadedTab: TabEnumType = response.data;
            if (loadedTab === props.activeTab) {
                return;
            }

            props.setActiveTab(loadedTab);
        }).catch(() => {
            props.setActiveTab(TabEnumType.HOME);
        });
    }, []);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        const activeTabEl = tabRefs.current[props.activeTab];
        saveTab(props.activeTab);
        if (activeTabEl && scrollRef.current) {
            activeTabEl.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
    }, [props.activeTab]);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
    };

    return (
        <div className="header tab-scroll-wrapper">
            <button className="scroll-arrow left" onClick={scrollLeft}>&#x2039;</button>
            <div className="tab-buttons" ref={scrollRef}>
                {Object.keys(TabEnumType).map((tabType) => (
                    <TabComponent key={tabType} activeTab={props.activeTab === tabType} type={tabType} setActiveTab={() => props.setActiveTab(tabType)} tabRefs={tabRefs}></TabComponent>
                ))
                }
            </div>
            <button className="scroll-arrow right" onClick={scrollRight}>&#x203A;</button>
        </div>
    );
}

export default HeaderComponent;