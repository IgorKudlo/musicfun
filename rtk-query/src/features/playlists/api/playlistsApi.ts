import type {
  CreatePlaylistArgs,
  PlaylistsResponse,
  PlaylistData,
  UpdatePlaylistArgs,
  FetchPlaylistsArgs,
} from './playlistsApi.types'
import { baseApi } from '../../../app/api/baseApi'
import type { Images } from '../../../common/types'

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
      query: (params) => {
        return {
          method: 'get',
          url: 'playlists',
          params,
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
      query: ({ playlistId, body }) => ({ url: `playlists/${playlistId}`, method: 'put', body }),
      async onQueryStarted({ playlistId, body }, { dispatch, queryFulfilled, getState }) {
        const args = playlistsApi.util.selectCachedArgsForQuery(getState(), 'fetchPlaylists')

        const patchResults: any[] = []

        args.forEach((arg) => {
          patchResults.push(
            dispatch(
              playlistsApi.util.updateQueryData(
                'fetchPlaylists',
                {
                  pageNumber: arg.pageNumber,
                  pageSize: arg.pageSize,
                  search: arg.search,
                },
                (state) => {
                  const index = state.data.findIndex((playlist) => playlist.id === playlistId)
                  if (index !== -1) {
                    state.data[index].attributes = { ...state.data[index].attributes, ...body }
                  }
                },
              ),
            ),
          )
        })

        try {
          await queryFulfilled
        } catch {
          patchResults.forEach((patchResult) => {
            patchResult.undo()
          })
        }
      },
      invalidatesTags: ['Playlist'],
    }),

    uploadPlaylistCover: build.mutation<Images, { playlistId: string; file: File }>({
      query: ({ playlistId, file }) => {
        const formData = new FormData()
        formData.append('file', file)

        return {
          method: 'post',
          url: `playlists/${playlistId}/images/main`,
          body: formData,
        }
      },
      invalidatesTags: ['Playlist'],
    }),

    deletePlaylistCover: build.mutation<void, { playlistId: string }>({
      query: ({ playlistId }) => {
        return {
          method: 'delete',
          url: `playlists/${playlistId}/images/main`,
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
  useUploadPlaylistCoverMutation,
  useDeletePlaylistCoverMutation,
} = playlistsApi
