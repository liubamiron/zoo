
import { Pagination } from "react-bootstrap";
import PropTypes from "prop-types";


const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    // if (totalPages <= 1) return null;
    // Hide pagination if there's only 1 page

    return (
        <Pagination className="justify-content-center mt-4">
            <Pagination.First
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
            />
            <Pagination.Prev
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            />
            <Pagination.Last
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
            />
        </Pagination>
    );
};

// PropTypes validation for props
PaginationComponent.propTypes = {
    currentPage: PropTypes.number.isRequired,  // Must be a number and required
    totalPages: PropTypes.number.isRequired,   // Must be a number and required
    onPageChange: PropTypes.func.isRequired,   // Must be a function and required
};

export default PaginationComponent;
