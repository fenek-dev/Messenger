//===== React and styles =====
import React, {memo} from 'react'
import './Popup.scss'

//===== Interface =====
interface IPopup {
  readonly width: string
  readonly height: string
  readonly title?: string
  readonly text?: string
  readonly onClose?: () => void
  readonly children?: React.ReactNode
}

//===== Main =====
const Popup: React.FC<IPopup> = ({
  children,
  title,
  width,
  height,
  text,
  onClose,
}) => {
  return (
    <div className="popup-layout">
      <div
        data-testid="wrapper"
        className="popup-window"
        style={{width: `${width}`, height: `${height}`}}>
        <span role="button" className="popup-window__close" onClick={onClose}>
          &times;
        </span>
        <div className="popup-window__content">
          <h4 className="popup-window__content-title">{title}</h4>
          <p className="popup-window__content-body">{text}</p>
          <div className="popup-window__content-buttons">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default memo(Popup)
