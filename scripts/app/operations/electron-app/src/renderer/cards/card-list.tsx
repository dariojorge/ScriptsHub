import { useState } from 'react';
import './card-list.scss';
import CardFromComponent from './card-form';
import { camelToWords, firstElement, wordsToCamel } from '../utils/utils';
import { removeProfilesById, updateProfile } from '../db/db-runners';


const CardManagerComponent = (props: { projects: string[] }) => {
    const [cards, setCards] = useState<RunnersProfileModel[]>([]);

    const removeCard = (cardId: number) => {
        setCards(cards.filter(card => card.id !== cardId));

        const cardToRemove = firstElement(cards.filter(card => card.id === cardId));
        removeProfilesById(wordsToCamel(cardToRemove.title));
    }

    const toggle = (cardId: number) => {
        const cardToggled: RunnersProfileModel = firstElement(cards.filter(card => card.id === cardId));
        cardToggled.activeProfile = !cardToggled.activeProfile;
        setCards(prev =>
            prev.map(card =>
                card.id === cardToggled.id ? { ...card, activeProfile: cardToggled.activeProfile } : card
            )
        );
        updateProfile(wordsToCamel(cardToggled.title), cardToggled);

        const previousToggledCard: RunnersProfileModel = firstElement(cards.filter(card => card.id !== cardId && card.activeProfile));
        if (previousToggledCard !== null) {
            previousToggledCard.activeProfile = !previousToggledCard.activeProfile;
            updateProfile(wordsToCamel(previousToggledCard.title), previousToggledCard);
            setCards(prev =>
                prev.map(card =>
                    card.id === previousToggledCard.id ? { ...card, activeProfile: previousToggledCard.activeProfile } : card
                )
            );
        }

        setCards(prevItems => [
            ...prevItems.filter(item => item.activeProfile),
            ...prevItems.filter(item => !item.activeProfile)
        ]);
    };

    return (
        <div className="card-manager">
            <CardFromComponent cards={cards} setCards={setCards} projects={props.projects} />

            <div className="card-grid">
                {cards.map((card) => (
                    <div key={card.id} className={`output-card ${card.activeProfile ? 'active-profile' : ''}`}>
                        <h4 className='title'>{card.title}</h4>
                        <p className='description'>
                            <strong>Description:</strong> {card.description}
                        </p>
                        <p>
                            <strong>Script Type:</strong> {card.scriptType}
                        </p>
                        <p>
                            <strong>Type:</strong> {card.type}
                        </p>
                        {card.projects.length > 0 && (
                            <p>
                                <strong>Projects:</strong> {card.projects.join(', ')}
                            </p>
                        )}
                        {card.type === "create" && (
                            <p>
                                <strong>Recreate Files:</strong> {card.recreateFiles ? '✅ Active' : '❌ Inactive'}
                            </p>
                        )}
                        {card.type !== "create" && (
                            <p>
                                <strong>Env:</strong> {card.env}
                            </p>
                        )}
                        {card.additionalArgs.length > 0 && card.type !== "create" &&
                            card.additionalArgs.map((arg) => (
                                <p>
                                    <strong>{camelToWords(arg.key)}:</strong> {arg.value ? '✅ Active' : '❌ Inactive'}
                                </p>
                            ))
                        }

                        <button onClick={() => removeCard(card.id)}>Remove</button>
                        <button onClick={() => toggle(card.id)}>{card.activeProfile ? 'Active' : 'Disabled'}</button>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default CardManagerComponent;