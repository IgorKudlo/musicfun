import { ToastContainer } from 'react-toastify'

import s from './App.module.css'
import { Header, LinearProgress } from '@/common/components'
import { Routing } from '@/common/routing'
import { useGlobalLoading } from '@/common/hooks'

export const App = () => {
  const isGlobalLoading = useGlobalLoading()

  return (
    <>
      <Header />
      {isGlobalLoading && <LinearProgress />}
      <div className={s.layout}>
        <Routing />
      </div>
      <ToastContainer />
    </>
  )
}
