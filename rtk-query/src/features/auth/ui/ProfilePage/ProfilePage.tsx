import { Navigate } from 'react-router'
import { Path } from '@/common/routing'
import { useGetMeQuery } from '../../api/authApi'
import { useFetchPlaylistsQuery } from '../../../playlists/api/playlistsApi'
import { CreatePlaylistForm } from '../../../playlists/ui/CreatePlaylistForm/CreatePlaylistForm'
import { PlaylistsList } from '../../../playlists/ui/PlaylistsList/PlaylistsList'
import s from './ProfilePage.module.css'

export const ProfilePage = () => {
  const { data: meResponse, isLoading: isMeLoading } = useGetMeQuery()

  console.log(meResponse)

  const { data: playlistsResponse, isLoading } = useFetchPlaylistsQuery(
    { userId: meResponse?.userId },
    { skip: !meResponse?.userId },
  )

  if (isLoading || isMeLoading) return <h1>Skeleton loader...</h1>

  if (!isMeLoading && !meResponse) return <Navigate to={Path.Playlists} />

  return (
    <>
      <h1>{meResponse?.login} page2</h1>
      <div className={s.container}>
        <CreatePlaylistForm />
        <PlaylistsList playlists={playlistsResponse?.data || []} isPlaylistsLoading={isLoading || isMeLoading} />
      </div>
    </>
  )
}
