import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import {get} from '@ember/object';

export default Route.extend(UnauthenticatedRouteMixin, {
  session: service(),

  actions: {
    login() {
      const lockOptions = {
        container: "login-container",
        oidcConformant: true,
        hashCleanup: true,
        auth: {
          audience: "http://swordfish-service",
          params: {
            scope: 'openid profile user_metadata app_metadata'
          }
        }
      };

      try {
        get(this, 'session').authenticate('authenticator:auth0-lock', lockOptions);
      } catch (error) {
        //Ignore
      }
    },
  }
})
