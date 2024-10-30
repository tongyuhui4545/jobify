import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useAllJobsContext } from '../pages/AllJobs'


const PageBtnContainer = () => {
  const { data: { numOfPages, currentPage } } = useAllJobsContext()
  // const pages = Array.from({ length: numOfPages }, (_, index) => {
  //   return index + 1
  // })

  const { search, pathname } = useLocation()
  const navigate = useNavigate()

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNumber)
    navigate(`${pathname}?${searchParams}`)

  }

  const handlePreAndNext = (type) => {
    if (type === 'pre') {
      let prevPage = currentPage - 1;
      if (prevPage < 1) prevPage = 1;
      handlePageChange(prevPage)
    }
    if (type === 'next') {
      let nextPage = currentPage + 1;
      if (nextPage > numOfPages) nextPage = numOfPages;
      handlePageChange(nextPage)
    }
  }

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button className={`btn page-btn ${activeClass && 'active'}`} key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
        {pageNumber}
      </button>
    )
  }

  const renderPageButtons = () => {
    const pageButtons = [];

    // first page
    pageButtons.push(
      addPageButton({
        pageNumber: 1, activeClass: currentPage === 1
      })
    )

    //dots
    if(currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key='dots-1'>
          ...
        </span>
      )
    }

    //page before current page
    if(currentPage !==1 && currentPage !==2) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage - 1, activeClass: false
        })
      )
    }

    //current page
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage, activeClass: true
        })
      )
    }

    //page after current page
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage + 1, activeClass: false
        })
      )
    }

    //dots
       //dots
       if(currentPage < numOfPages - 2) {
        pageButtons.push(
          <span className="page-btn dots" key='dots+1'>
            ...
          </span>
        )
      }

    //last page
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages, activeClass: currentPage === numOfPages
      })
    )
    return pageButtons
  }

  return (
    <Wrapper>
      <button onClick={() => handlePreAndNext('pre')} className="btn prev-btn">
        <HiChevronDoubleLeft /> prev
      </button>
      <div className="btn-container">
        {renderPageButtons()}
      </div>
      <button className="btn next-btn" onClick={() => handlePreAndNext('next')}>
        <HiChevronDoubleRight /> next
      </button>

    </Wrapper>
  )
}

export default PageBtnContainer