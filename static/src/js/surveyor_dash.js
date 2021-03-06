odoo.define('surveyor_dashboard.SurveyorDashboard', function (require) {
  "use strict";

  var AbstractAction = require('web.AbstractAction');
  var ajax = require('web.ajax');
  var core = require('web.core');
  var rpc = require('web.rpc');
  var session = require('web.session');
  var web_client = require('web.web_client');
  var _t = core._t;
  var QWeb = core.qweb;

  var SurveyorDashboard = AbstractAction.extend({
    template: 'SurveyorDashboardMain',
    cssLibs: [
      '/Arope_spaces/static/src/css/lib/nv.d3.css'
    ],
    jsLibs: [
      '/Arope_spaces/static/src/js/lib/d3.min.js'
    ],
    events: {

      'click #production': 'production_list',
      'click #green_collection': 'green_collection',
      'click #orange_collection': 'orange_collection',
      'click #red_collection': 'red_collection',
      'click #green_renew': 'green_renew',
      'click #orange_renew': 'orange_renew',
      'click #red_renew': 'red_renew',
    },
    init: function (parent, context) {
      this._super(parent, context);
      this.action_id = context.id;
      this._super(parent, context);

    },
    start: function () {
      var user = session.uid
      var self = this;
      this.fetch_data().then(function(){
      console.log(self)
       self.$('.o_hr_dashboard').prepend(QWeb.render("Surveyordash", {
            widget: self
          }));
      })
      return this._super().then(function () {})
    },
    fetch_data: function () {
    var user = session.uid
    console.log("usssssssssssssssssssss",user)
      var self = this;
       var context
       if(self.controlPanelParams.context.user_id == undefined ){
            console.log("if")
            context= JSON.parse(localStorage.getItem('context'))
       }
       else{
            console.log("else")
            localStorage.setItem('context', JSON.stringify(self.controlPanelParams.context));
            context = self.controlPanelParams.context
       }
      var get_dashboard = rpc.query({
        model: "arope.broker",
        method: "surveyor_dashboard",
        args: [context.user_id]
      }).then(function (res) {
        self.user = res.user
        console.log(self.user)
        self.user_image=res.user_image
        self.insurance_app_survey=res.result.insurance_app_survey
        self.motor_survey=res.result.motor_survey
         self.non_motor_survey=res.result.non_motor_survey
        console.log("surveyor_dashboard", res)
      });
      return $.when(get_dashboard);
    },
    makeNumber: function (x) {
      return parseFloat(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    production_list: function (x) {
      var self = this;
      this.do_action({
        name: _t("Policy Tree"),
        type: 'ir.actions.act_window',
        res_model: 'policy.arope',
        view_mode: 'tree,form,calendar',
        views: [
          [false, 'list'],
          [false, 'form']
        ],
        domain: [
          ['id', 'in', this.brokerProduction.ids]
        ],
        target: 'current'
      })
    },
    green_collection: function () {
      var self = this;
      this.do_action({
        name: _t("tree.collection"),
        type: 'ir.actions.act_window',
        res_model: 'collection.arope',
        view_mode: 'tree,form,calendar',
        views: [
          [false, 'list'],
          [false, 'form']
        ],
        domain: [
          ['id', 'in', this.collections_statistics.Green.ids]
        ],
        target: 'current'
      })
    },
    orange_collection: function () {
      var self = this;
      this.do_action({
        name: _t("tree.collection"),
        type: 'ir.actions.act_window',
        res_model: 'collection.arope',
        view_mode: 'tree,form,calendar',
        views: [
          [false, 'list'],
          [false, 'form']
        ],
        domain: [
          ['id', 'in', this.collections_statistics.Orange.ids]
        ],
        target: 'current'
      })

    },
    red_collection: function () {
      var self = this;
      this.do_action({
        name: _t("tree.collection"),
        type: 'ir.actions.act_window',
        res_model: 'collection.arope',
        view_mode: 'tree,form,calendar',
        views: [
          [false, 'list'],
          [false, 'form']
        ],
        domain: [
          ['id', 'in', this.collections_statistics.Red.ids]
        ],
        target: 'current'
      })
    },
    orange_renew: function () {
      var self = this;
      this.do_action({
        name: _t("Policy Tree"),
        type: 'ir.actions.act_window',
        res_model: 'policy.arope',
        view_mode: 'tree,form,calendar',
        views: [
          [false, 'list'],
          [false, 'form']
        ],
        domain: [
          ['id', 'in', this.renew_statistics.Orange.ids]
        ],
        target: 'current'
      })

    },
    green_renew: function () {
      var self = this;
      this.do_action({
        name: _t("Policy Tree"),
        type: 'ir.actions.act_window',
        res_model: 'policy.arope',
        view_mode: 'tree,form,calendar',
        views: [
          [false, 'list'],
          [false, 'form']
        ],
        domain: [
          ['id', 'in', this.renew_statistics.Green.ids]
        ],
        target: 'current'
      })
    },
    red_renew: function () {
      var self = this;
      this.do_action({
      })
    },

  });


  core.action_registry.add('surveyor_dashboard', SurveyorDashboard);

  return SurveyorDashboard;

});