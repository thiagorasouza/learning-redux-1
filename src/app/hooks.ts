import { AppDispatch, RootState } from '@/app/store'
import { useDispatch, useSelector } from 'react-redux'

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
