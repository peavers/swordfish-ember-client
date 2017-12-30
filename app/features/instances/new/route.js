import Ember from 'ember';
import Route from '@ember/routing/route';
import {get} from '@ember/object';
import RSVP from "rsvp";
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {

  ajax: Ember.inject.service(),

  model() {
    return RSVP.hash({
      instance: get(this, 'store').createRecord('instance', {
        swordfishCommand: "create"
      }),
    });
  },

  setupController(controller, models) {
    this._super(...arguments);

    controller.setProperties(models);
  },

  actions: {
    willTransition() {
      this._super(...arguments);

      this.controller.get('instance').rollbackAttributes();
    },

    save() {
      const instance = this.controller.get('instance');

      return get(this, 'ajax').post('/instances', {
        data: JSON.stringify(instance),
        context: this,
        success: function () {
          this.controller.get('instance').rollbackAttributes();
          this.transitionTo('instances');
        },
      });
    }
  },

});
