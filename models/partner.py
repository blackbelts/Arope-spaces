from odoo import models, fields, api
from odoo.exceptions import ValidationError




class InheritBrokers(models.Model):
    _inherit = 'persons'


    def view_dashboard(self):
        print('kkkkkkkkkkkkkkkkkk')
        # self.env['arope.broker'].current_user(self.env.context)
        # form = self.env.ref('Arope_spaces.brokers_user_wizard')
        # self.is_user = True
        action = self.env.ref('Arope_spaces.arope_action_dashboard').read()[0]
        return action











