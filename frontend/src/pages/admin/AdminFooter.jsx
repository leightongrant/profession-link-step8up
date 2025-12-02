import { memo } from 'react'
import { CFooter } from '@coreui/react'

const AdminFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <span className="ms-1">ProLINK &copy; 2025 </span>
      </div>
    </CFooter>
  )
}

export default memo(AdminFooter)
