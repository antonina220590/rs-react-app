import { Component } from 'react';
import { Character } from '../../utils/interface';
import { getApiData } from '../../utils/api';
import Input from '../input/input';
import { getFromLocalStorage } from '../../utils/localStorage';
import Cards from '../cards/cards';

interface AppState {
  characters: Character[];
  isLoading: boolean;
  errorMessage: null | string;
  searchQuery: string;
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
    };
  }
  componentDidMount(): void {
    this.fetchData(this.state.searchQuery);
  }

  fetchData = async (searchQuery: string = '') => {
    try {
      const data = await getApiData(searchQuery);
      this.setState({
        characters: data.results || [],
        isLoading: false,
        searchQuery,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.setState({ errorMessage, isLoading: false });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = (searchQuery: string) => {
    this.fetchData(searchQuery);
  };
  render() {
    const { characters } = this.state;
    return (
      <div>
        <Input onSearch={this.handleSearch} />
        <div className="flex flex-wrap">
          <Cards characters={characters} />
        </div>
      </div>
    );
  }
}

export default SearchPage;
