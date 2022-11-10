const FormTextInput = ({text,value,onChange}) => {
    return(
      <div>
        {text} : <input value={value} onChange={onChange} required/>
      </div>
    )
}

export default FormTextInput;