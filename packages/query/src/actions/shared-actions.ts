import type { Atom } from '@molecular/core'
import type { QueryState } from '../atoms/query'

export const getSharedActions = <T>(atom: Atom<QueryState<T>>) => {
  const DEFAULT_QUERY_STATE = {
    data: null,
    metaData: {
      loading: false,
      error: null
    }
  }

  atom.actions = {
    ...atom.actions,

    // Fetch data
    query: async (store, app) => {
      try {
        const { set } = store
        // Set loading state
        set(atom, (prevState) => ({
          ...prevState,
          metaData: { ...prevState.metaData, loading: true, error: null }
        }))

        // Fetch data
        const data = await atom.actions.queryFn(store, app)

        // Update state
        set(atom, (prevState) => ({
          ...prevState,
          data,
          metaData: { ...prevState.metaData, loading: false }
        }))
      } catch (error) {
        const { set } = store
        // Set error
        set(atom, (prevState) => ({
          ...prevState,
          metaData: { ...prevState.metaData, loading: false, error }
        }))
      }
    },

    // Set data manually
    setData: (store, _app, data: T) => {
      const { set } = store
      set(atom, (prevState) => ({
        ...prevState,
        data
      }))
    },

    // Clear data
    clearData: (store) => {
      const { set } = store
      set(atom, () => ({
        ...DEFAULT_QUERY_STATE
      }))
    },

    // Set an error
    setError: (store, _app, error: unknown) => {
      const { set } = store

      set(atom, (prevState) => ({
        ...prevState,
        metaData: { ...prevState.metaData, error }
      }))
    },

    // Set loading state
    setLoading: (store, _app, loading: boolean) => {
      const { set } = store
      set(atom, (prevState) => ({
        ...prevState,
        metaData: { ...prevState.metaData, loading }
      }))
    },

    // Refetch
    refetch: (store, _app, options: { queryFn: () => Promise<T> }) => {
      const { dispatch } = store
      dispatch(atom, 'fetch', options)
    }
  }

  return atom
}
