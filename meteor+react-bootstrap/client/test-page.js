import React from 'react';
import {Button} from 'react-bootstrap';

import ReactBootstrapFormField from 'react-bootstrap-shaking-react-form-field';
import ShackingForm from 'shaking-react-form';

const schemas = [
    {
        label: 'username',
        type: 'text',
        validate(v){
            if (!v) return 'username is required'
        },
        options: {
            placeholder: 'inpute username'
        }
    },

    {
        label: 'password',
        type: 'password',
        validate(v){
            if (!v) return 'password is required'
        }
    },

    {
        label: 'countries',
        type: 'group.select',
        validate(v) {
            if (v.japan) return 'cannot select Japan'
        },
        options: {
            group: {
                japan: 'Japan',
                china: 'China',
                america: 'America'
            },
            multiple: true
        }
    }
];

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _schemas: schemas
        }
    }

    render() {
        return <div className="container">
            <h1>test page</h1>
            <ShackingForm
                schemas={this.state._schemas}
                onSubmit={(values)=>console.log(values)}
                values={this.state}
                onChange={(values)=>{this.setState(values)}}
            >
                <Button bsStyle="primary" type="submit">Submit</Button>
            </ShackingForm>
        </div>
    }
}

ShackingForm.defaultFieldClass = ReactBootstrapFormField;