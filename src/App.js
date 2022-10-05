import { useState } from 'react';
import './App.css';

const HILIGHT_TEXT_AFTER_CHAR = 5;

const Highlight = ({ string, indexHighlight = null }) =>
    indexHighlight && indexHighlight > -1 && string.length > indexHighlight ? (
        <>
            {string.slice(0, indexHighlight)}
            <mark>{string.slice(indexHighlight, string.length)}</mark>
        </>
    ) : (
        <>{string}</>
    );

const TabText = ({
    value,
    onRemove = null,
    indexRemove = null,
    highlightLimit = null,
}) => (
    <p
        style={{
            padding: '2px 10px',
            marginRight: '4px',
            marginBottom: '2px',
            borderRadius: '50px',
            backgroundColor: '#cccccc',
        }}
    >
        <Highlight string={value} indexHighlight={highlightLimit} />{' '}
        <strong
            style={{ marginLeft: '2px', fontFamily: 'sans' }}
            onClick={() => onRemove(indexRemove)}
        >
            x
        </strong>
    </p>
);

function App() {
    const [input, setInput] = useState('');
    const [list, setList] = useState([]);
    const onKey = (e) => {
        if (e.key === 'Enter' || e.code === 'Enter' || e.keyCode === 13) {
            setList([...list, e.target.value]);
            setInput('');
        }
    };
    const onChange = (e) => {
        if (
            e.target &&
            (e.target.value !== null || e.target.value !== undefined)
        ) {
            /* because e.target.value === '' when we remove text from input, we still need the setInput to work */
            setInput(e.target.value);
        }
    };
    const onRemove = (index) => {
        if (index !== null || index !== undefined) {
            const newArray = [...list];
            newArray.splice(index, 1);
            setList([...newArray]);
        }
    };
    return (
        <div className='App'>
            {list.map((el, index) => (
                <TabText
                    value={el}
                    onRemove={onRemove}
                    indexRemove={index}
                    highlightLimit={HILIGHT_TEXT_AFTER_CHAR}
                />
            ))}
            <input
                className='custom-width'
                value={input}
                onChange={onChange}
                onKeyUp={onKey}
            />
        </div>
    );
}

export default App;
