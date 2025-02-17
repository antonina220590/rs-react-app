import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import Spinner from '../spinner/spinners';
import { useGetCharacterByIdQuery } from '../../utils/slices/apiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import Error404Page from '../404Page/404page';

const isFetchBaseQueryError = (
  error: unknown
): error is FetchBaseQueryError => {
  return (error as FetchBaseQueryError).status !== undefined;
};

function DetailsPage() {
  const { id } = useParams();
  const {
    data: character,
    error,
    isLoading,
  } = useGetCharacterByIdQuery(Number(id));
  const navigate = useNavigate();

  const closeCard = useCallback(() => {
    navigate(`/${location.search}`);
  }, [navigate]);

  if (error) {
    if (isFetchBaseQueryError(error) && error.status === 404) {
      return <Error404Page />;
    }

    return (
      <div className="bg-gray-500/70 backdrop-blur-lg border border-white/18 rounded-xl shadow-xl h-[200px] flex items-center">
        <p className="text-amber-50 text-4xl p-5">
          {isFetchBaseQueryError(error)
            ? `Error: ${error.status} - ${error.data ? JSON.stringify(error.data) : 'No additional information available.'}`
            : 'An unexpected error occurred.'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-20 pl-[10px] pr-[10px] justify-evenly flex-1">
      <div className="flex flex-col items-center w-[500px] h-[700px] bg-gray-500/70 backdrop-blur-lg border border-white/18 rounded-xl shadow-xl sticky top-0">
        {isLoading ? (
          <div className="h-[700px] inset-0 flex items-center justify-center bg-gray-500/50">
            <Spinner />
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
              data-testid="closeCardBtn"
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
