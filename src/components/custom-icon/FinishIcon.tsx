import React from 'react'
import Icon from 'antd/es/icon'

const FinishSVG = () => (
  <svg width="1.2em" height="1.2em" fill="currentColor" viewBox="0 0 900 1024">
    <path d="M786,390l108.9-163.35c13.28-19.92-1.06-46.64-25-46.64H570a30,30,0,0,1-30-30h0a90.1,90.1,0,0,0-90-90H234.84A90,90,0,0,0,60,90V964H30a30,30,0,1,0,0,60H270a30,30,0,1,0,0-60H240V540H485.15A90.14,90.14,0,0,0,570,600H870c23.94,0,38.22-26.75,25-46.64ZM180,964H120V90a30,30,0,0,1,60,0ZM480,480H240V120H450a30,30,0,0,1,30,30Zm90,60a30,30,0,0,1-30-30V234.84A89.57,89.57,0,0,0,570,240H813.93L725,373.35a30,30,0,0,0,0,33.28L813.93,540Z"/>
  </svg>
)

export const FinishIcon = (props: any) => <Icon component={FinishSVG} {...props} />
