import PropTypes from "prop-types";
import { Container, FilterText, FilterInput } from "./Filter.styled";
export const Filter = ({ value, onChange }) => {
    return (<Container>
        <FilterText>Find contact</FilterText>
        <FilterInput value={value} onChange={(e) => onChange(e.target.value)}></FilterInput>
    </Container>)
}

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}