import { useGetMeQuery } from '@/features/auth/api/authApi'

export const MainPage = () => {
  const { data } = useGetMeQuery()

  return (
    <div>
      <h1>MainPage</h1>
      <h2>{data?.login}</h2>
    </div>
  )
}
