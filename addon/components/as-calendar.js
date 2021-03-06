import jstz from 'jstz';
import Ember from 'ember';
import ComponentCalendar from 'ember-calendar/models/component-calendar';

export default Ember.Component.extend({
  classNameBindings: [':as-calendar'],
  tagName: 'section',

  dayEndingTime: '22:00',
  dayStartingTime: '8:00',
  defaultOccurrenceDuration: '1:00',
  defaultOccurrenceTitle: 'New event',
  defaultTimeZoneQuery: '',
  isEditing: true,
  model: null,
  occurrences: null,
  showHeader: true,
  showTimeZoneSearch: true,
  startingDate: null,
  startFromDate: null,
  timeSlotDuration: '00:30',
  timeSlotHeight: 20,
  timeZone: jstz.determine().name(),
  showTimeZone: true,
  title: null,

  _initializeModel: Ember.on('init', function() {
    this.set('model', ComponentCalendar.create({ component: this }));
  }),

  actions: {
    changeTimeZone: function(timeZone) {
      this.set('timeZone', timeZone);
    },

    addOccurrence: function(time) {
      var occurrence = this.get('model').createOccurrence({
        startsAt: time.toDate()
      });

      this.attrs['onAddOccurrence'](occurrence.get('content'));
    },

    onNavigateWeek: function(index) {
      if (this.attrs['onNavigateWeek']) {
        this.attrs['onNavigateWeek'](index);
      }
    }
  }
});
