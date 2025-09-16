import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { PlaylistsResponse } from './playlistsApi.types'

export const playlistsApi = createApi({
  reducerPath: 'playlistsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      'API-KEY': import.meta.env.VITE_API_KEY,
    },
  }),

  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, void>({
      query: () => {
        return {
          method: 'get',
          url: 'playlists',
        }
      },
    }),
  }),
})

export const { useFetchPlaylistsQuery } = playlistsApi
