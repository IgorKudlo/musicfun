import { baseApi } from '@/app/api/baseApi'
import type { FetchTracksResponse } from './tracksApi.types'
import { withZodCatch } from '../../../common/utils/withZodCatch'
import { fetchTracksResponseSchema } from '../model/tracks.schemas'

export const tracksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchTracks: build.infiniteQuery<FetchTracksResponse, void, string | undefined>({
      infiniteQueryOptions: {
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
          return lastPage.meta.nextCursor || undefined
        },
      },
      query: ({ pageParam }) => {
        return {
          url: 'playlists/tracks',
          params: { cursor: pageParam, pageSize: 5, paginationType: 'cursor' },
        }
      },
      ...withZodCatch(fetchTracksResponseSchema),
    }),
  }),
})
export const { useFetchTracksInfiniteQuery } = tracksApi
