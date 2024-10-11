import { useState } from 'react';

const Chat = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`/api/${encodeURIComponent(query)}`);
        const data = await res.json();
        setResponse(data.answer);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask a question..." />
                <button type="submit">Send</button>
            </form>
            <div>{response}</div>
        </div>
    );
};

export default Chat;