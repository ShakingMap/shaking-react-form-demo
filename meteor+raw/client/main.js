import React from 'react';
import ReactDOM from 'react-dom';
import ShackingForm from 'shaking-react-form';
import RawShakingReactFormField from 'raw-shaking-react-form-field';

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
    },

    description: {
        type: 'textarea',
        label: 'description',
        validate(v) {
            if (v && v.length > 10) return 'cannot exceed 10 letters'
        },
        options: {
            placeholder: 'say something',
            rows: 10
        }
    },

    friends: {
        type: 'group.checkbox',
        label: 'friends',
        validate(v) {
            if (!v || v.length === 0) return 'you must have a friend'
        },
        options: {
            group: {
                bob: 'Bob',
                alan: 'Alan',
                jack: 'Jack'
            }
        }
    },

    countries: {
        type: 'group.checkbox',
        label: 'countries',
        validate(v) {
            if (v && v.length > 2) return 'you can not select more than 2 countries'
        },
        options: {
            group: ['Japan', 'China', 'American', 'Italy'],
            vertical: true
        }
    },

    lover: {
        type: 'group.radio',
        label: 'lover',
        validate(v) {
            if (v == 0) return 'are you sure?'
        },
        options: {
            group: ['Dad', 'Bob', 'Alice']
        }
    },

    pet: {
        type: 'group.radio',
        label: 'pet',
        validate(v) {
            if (v === 'bob') return 'are you sure?'
        },
        options: {
            group: {bob: 'Bob', cat: 'Cat', dog: 'Dog'},
            vertical: true
        }
    },

    teacher: {
        type: 'group.select',
        label: 'teacher',
        validate(v) {
            if (v == '1') return 'are you sure?'
        },
        options: {
            group: ['Super Man', 'Iron Man', 'Chinese Man']
        }
    },

    movies: {
        type: 'group.select',
        label: 'movies',
        validate(v) {
            if (v && v.length > 2) return 'no more!'
        },
        options: {
            group: {
                'baidu': 'Baidu',
                'tencent': 'Tencent',
                'alibaba': 'Alibaba',
                'zhaoyao': 'ZhaoYao'
            },
            multiple: true
        }
    }
};

class TestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        Object.keys(schemas).forEach(key=>this.state[key] = null);
    }

    render() {
        return <div className="container">
            <h1>test page</h1>
            <h2>form</h2>
            <ShackingForm
                schemas={schemas}
                values={this.state}
                onChange={(values)=>{this.setState(values)}}
                onSubmit={(values)=>console.log('submit', values)}
                onErrors={(errors)=>console.log('errors', errors)}
            >
                <button type="submit">Submit</button>
            </ShackingForm>

            <h2>readonly form</h2>
            <ShackingForm
                schemas={schemas}
                values={this.state}
                onChange={(values)=>{this.setState(values)}}
                onSubmit={(values)=>console.log('submit', values)}
                onErrors={(errors)=>console.log('errors', errors)}
                readOnly
            >
                <button type="submit">Submit</button>
            </ShackingForm>

            <h2>disabled form</h2>
            <ShackingForm
                schemas={schemas}
                values={this.state}
                onChange={(values)=>{this.setState(values)}}
                onSubmit={(values)=>console.log('submit', values)}
                onErrors={(errors)=>console.log('errors', errors)}
                disabled
            >
                <button type="submit">Submit</button>
            </ShackingForm>
        </div>
    }
}

ShackingForm.defaultFieldClass = RawShakingReactFormField;

ReactDOM.render(
    <TestPage/>,
    document.getElementById('root')
);