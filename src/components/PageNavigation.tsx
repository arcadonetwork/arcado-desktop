import React from 'react';

interface PageNavigationItemContainerProps {
  label: string,
  isActive: boolean,
  setPage(param: string): any
}

const PageNavigationItem: React.FC<PageNavigationItemContainerProps> = ({ label, isActive, setPage }) => {
  const clazz = isActive ? 'fc-black br-b br-c-primary ' : 'fc-lgrey br-b'
  return (
    <div onClick={() => setPage(label)} className={'pl15 pb15 pr15 ' + clazz}>
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
    <div className="flex-c br-b mb25">
      {
        menu.map(item =>
          <PageNavigationItem
            label={item}
            isActive={activePage === item}
            setPage={setPage}
          />
        )
      }
    </div>
  )
}