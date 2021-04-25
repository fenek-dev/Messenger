//===== React and styles =====
import React, {memo} from 'react'
import './FileInput.scss'

//===== Interface =====
interface IFileInput extends React.InputHTMLAttributes<HTMLInputElement> {
  readonly label: string
  readonly accept?: string
}

//===== Main =====
const FileInput: React.FC<IFileInput> = ({
  label,
  accept,
  className,
  ...props
}) => {
  return (
    <>
      <label htmlFor="input" className="file-input__label">
        {label}
      </label>
      <input
        data-testid="input"
        type="file"
        id="input"
        className={`file-input ${className ? className : ''}`}
        accept={`.jpg, .jpeg, .png  ${accept ? accept : ''}`}
        {...props}
      />
    </>
  )
}

export default memo(FileInput)
