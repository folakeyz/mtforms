import React, { useState } from 'react'
import { Input, Select, Textarea, FormGroup, Button } from 'mtforms'
import 'mtforms/dist/index.css'
const App = () => {
  const data = [
    { item: 'test', value: 'test1' },
    { item: 'test2', value: 'test2' },
    { item: 'test3', value: 'test23' }
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
        onChange={handleChange}
        value={formData['address']}
        className='blackBorder'
        required={true}
        validationHandler={validationHandler}
        error={errors.address}
      />
      <Button type='submit' title='New' />
    </FormGroup>
  )
}

export default App
