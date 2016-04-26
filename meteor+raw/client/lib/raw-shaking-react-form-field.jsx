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

// support types: textarea
// support options: placeholder, rows
class TextareaField extends React.Component {
    constructor(props) {
        super(props);
        this.id = Math.random() + '';
    }

    render() {
        const {label, options, onChange, value, validationState, validationError} = this.props;
        const {placeholder, rows} = options || {};

        const validationClass = validationState ? `validation-${validationState}` : '';
        const shouldShowError = validationState === 'error' && validationError;

        return <div className={fieldClass + ' ' + validationClass}>
            {
                label ? <label htmlFor={this.id}>{label}</label> : null
            }
            <textarea
                id={this.id}
                placeholder={placeholder}
                rows={rows}
                value={value || ''}
                onChange={(e)=>onChange(e.target.value)}
            />
            {
                shouldShowError ? <div className="error">{validationError}</div> : null
            }
        </div>
    }
}

// support types: group.checkbox
// support options: group, vertical
// options.group is an object, where key is checkbox key, and value is checkbox label
// value is an array, where items are the keys of checked checkboxes
class CheckboxGroupField extends React.Component {
    constructor(props) {
        super(props);
        this.id = Math.random() + '';
    }

    render() {
        const {label, options, onChange, value, validationState, validationError} = this.props;
        const {group, vertical} = options || {};

        const validationClass = validationState ? `validation-${validationState}` : '';
        const shouldShowError = validationState === 'error' && validationError;

        const checkedItems = new Set(value);

        return <div className={fieldClass + ' ' + validationClass}>
            {
                label ? <label htmlFor={this.id}>{label}</label> : null
            }
            {
                Object.keys(group).map(key=>
                    <div
                        key={key}
                        className="item"
                        style={vertical ? {} : {display: 'inline', marginRight: '1rem'}}
                    >
                        <input
                            id={this.id+key}
                            type="checkbox"
                            checked={checkedItems.has(key)}
                            onChange={(e)=>{
                                const newValue = (value || []).filter(function(x){return x !== key});
                                if (e.target.checked) newValue.push(key);
                                onChange(newValue);
                            }}
                        />
                        <label htmlFor={this.id+key}>{group[key]}</label>
                    </div>
                )
            }
            {
                shouldShowError ? <div className="error">{validationError}</div> : null
            }
        </div>
    }
}

// support types: group.radio
// support options: group, vertical
// options.group is an object, where key is radio key, and value is radio label
// value is the key of selected radio
class RadioGroupField extends React.Component {
    constructor(props) {
        super(props);
        this.id = Math.random() + '';
    }

    render() {
        const {label, options, onChange, value, validationState, validationError} = this.props;
        const {group, vertical} = options || {};

        const validationClass = validationState ? `validation-${validationState}` : '';
        const shouldShowError = validationState === 'error' && validationError;

        return <div className={fieldClass + ' ' + validationClass}>
            {
                label ? <label htmlFor={this.id}>{label}</label> : null
            }
            {
                Object.keys(group).map(key=>
                    <div
                        key={key}
                        className="item"
                        style={vertical ? {} : {display: 'inline', marginRight: '1rem'}}
                    >
                        <input
                            id={this.id+key}
                            type="radio"
                            checked={key === value}
                            onChange={(e)=>{
                                onChange(key);
                            }}
                        />
                        <label htmlFor={this.id+key}>{group[key]}</label>
                    </div>
                )
            }
            {
                shouldShowError ? <div className="error">{validationError}</div> : null
            }
        </div>
    }
}

// support types: group.select
// support options: group, multiple
// options.group is an object, where key is option key, and value is option text
// if not multiple, value is the key of selected option
// else value is an array of keys of selected options
class SelectGroupField extends React.Component {
    constructor(props) {
        super(props);
        this.id = Math.random() + '';
    }

    render() {
        const {label, options, onChange, value, validationState, validationError} = this.props;
        const {group, multiple} = options || {};

        const validationClass = validationState ? `validation-${validationState}` : '';
        const shouldShowError = validationState === 'error' && validationError;

        const onFieldChange = multiple ?
            (e)=> {
                const options = e.target.options;
                const value = [];
                for (let i in options) {
                    if (options.hasOwnProperty(i) && options[i].selected) value.push(options[i].value)
                }
                onChange(value)
            }
            :
            (e)=>onChange(e.target.value);

        return <div className={fieldClass + ' ' + validationClass}>
            {
                label ? <label htmlFor={this.id}>{label}</label> : null
            }
            <select
                id={this.id}
                value={value || (multiple ? [] : '')}
                onChange={onFieldChange}
                multiple={multiple}
            >
                {
                    Object.keys(group).map(key=>
                        <option key={key} value={key}>{group[key]}</option>
                    )
                }
            </select>
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
    else if (type === 'group.checkbox') Field = CheckboxGroupField;
    else if (type === 'group.radio') Field = RadioGroupField;
    else if (type === 'group.select') Field = SelectGroupField;
    else Field = InputField;

    return <Field {...props}/>
};

export default FormField;