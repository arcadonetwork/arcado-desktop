import React from 'react';

interface PageNavigationItemContainerProps {
  label: string,
  isActive: boolean,
  setPage(param: string): any
}

const PageNavigationItem: React.FC<PageNavigationItemContainerProps> = ({ label, isActive, setPage }) => {
  const clazz = isActive ? 'fc-black br-b br-c-primary ' : 'fc-lgrey br-b br-c-trans'
  return (
    <div onClick={() => setPage(label)} className={'pl25 click pb10 pr25 ' + clazz}>
      <span>{label}</span>
    </div>
  )
}


interface PageNavigationContainerProps {
  menu: string[],
  activePage: string,
  setPage(param: string): any
}

export const PageNavigation: React.FC<PageNavigationContainerProps> = ({ menu, activePage, setPage }) => {
  return (
    <div className="flex-c br-b">
      {
        menu.map(item =>
          <PageNavigationItem
            key={item}
            label={item}
            isActive={activePage === item}
            setPage={setPage}
          />
        )
      }
    </div>
  )
}
