export function deepClone<T>(value: T): T {
  // Handle primitives and functions (no cloning required)
  if (value === null || typeof value !== 'object') {
    return value
  }

  // Handle Date
  if (value instanceof Date) {
    return new Date(value.getTime()) as T
  }

  // Handle Array
  if (Array.isArray(value)) {
    return value.map(deepClone) as T
  }

  // Handle Map
  if (value instanceof Map) {
    const result = new Map()
    value.forEach((v, k) => {
      result.set(deepClone(k), deepClone(v))
    })
    return result as T
  }

  // Handle Set
  if (value instanceof Set) {
    const result = new Set()
    value.forEach((v) => {
      result.add(deepClone(v))
    })
    return result as T
  }

  // Handle RegExp
  if (value instanceof RegExp) {
    return new RegExp(value) as T
  }

  // Handle Object
  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {}
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = deepClone((value as Record<string, unknown>)[key])
      }
    }
    return result as T
  }

  throw new Error(`Unsupported data type: ${typeof value}`)
}
