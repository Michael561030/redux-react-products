import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {connect} from 'react-redux';
import {requestProduct} from './reducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from './components/Input';
import ProductsList from './components/ProductsList';
import Categories from "./components/Categories";
import {style} from './common/style/style.css'
import * as productReducer from './reducer'
//Creating our component
class App extends Component {

    UNSAFE_componentWillMount(){
        this.props.history.push({
            search: ''
        });
    }
    componentDidMount(){
        this.props.loadProducts();
    }
    render() {

        // save location category from address bar
        let currentSearch = this.props.location.search;
        let currentLocation = this.props.location.pathname.replace('/', '');

        const {products} = this.props;
        return (
            //Displaying our layout
            (<Container>
                <Row>
                    <Col xs={5} sm={5} md={4} lg={3}>
                        <div align="center">Filter by category</div>
                        <Col className={'paddingNull'}>
                            <ul className={'paddingNull'}><Categories
                                currentSearch = {currentSearch}
                                products = {products}
                                currentLocation = {currentLocation}
                                handleChange = {this.handleChange.bind(this)}
                                reset = {this.reset.bind(this)}
                            /></ul>
                        </Col>
                    </Col>
                    <Col xs={7} sm={7} md={8} lg={9}>

                        <Input
                            currentLocation={currentLocation}
                            onChangeHandler={(event) => {
                                this.onChangeHandler(event);
                                this.props.inputProducts(event)}}
                            resetField={this.resetField.bind(this)}
                            input={this.props.input}
                        />
                        {
                            products &&
                            <ProductsList
                                products={products}
                                category={currentLocation}
                                input={this.props.input}
                            />
                        }
                    </Col>
                </Row>
            </Container>)
        );
    }

    //function which set new state of input field
    onChangeHandler(e) {
        this.setState({
            input: e.target.value,

        });
        this.props.history.push({
            search: `?searchInput=${e.target.value}`
        });
    }

    //function which set new state of category
    handleChange() {
        this.setState({
            category: this.props.location.pathname,
            input: '' ,
        });
    }
    // e.target.value.replace(/\s/g, "")
    //function which reset filter & display all items
    reset() {
        this.setState({
            category: ''
        });
    }

    resetField() {
        this.setState({
            input: ''
        })
    }
}

const mapStateToProps = state => ({
    loading: state.loading,
    products: state.products,
    input: state.inputValue
});

//Connect Redux
const mapDispatchToProps = dispatch => ({
    loadProducts: () => dispatch(
        requestProduct()
        ),
    inputProducts: (event) => dispatch(productReducer.onInputSearch(event.target.value))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

