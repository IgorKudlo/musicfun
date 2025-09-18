import type { CreatePlaylistArgs, PlaylistsResponse, PlaylistData, UpdatePlaylistArgs } from './playlistsApi.types'
import { baseApi } from '../../../app/api/baseApi'

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, void>({
      query: () => {
        return {
          method: 'get',
          url: 'playlists',
        }
      },
      providesTags: ['Playlist'],
    }),

    createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
      query: (body) => {
        return {
          method: 'post',
          url: 'playlists',
          body,
        }
      },
      invalidatesTags: ['Playlist'],
    }),

    deletePlaylist: build.mutation<void, string>({
      query: (playlistId) => {
        return {
          method: 'delete',
          url: `playlists/${playlistId}`,
        }
      },
      invalidatesTags: ['Playlist'],
    }),

    updatePlaylist: build.mutation<void, { playlistId: string; body: UpdatePlaylistArgs }>({
      query: ({ playlistId, body }) => {
        return {
          method: 'put',
          url: `playlists/${playlistId}`,
          body,
        }
      },
      invalidatesTags: ['Playlist'],
    }),
  }),
})

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
} = playlistsApi
