import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Character } from '../../utils/interface';
import { fetchCharacter } from './helpers/fetchCharacter';
import Spinner from '../spinner/spinners';

function DetailsPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCharacterData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (!id) {
          throw new Error('Character ID is missing');
        }
        const data = await fetchCharacter(id);
        setCharacter(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCharacterData();
    }
  }, [id, setCharacter, setError, setIsLoading]);

  const closeCard = useCallback(() => {
    navigate(`/${location.search}`);
  }, [navigate]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        closeCard();
      }
    },
    [closeCard]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="flex flex-wrap gap-20 p-10 justify-evenly flex-1">
      <div
        ref={detailsRef}
        className="flex flex-col items-center w-[500px] h-[700px] bg-gray-500/70 backdrop-blur-lg border border-white/18 rounded-xl shadow-xl sticky top-0"
      >
        {isLoading ? (
          <div className="h-[700px] inset-0 flex items-center justify-center bg-gray-500/50">
            <Spinner />
          </div>
        ) : error ? (
          <div className="bg-gray-500/70 backdrop-blur-lg border border-white/18 rounded-xl shadow-xl h-[200px] flex items-center">
            <p className="text-amber-50 text-4xl p-5">Error: {error}</p>
          </div>
        ) : (
          <>
            <div className="pb-[10px] pt-[20px]">
              <img
                className="h-[350px] pt-[20px]"
                src={character?.image}
                alt="image"
              />
            </div>
            <div className="pb-[20px]">
              <h3 className="font-bold text-5xl p-15">{character?.name}</h3>
              <p className="font-bold text-4xl pb-[10px]">
                Status: <span className="font-normal">{character?.status}</span>
              </p>
              <p className="font-bold text-4xl pb-[10px]">
                Species:{' '}
                <span className="font-normal">{character?.species}</span>
              </p>
              <p className="font-bold text-4xl pb-[10px]">
                Gender: <span className="font-normal">{character?.gender}</span>
              </p>
            </div>
            <button
              className="w-[150px] h-[50px] cursor-pointer rounded-md bg-[#ac3b61] text-white text-3xl border-none"
              type="button"
              onClick={closeCard}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default DetailsPage;
