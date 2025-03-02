import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSearchQuery, saveToLocalStorage } from './localStorageHook';

describe('useSearchQuery', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it.skip('should initialize with an empty string if localStorage is empty', () => {
    const { result } = renderHook(() => useSearchQuery());
    expect(result.current[0]).toBe('');
  });

  it.skip('should initialize with the value from localStorage', () => {
    saveToLocalStorage('Rick');
    const { result } = renderHook(() => useSearchQuery());
    expect(result.current[0]).toBe('Rick');
  });

  it.skip('should update the search query correctly', () => {
    const { result } = renderHook(() => useSearchQuery());
    act(() => {
      result.current[1]('Morty');
    });
    expect(result.current[0]).toBe('Morty');
    expect(localStorage.getItem('searchQuery')).toBe('Morty');
  });
});
