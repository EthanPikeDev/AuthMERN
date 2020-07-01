import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems,deleteItem } from  '../actions/itemActions';
import PropTypes from 'prop-types';

class CarList extends Component {
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };

    componentDidMount() {
        this.props.getItems();
    }
//Created on delete function that deletes an item
    onDeleteClick = (id) => {
        this.props.deleteItem(id);
        window.location.reload();

    };

    //Created edit function that edits an entry
    onEditClick = (id) => {
        this.props.editItem(id);
        
    }
   

    render() {
        
        const { items } = this.props.item;
        return(
            <Container>
            

            <ListGroup>
            <TransitionGroup className="Car-list">
            {items.map(({ _id, name }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                { this.props.isAuthenticated ? <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                    >
                    Delete</Button> : null}
                
                
                
                {name}
                </ListGroupItem>
                
                </CSSTransition>
            ))}
            </TransitionGroup>
            </ListGroup>
            
            </Container>
        );
    }

}


const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { getItems, deleteItem })(CarList);