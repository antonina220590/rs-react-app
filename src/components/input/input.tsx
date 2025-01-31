import { ChangeEvent, Component } from 'react';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/localStorage';

interface InputProps {
  onSearch: (searchQuery: string) => void;
}

interface InputState {
  searchQuery: string;
}

class Input extends Component<InputProps, InputState> {
  constructor(props: InputProps) {
    super(props);
    this.state = { searchQuery: getFromLocalStorage() || '' };
  }

  handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target) {
      const newSearchQuery = target.value.trim() || '';
      this.setState({ searchQuery: newSearchQuery });
    } else {
      new Error('event target is null');
    }
  };
  handleSearchClick = () => {
    this.props.onSearch(this.state.searchQuery);
    saveToLocalStorage(this.state.searchQuery);
  };
  render() {
    return (
      <div className="w-[80%] m-10 bg-[#123c69] backdrop-blur-2xl border rounded-xl items-center justify-center mb-8 gap-10 flex">
        <input
          className="my-[20px] px-5 py-[10px] w-[250px] text-[20px] rounded-[5px] bg-white"
          name="input"
          type="text"
          placeholder="search....."
          onChange={this.handleSearchChange}
          value={this.state.searchQuery}
        ></input>
        <button
          className="bg-[#ac3b61] text-amber-50 p-5 rounded-[5px]"
          onClick={this.handleSearchClick}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Input;
