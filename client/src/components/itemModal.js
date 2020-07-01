import React, { Component } from 'react';
import { 
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

import { connect } from 'react-redux';
import { addItem} from '../actions/itemActions';
import PropTypes from 'prop-types';


class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }
    
    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange =(e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const newItem = {
            name: this.state.name

        }

        //Add item via addItem action
        this.props.addItem(newItem);

        //close modal

        this.toggle();
    }

    render() {
        return(
            <div>
            { this.props.isAuthenticated ?   <Button
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}
                >Add Item
                </Button> : <h4 className="mb-3 ml-4">Please Log In to manage items</h4>}


           

            <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            >
            <ModalHeader toggle={this.toggle}>Add a new Item to list:</ModalHeader>
            <ModalBody>
            <Form onSubmit={this.onSubmit}>
            <FormGroup>
            <Label for ="item">Item Name:</Label>
            
            <Input
            type="text"
            name="name"
            id="item"
            placeholder="Name your item here..."
            onChange={this.onChange}>
            </Input>
            
            <Button
            color="dark"
            style={{marginTop: '2rem'}}
            block
            >Add Item</Button>
            </FormGroup>
            </Form>
            </ModalBody>

            </Modal>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal);