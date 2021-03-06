var _ = require('lodash');
var React = require('react');
var Marty = require('marty');
var NewRoom = require('./newRoom');
var RoomsStore = require('../stores/roomsStore');
var NavigationActionCreators = require('../actions/navigationActionCreators');

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.navigateToRoom = _.bind(this.navigateToRoom, this);
  }
  render() {
    return (
      <div className="home">
        <NewRoom />
        <ul className="rooms">
          {_.map(this.props.rooms, (room) => {
            return (
              <li key={room.id} className='room'>
                <a href="javascript:void(0)"
                   onClick={_.partial(this.navigateToRoom, room.id)}>
                   {room.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  navigateToRoom(roomId) {
    this.app.navigationActionCreators.navigateToRoom(roomId);
  }
}

module.exports = Marty.createContainer(Home, {
  listenTo: 'roomsStore',
  fetch: {
    rooms() {
      return this.app.roomsStore.getAll();
    }
  },
  pending() {
    return <div className='pending'>Loading rooms...</div>;
  },
  failed(errors) {
    return <div className='error'>Failed to load rooms. {errors}</div>;
  }
});