import { useState, useCallback } from 'react';
import { Card } from './Card';
import update from "immutability-helper";
import {useEffect, useRef} from "react/cjs/react.production.min";
const style = {
    width: 400,
};
export const Example = (props) => {
       let cards2= props.cards;
    let [cards, setCards] = useState(cards2);

    // if (cards2 !== cards) {
    //     [cards, setCards] = useState(cards2);
    // }
        const moveCard = useCallback((dragIndex, hoverIndex) => {
            const dragCard = cards[dragIndex];

            setCards(update(cards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            }));
        }, [cards]);
        return (
            <>
            <div>
            {cards.map((card, i) =>
                <Card key={card.id} index={i} id={card.id} text={card.text} moveCard={moveCard}/>
            )}
            </div>
        </>);
    }
;
export  default  Example;
