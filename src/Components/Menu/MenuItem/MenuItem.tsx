//===== React and styles =====
import React, {memo} from 'react'
import './MenuItem.scss'

//===== Interface =====
interface IMenuItem extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: React.ReactNode
}

//===== Main =====
const MenuItem: React.FC<IMenuItem> = ({children, ...props}) => {
  return (
    <div className="context-menu-item" {...props}>
      <p>{children}</p>
    </div>
  )
}

export default memo(MenuItem)
