import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';

export const useGameDispatch = () => useDispatch<AppDispatch>();
