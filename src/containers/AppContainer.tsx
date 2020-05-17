import * as React from 'react';


export const AppContainer: React.FC<{ children: any }> = ({ children }) => {
  return (
    <div className="w100 h100">
      {children}
    </div>
  )
}
