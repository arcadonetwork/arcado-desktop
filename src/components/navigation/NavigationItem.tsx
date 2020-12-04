import React from 'react'

interface Props {
  setPage(value: string): void
  is_active: boolean
  item: any
  label: string
}

export const NavigationItem: React.FC<Props> = ({ setPage, label, item, is_active }) => {
  const active = is_active
    ? ' fc-blue bgc-lblue br5-top br-b br-c-blue '
    : ' br-b br-c-trans fc-grey '
  return (
    <div
      onClick={() => setPage(item)}
      className={`${active} click fc-blue__hover`}>
      <div className="flex-c flex-jc-c pl25 pr25">
        <div className="pb10 pt10">{label}</div>
      </div>
    </div>
  )
}
