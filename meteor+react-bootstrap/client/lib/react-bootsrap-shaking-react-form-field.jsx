import React from 'react';
import {FormGroup, FormControl, ControlLabel, HelpBlock, Checkbox, Radio} from 'react-bootstrap';

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

        const shouldShowError = validationState === 'error' && validationError;

        return <FormGroup controlId={this.id} validationState={validationState}>
            {
                label ? <ControlLabel>{label}</ControlLabel> : null
            }
            <FormControl
                type={type}
                value={value || ''}
                placeholder={placeholder}
                onChange={e=>onChange(e.target.value)}
            />
            {
                shouldShowError ? <HelpBlock>{validationError}</HelpBlock> : null
            }
        </FormGroup>
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

        const shouldShowError = validationState === 'error' && validationError;

        return <FormGroup controlId={this.id} validationState={validationState}>
            {
                label ? <ControlLabel>{label}</ControlLabel> : null
            }
            <FormControl
                componentClass='textarea'
                value={value || ''}
                placeholder={placeholder}
                rows={rows} // todo support 'auto'
                onChange={e=>onChange(e.target.value)}
                style={{resize: 'vertical'}}
            />
            {
                shouldShowError ? <HelpBlock>{validationError}</HelpBlock> : null
            }
        </FormGroup>
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

        const shouldShowError = validationState === 'error' && validationError;

        const checkedItems = new Set(value);

        return <FormGroup validationState={validationState}>
            {
                label ? <ControlLabel>{label}</ControlLabel> : null
            }
            <div>
                {
                    Object.keys(group).map(key=>
                        <Checkbox
                            key={key}
                            inline={!vertical}
                            style={vertical ? null : {marginRight:'1rem'}}
                            checked={checkedItems.has(key)}
                            onChange={(e)=>{
                                const newValue = (value || []).filter(function(x){return x !== key});
                                if (e.target.checked) newValue.push(key);
                                onChange(newValue);
                            }}
                        >
                            {group[key]}
                        </Checkbox>
                    )
                }
            </div>
            {
                shouldShowError ? <HelpBlock>{validationError}</HelpBlock> : null
            }
        </FormGroup>
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

        const shouldShowError = validationState === 'error' && validationError;

        return <FormGroup validationState={validationState}>
            {
                label ? <ControlLabel>{label}</ControlLabel> : null
            }
            <div>
                {
                    Object.keys(group).map(key=>
                        <Radio
                            key={key}
                            inline={!vertical}
                            style={vertical ? null : {marginRight:'1rem'}}
                            checked={key === value}
                            onChange={e=>onChange(key)}
                        >
                            {group[key]}
                        </Radio>
                    )
                }
            </div>
            {
                shouldShowError ? <HelpBlock>{validationError}</HelpBlock> : null
            }
        </FormGroup>
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

        return <FormGroup controlId={this.id} validationState={validationState}>
            {
                label ? <ControlLabel htmlFor={this.id}>{label}</ControlLabel> : null
            }
            <FormControl
                componentClass='select'
                value={value || (multiple ? [] : '')}
                onChange={onFieldChange}
                multiple={multiple}
            >
                {
                    Object.keys(group).map(key=>
                        <option key={key} value={key}>{group[key]}</option>
                    )
                }
            </FormControl>
            {
                shouldShowError ? <HelpBlock>{validationError}</HelpBlock> : null
            }
        </FormGroup>
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