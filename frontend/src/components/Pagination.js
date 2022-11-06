

import React from 'react';
import { Link } from "react-router-dom";
const Pagination = ({ itemPerPage, totalNotes, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalNotes / itemPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='ml-3 pagination '>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <Link onClick={() => paginate(number)} to="/" className='page-link'>
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;





// const [currentPage, setCurrentPage] = useState(1)
// const [itemPerPage] = useState(2)

// const indexOfLastPost = currentPage * itemPerPage
// const indexOfFirstPost = indexOfLastPost - itemPerPage
// const currentNotes = notes ? notes.slice(indexOfFirstPost, indexOfLastPost) : null

// // Change page
// const paginate = pageNumber => setCurrentPage(pageNumber);