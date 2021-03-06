const User = require('../../models/user');
const Event = require('../../models/event');
const {dateToString} = require('../../helpers/date');
const DataLoaser = require('dataloader');

const eventLoader = new DataLoaser((eventIds) => {
  return events(eventIds);
});

const userLoader = new DataLoaser((userIds) => {
  return User.find({_id: {$in: userIds}});
});

const transformBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking.createdAt),
    updatedAt: dateToString(booking.updatedAt),
  }
};

const transformEvent = event => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator)
  }
};

const events = async eventIds => {
  try {
    const events = await Event.find({_id: {$in: eventIds}});
    return events.map(event => {
      return event;
    })
  } catch (err) {
    throw err
  }
};

const singleEvent = async eventId => {
  try {
    const event = await eventLoader.load(eventId.toString());
    return transformEvent(event)
  } catch (err) {
    throw err
  }
};

const user = async userId => {
  try {
    const user = await userLoader.load(userId.toString())
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: eventLoader.loadMany.bind(this, user._doc.createdEvents)
    }
  } catch (err) {
    throw err
  }
};

exports.transformBooking = transformBooking;
exports.transformEvent = transformEvent;

// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;

