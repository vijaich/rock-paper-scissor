import './index.css'

const Options = props => {
  const {optionDetails, selectedOption} = props
  const {imageUrl, id} = optionDetails
  const names = id.toLowerCase()

  const onOptionClick = () => {
    selectedOption(id)
  }
  return (
    <button
      type="button"
      data-testid={`${names}Button`}
      className="button"
      onClick={onOptionClick}
    >
      <img src={imageUrl} alt={id} className="img" />
    </button>
  )
}

export default Options
