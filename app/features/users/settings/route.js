import Route from '@ember/routing/route';
import {get} from '@ember/object';
import RSVP from "rsvp";
import {inject as service} from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  ajax: service(),

  model(params) {
    return RSVP.hash({
      user: get(this, 'store').findRecord('user', params.instance_id)
    });
  },

  setupController(controller, models) {
    this._super(...arguments);

    controller.setProperties(models);
  },

  actions: {
    save(user) {
      user.save();
    },
  },

})
