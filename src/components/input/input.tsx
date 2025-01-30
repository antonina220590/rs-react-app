import { Component } from 'react';

class Input extends Component {
  render() {
    return (
      <div className="w-[80%] m-10 bg-[#123c69] backdrop-blur-2xl border rounded-xl items-center justify-center mb-8 gap-10 flex">
        <input
          className="my-[20px] px-5 py-[10px] w-[250px] text-[20px] rounded-[5px] bg-white"
          name="input"
          type="text"
          placeholder="search....."
        ></input>
        <button className="bg-[#ac3b61] text-amber-50 p-5 rounded-[5px]">
          Search
        </button>
      </div>
    );
  }
}

export default Input;
