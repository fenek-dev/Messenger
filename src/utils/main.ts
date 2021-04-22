export const compressString = (str: string) => {
  if (str.length > 25) {
    return str.slice(0, 25) + '...'
  } else {
    return str
  }
}

export const debounce = (func: any, wait: number) => {
  let timeout: any

  return function executedFunction(...args: any) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
