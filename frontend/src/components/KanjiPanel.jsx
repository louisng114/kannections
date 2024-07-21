const KanjiPanel = ({ kanji, selectedKanji, handleKanjiClick}) => {
    return (
        <div 
            key={kanji}
        >
            {kanji}
        </div>
    )
};

export default KanjiPanel;