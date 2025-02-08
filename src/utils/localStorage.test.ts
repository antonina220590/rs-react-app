import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSearchQuery, saveToLocalStorage } from './localStorage';

describe('useSearchQuery', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with an empty string if localStorage is empty', () => {
    const { result } = renderHook(() => useSearchQuery());
    expect(result.current[0]).toBe('');
  });

  it('should initialize with the value from localStorage', () => {
    saveToLocalStorage('Rick');
    const { result } = renderHook(() => useSearchQuery());
    expect(result.current[0]).toBe('Rick');
  });

  it('should update the search query correctly', () => {
    const { result } = renderHook(() => useSearchQuery());
    act(() => {
      result.current[1]('Morty');
    });
    expect(result.current[0]).toBe('Morty');
    expect(localStorage.getItem('searchQuery')).toBe('Morty');
  });

  it('should update search query on storage event', () => {
    const { result } = renderHook(() => useSearchQuery());

    saveToLocalStorage('Another Query');

    act(() => {
      window.dispatchEvent(new Event('storage'));
    });

    expect(result.current[0]).toBe('Another Query');
  });
});
