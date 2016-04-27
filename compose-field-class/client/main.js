import React from 'react';
import ReactDOM from 'react-dom';
import ShackingForm from 'shaking-react-form';
import mapper from 'react-mapper';

const schemas = [
    {
        type: 'static',
        label: 'static field'
    },
    {
        type: 'static.border',
        label: 'border static field'
    }
];

const StaticField = (props) => {
    const {label, value} = props;
    return <div>
        <label>{label}</label>
        <div>{value}</div>
    </div>
};

const BorderStaticField = (props) => {
    const {label, value} = props;
    return <div style={{border: 'solid'}}>
        <label>{label}</label>
        <div>{value}</div>
    </div>
};

class TestPage extends React.Component {
    render() {
        return <div className="container">
            <h1>test page</h1>
            <ShackingForm
                schemas={schemas}
                values={{0:'hello', 1: 'world'}}
            >
            </ShackingForm>
        </div>
    }
}

ShackingForm.defaultFieldClass = mapper(({type})=> {
    if (type === 'static') return StaticField;
    else if (type === 'static.border') return BorderStaticField;
    else throw new Error('unknown type');
});

ReactDOM.render(
    <TestPage/>,
    document.getElementById('root')
);