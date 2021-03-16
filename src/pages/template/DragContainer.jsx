import { useState, useCallback, useEffect } from 'react';
import { Card } from './Card';
import update from "immutability-helper";

export const DragContainer =  (props) => {
    let cards2 = props.cards;
    // const cardsState = useState(cards2);
    let [cards, setCards] =  useState(props.cards);
    let arrang_array = [];

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex];

        setCards(update(cards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        }));
        // setTimeout(()=>{
        //     update(arrang_array, cards.map((card) => arrang_array.push(card.id)))
        //     props.parentCallback(arrang_array);
        // },2000)

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

export  default  DragContainer;
