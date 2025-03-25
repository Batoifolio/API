export const formatStringOrUndefined = (value: string | null | undefined | unknown): string => {
  if (typeof value !== 'string') {
    return 'not-defined'
  }
  return value
}
