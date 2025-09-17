import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useDeletePlaylistMutation, useFetchPlaylistsQuery, useUpdatePlaylistMutation } from '../api/playlistsApi'
import type { PlaylistData, UpdatePlaylistArgs } from '../api/playlistsApi.types'
import { CreatePlaylistForm } from './CreatePlaylistForm/CreatePlaylistForm'
import { PlaylistItem } from './PlaylistItem/PlaylistItem'
import s from './PlaylistsPage.module.css'

export const PlaylistsPage = () => {
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>()

  const { data } = useFetchPlaylistsQuery()
  const [deletePlaylist] = useDeletePlaylistMutation()
  const [updatePlaylist] = useUpdatePlaylistMutation()

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Are you sure you want to delete the playlist?')) {
      deletePlaylist(playlistId)
    }
  }

  const editPlaylistHandler = (playlist: PlaylistData | null) => {
    if (playlist) {
      setPlaylistId(playlist.id)
      reset({
        title: playlist.attributes.title,
        description: playlist.attributes.description,
        tagIds: playlist.attributes.tags.map((tag) => tag.id),
      })
    } else {
      setPlaylistId(null)
    }
  }

  const onSubmit: SubmitHandler<UpdatePlaylistArgs> = (data) => {
    if (!playlistId) return

    updatePlaylist({ playlistId, body: data })
      .unwrap()
      .then(() => setPlaylistId(null))
  }

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <div className={s.items}>
        {data?.data.map((playlist) => {
          const isEditing = playlistId === playlist.id

          return (
            <div className={s.item} key={playlist.id}>
              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h2>Edit playlist</h2>
                  <div>
                    <input {...register('title')} placeholder={'title'} />
                  </div>
                  <div>
                    <input {...register('description')} placeholder={'description'} />
                  </div>
                  <button type={'submit'}>save</button>
                  <button type={'button'} onClick={() => editPlaylistHandler(null)}>
                    cancel
                  </button>
                </form>
              ) : (
                <PlaylistItem
                  playlist={playlist}
                  deletePlaylist={deletePlaylistHandler}
                  editPlaylist={editPlaylistHandler}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
