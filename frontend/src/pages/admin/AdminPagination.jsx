import { CPagination, CPaginationItem } from '@coreui/react'

export const AdminPagination = ({ data, offset, pageSize, setOffset }) => {
  const totalPages = Math.max(1, Math.ceil((data?.length || 0) / pageSize))
  const currentPage = Math.floor((offset || 0) / pageSize) + 1

  const handlePageChange = (page) => {
    setOffset((page - 1) * pageSize)
  }

  return (
    <CPagination aria-label="Page navigation example">
      <CPaginationItem
        aria-label="Previous"
        disabled={currentPage === 1}
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
      >
        <span aria-hidden="true">&laquo;</span>
      </CPaginationItem>
      {Array.from({ length: totalPages }, (_, idx) => (
        <CPaginationItem
          key={idx}
          active={currentPage === idx + 1}
          onClick={() => handlePageChange(idx + 1)}
        >
          {idx + 1}
        </CPaginationItem>
      ))}
      <CPaginationItem
        aria-label="Next"
        disabled={currentPage === totalPages}
        onClick={() =>
          currentPage < totalPages && handlePageChange(currentPage + 1)
        }
      >
        <span aria-hidden="true">&raquo;</span>
      </CPaginationItem>
    </CPagination>
  )
}
