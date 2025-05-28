import { ChangeEvent, useEffect } from 'react';
import './BookSelector.css';

interface BookSelectorProps {
    currentBook: string;
    onBookChange: (bookUrl: string, bookName: string) => void;
}

export const BookSelector = ({ currentBook, onBookChange }: BookSelectorProps) => {
    // Available books
    const books = [
        { name: "Pausanias Book 1", url: "book1.tei.xml" },
        { name: "Pausanias Book 2", url: "book2.tei.xml" },
        { name: "Pausanias Book 3", url: "book3.tei.xml" },
        { name: "Pausanias Book 4", url: "book4.tei.xml" },
        { name: "Pausanias Book 5", url: "book5.tei.xml" },
        { name: "Pausanias Book 6", url: "book6.tei.xml" },
        { name: "Pausanias Book 7", url: "book7.tei.xml" },
        { name: "Pausanias Book 8", url: "book8.tei.xml" },
        { name: "Pausanias Book 9", url: "book9.tei.xml" },
        { name: "Pausanias Book 10", url: "book10.tei.xml" }
    ];

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const bookUrl = e.target.value;
        const book = books.find(b => b.url === bookUrl);
        if (book) {
            // Save selection to localStorage
            localStorage.setItem('selectedBookUrl', bookUrl);
            localStorage.setItem('selectedBookName', book.name);

            // Notify parent component
            onBookChange(bookUrl, book.name);

            // Refresh the page
            window.location.reload();
        }
    };

    return (
        <div className="book-selector">
            <select value={currentBook} onChange={handleChange}>
                {books.map((book, index) => (
                    <option key={index} value={book.url}>
                        {book.name}
                    </option>
                ))}
            </select>
        </div>
    );
};