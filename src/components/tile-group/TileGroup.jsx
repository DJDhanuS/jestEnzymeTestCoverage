import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Tile from '../tile/Tile';

class TileGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { filterRenewalDetails } = this.props;

    return (
      <Container fluid>
        <Row className="justify-content-md-center" style={{ margin: '0%', marginTop: '0%' }}>
          {this.props.data.map((obj) => (
            <Col
              md="3"
              style={{
                fontFamily: 'Arial',
                margin: '1vw',
              }}
              onClick={(e) => filterRenewalDetails(e, obj.type)}
              tabIndex="0"
            >
              <Tile
                // className="tileGroup"
                // id={uuidv4()}
                // key={`tile-${uuidv4()}`}
                name={obj.name}
                value={obj.value}
                color={obj.color}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default TileGroup;

TileGroup.propTypes = {
  data: PropTypes.node,
  filterRenewalDetails: PropTypes.func,
};

TileGroup.defaultProps = {
  data: null,
  filterRenewalDetails: PropTypes.func,
};
