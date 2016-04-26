import React from 'react';

import ShackingForm from './lib/form';
import RawShakingReactFormField from './lib/raw-shaking-react-form-field';

const schemas = {
    username: {
        label: 'username',
        validate(v){
            if (!v) return 'username is required'
        },
        options: {
            placeholder: 'inpute username'
        }
    },

    password: {
        label: 'password',
        type: 'password',
        validate(v){
            if (!v || v.length < 6) return 'password cannot less than 6 letters'
        }
    },

    file: {
        label: 'file',
        type: 'file',
        validate(v) {
            if (!v) return 'no file'
        }
    }
};

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        Object.keys(schemas).forEach(key=>this.state[key] = null);
    }

    render() {
        return <div className="container">
            <h1>test page</h1>
            <ShackingForm
                schemas={schemas}
                values={this.state}
                onChange={(values)=>{this.setState(values)}}
                onSubmit={(values, errors)=>console.log('submit', values, errors)}
                onValues={(values)=>console.log('values', values)}
                onErrors={(errors)=>console.log('errors', errors)}
            >
                <button type="submit">Submit</button>
            </ShackingForm>
        </div>
    }
}

ShackingForm.defaultFieldClass = RawShakingReactFormField;