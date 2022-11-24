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
  AutoComplete
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
  const [errors, setErrors] = useState({})

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const submitHandler = (e) => {
    // e.preventDefault();
    console.log(formData)
  }

  const validationHandler = (name, error) => {
    setErrors({ ...errors, [name]: error })
  }

  const handleChanges = (name, filterData) => {
    console.log(name, filterData)
  }
  return (
    <FormGroup
      onSubmit={submitHandler}
      validation={formData}
      errors={errors}
      setErrors={setErrors}
    >
      <Input
        label='Name'
        name='firstname'
        onChange={handleChange}
        value={formData['firstname']}
        className='pBorder'
        required={true}
        validationHandler={validationHandler}
        error={errors.firstname}
      />
      <DateInput
        label='Date'
        name='date'
        onChange={handleChange}
        value={formData['date']}
        className='pBorder'
        required={true}
        validationHandler={validationHandler}
        error={errors.date}
        placeholder='Date'
      />
      <Radio
        label='Marital Status'
        name='maritalStatus'
        value={formData['maritalStatus']}
        onChange={handleChange}
        data={data}
      />
      <Select
        className='blackBorder'
        data={data}
        required={true}
        label='Select Test'
        onChange={handleChange}
        value={formData['item']}
        name='item'
        validationHandler={validationHandler}
        error={errors.item}
        filter='item'
        filterValue='value'
      />
      <Textarea
        label='Address'
        name='address'
        onChange={handleChanges}
        value={formData['address']}
        className='blackBorder'
        required={true}
        validationHandler={validationHandler}
        error={errors.address}
      />
      <ImageUpload
        name='photo'
        label='Passport Photo'
        value=''
        onChange={handleChange}
        loading={false}
        size='medium'
        bgColor='btnBlue'
      />
      <AutoComplete
        data={data}
        label='Test'
        name='tname'
        onChange={handleChanges}
        value={formData['tname']}
        className='pBorder'
        required={true}
        validationHandler={validationHandler}
        error={errors.tname}
        select='item'
        // selectValue='value'
      />
      <Button type='submit' title='New' bgColor='btnYellow' />
    </FormGroup>
  )
}

export default App
