import { Component } from 'react';
import { Character } from '../../utils/interface';
interface CardsProps {
  characters: Character[];
}

class Cards extends Component<CardsProps> {
  render() {
    const { characters } = this.props;
    return (
      <div>
        {characters.map((character) => (
          <div key={character.id}>
            {character.name}
            <img src={character.image} alt="image" />
          </div>
        ))}
      </div>
    );
  }
}

export default Cards;
