import { Component } from 'react';
import { Character } from '../../utils/interface';
interface CardsProps {
  characters: Character[];
}

class Cards extends Component<CardsProps> {
  render() {
    const { characters } = this.props;
    return (
      <div className="flex flex-wrap gap-20 m-7 p-10 justify-evenly ">
        {characters.map((character) => (
          <div
            className="flex flex-row-reverse justify-between w-[500px] bg-gray-500/70 backdrop-blur-lg border border-white/18 rounded-xl shadow-xl"
            key={character.id}
          >
            <div className="">
              <h3 className="font-bold text-4xl p-15">{character.name}</h3>
              <p className="font-bold">
                Status: <span className="font-normal">{character.status}</span>
              </p>
              <p className="font-bold">
                Species:{' '}
                <span className="font-normal">{character.species}</span>
              </p>
              <p className="font-bold">
                Gender: <span className="font-normal">{character.gender}</span>
              </p>
            </div>
            <div>
              <img className="h-[250px]" src={character.image} alt="image" />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Cards;
