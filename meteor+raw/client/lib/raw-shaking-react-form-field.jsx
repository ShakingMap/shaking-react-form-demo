import React from 'react';

/**
 * props for fields, all are optional
 * - {String} label
 * - {String} type
 * - {Any} options
 * - {Any} value
 * - {Func(value)} onChange
 * - {String} validationState - 'success' or 'error'
 * - {String} validationError
 */

const fieldClass = 'field';

// support types: text, email, password, file
// support options: placeholder
class InputField extends React.Component {
    constructor(props) {
        super(props);
        this.id = Math.random() + '';
    }

    render() {
        const {label, type, options, onChange, value, validationState, validationError} = this.props;
        const {placeholder} = options || {};

        const validationClass = validationState ? `validation-${validationState}` : '';
        const shouldShowError = validationState === 'error' && validationError;

        return <div className={fieldClass + ' ' + validationClass}>
            {
                label ? <label htmlFor={this.id}>{label}</label> : null
            }
            <input
                id={this.id}
                type={type}
                placeholder={placeholder}
                value={value || ''}
                onChange={(e)=>onChange(e.target.value)}
            />
            {
                shouldShowError ? <div className="error">{validationError}</div> : null
            }
        </div>
    }
}



const FormField = (props) => {
    const {type} = props;
    let Field;

    if (type === 'textarea') Field = TextareaField;
    else if (type === 'group.checkbox') Field = CheckBoxGroupField;
    else if (type === 'group.radio') Field = RadioGroupField;
    else if (type === 'group.select') Field = SelectGroupField;
    else Field = InputField;

    return <Field {...props}/>
};

export default FormField;