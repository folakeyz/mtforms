import React, { useState } from 'react'
import {
  Input,
  Select,
  Textarea,
  FormGroup,
  Button,
  DateInput,
  Radio,
  ImageUpload,
  AutoComplete,
  MTNExcel,
  MultiSelect,
  Modal,
  PasswordInput,
  Table
} from 'mtforms'
import 'mtforms/dist/index.css'
const App = () => {
  const data = [
    { item: 'test', value: 'test1' },
    { item: 'test2', value: 'test2' },
    { item: 'test3', value: 'test23' },
    { item: 'Moses', value: 'David' }
  ]
  const [formData, setFormData] = useState({})
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const submitHandler = (e) => {
    // e.preventDefault();
    console.log(formData)
  }

  console.log(formData)
  const validationHandler = (name, error) => {
    setErrors({ ...errors, [name]: error })
  }

  const handleChanges = (name, filterData) => {
    console.log(name, filterData)
  }

  const tableColumn = ['S/N', 'Name', 'email', 'phone']
  const col = [
    {
      title: 'Passport',
      field: 'Passport',
      render: (item) => (
        <img
          src={`https://upload.wikimedia.org/wikipedia/commons/b/b9/Nigerian_Enhanced_ePassport.webp`}
          alt=''
          height='50'
          width='50'
          style={{ borderRadius: '50%' }}
        />
      )
    },
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Phone', field: 'phone' },
    { title: 'Test', field: 'test.name' }
  ]
  const content = [
    {
      sn: 1,
      name: 'John Doe',
      email: `gbenga@yahoo.com`,
      phone: '08008080880'
    },
    {
      sn: 2,
      name: 'Femi Doe',
      // email: [
      //   { name: `MTN INCIDENT 0001 `, url: 'https://lotusbetaanalytics.com' }
      // ],
      phone: '08008080880'
    },
    {
      sn: 3,
      name: 'Dave Tom',
      test: { name: `john@yahoo.com`, url: 'https://lotusbetaanalytics.ca' },
      phone: '084008080880'
    }
  ]
  const openHandler = () => {
    setOpen(true)
  }
  console.log(formData, 'fprm')

  const actions = (item) => [
    {
      name: 'Edit',
      onClick: (res) => {
        setOpen(true)
        setFormData(res)
      }
    },
    {
      name: 'Delete',
      onClick: (res) => {}
    }
  ]
  return (
    <>
      <PasswordInput
        name='roleType'
        label='Name'
        value={formData['roleType']}
        onChange={handleChange}
        validationHandler={validationHandler}
        error={errors.name}
        required={true}
        size='large'
      />

      <MultiSelect
        name='category'
        label='Store Category'
        // value={formData['category']}
        onChange={handleChange}
        // type='text'
        validationHandler={validationHandler}
        error={errors.category}
        required={true}
        data={data}
        filter='item'
        filterValue='value'
      />

      <Radio
        label='Sex'
        name='sex'
        value={formData['sex']}
        onChange={handleChange}
        data={content}
        validationHandler={validationHandler}
        error={errors.sex}
        required={true}
        filter='name'
      />
      {/* <MTNExcel
        filename='downloaded'
        tableColumn={tableColumn}
        content={content}
      />
      <Button
        title={'Add'}
        bgColor='btnYellow'
        size='small'
        onClick={openHandler}
      /> */}
      <ImageUpload
        name='test'
        size='large'
        className='bgTest'
        error={errors.test}
        required={true}
        label='Image Upload'
        onChange={handleChange}
        validationHandler={validationHandler}
        value={formData['olc']}
        multiple={false}
      />

      <Modal
        isVisible={open}
        title={'Create Role'}
        size='lg'
        content={
          <FormGroup
            onSubmit={submitHandler}
            validation={formData}
            errors={errors}
            setErrors={setErrors}
          >
            <Input
              name='roleType'
              label='Name'
              value={formData['roleType']}
              onChange={handleChange}
              type='text'
              validationHandler={validationHandler}
              error={errors.name}
              required={true}
              size='large'
            />

            <Button
              title='Cancel'
              type='button'
              bgColor='btnBlack'
              size='small'
            />
          </FormGroup>
        }
        onClose={() => setOpen(false)}
        footer=''
      />

      <Table
        data={content}
        columns={col}
        actions={actions}
        selectID='sn'
        showFilter={true}
      />
    </>
  )
}

export default App
