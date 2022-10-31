import React from 'react'
import ModalUser from '../../../Component/TableAdmin/ModalUser'
import TableUser from '../../../Component/TableAdmin/TableUser'

type Props = {}

export default function UserAdmin({}: Props) {
  return (
    <div className='container'>
      <ModalUser />
      <TableUser />
    </div>
  )
}