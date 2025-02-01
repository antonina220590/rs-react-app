import { Component } from 'react';
import { Character } from '../../utils/interface';
import { getApiData } from '../../utils/api';
import Input from '../input/input';
import { getFromLocalStorage } from '../../utils/localStorage';
import Cards from '../cards/cards';
import Spinner from '../spinner/spinners';

interface AppState {
  characters: Character[];
  isLoading: boolean;
  errorMessage: null | string;
  searchQuery: string;
  counter: number;
}

class SearchPage extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    const initialSearchQuery = getFromLocalStorage();
    this.state = {
      characters: [],
      isLoading: true,
      errorMessage: null,
      searchQuery: initialSearchQuery || '',
      counter: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(): void {
    this.fetchData(this.state.searchQuery);
  }
  delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  fetchData = async (searchQuery: string = '') => {
    this.setState({ isLoading: true, errorMessage: null });
    try {
      const data = await getApiData(searchQuery);
      await this.delay(300);
      this.setState({
        characters: data.results || [],
        isLoading: false,
        searchQuery,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.';
      this.setState({ errorMessage, isLoading: false });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = (searchQuery: string) => {
    this.fetchData(searchQuery);
  };

  handleClick() {
    this.setState(({ counter }) => ({
      counter: counter + 1,
    }));
  }

  render() {
    const { characters, isLoading, counter, errorMessage } = this.state;
    if (counter === 1) {
      throw new Error('Something went wrong!');
    }

    return (
      <div className="w-[90%] flex flex-col items-center">
        <div className="w-[95%] m-10 bg-[#123c69] backdrop-blur-2xl border rounded-xl items-center justify-center mb-8 gap-15 flex flex-wrap">
          <button
            className="p-5 rounded-[5px] bg-[#edc787] mr-[30px]"
            onClick={this.handleClick}
            style={{ cursor: 'pointer' }}
          >
            Trigger Error
          </button>
          <Input onSearch={this.handleSearch} />
        </div>

        <div className="w-[95%] m-10 bg-[#123c69] backdrop-blur-2xl border rounded-xl mb-8 gap-15 justify-center items-center flex flex-wrap">
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p>Error: {errorMessage}</p>
          ) : characters.length === 0 ? (
            <p>No results found for your search.</p>
          ) : (
            <div className="w-50% flex flex-wrap">
              <Cards characters={characters} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchPage;
