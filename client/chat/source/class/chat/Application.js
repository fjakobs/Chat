/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(chat/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "chat"
 */
qx.Class.define("chat.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __chat: null,
    
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */
      
      // Create the UI
      var container = new qx.ui.container.Composite();
      this.getRoot().add(container, {edge: 0});
      
      container.setLayout(new qx.ui.layout.VBox());
      
      this.__chat = new qx.ui.embed.Html();
      this.__chat.set({
        backgroundColor: "white",
        decorator: "main"
      });
      container.add(this.__chat, {flex: 1});
      
      var input = new qx.ui.form.TextField();
      container.add(input);
      input.addListener("changeValue", function() {
        var msg = input.getValue();
        if (msg == "") {
          return;
        }
        input.setValue("");

        var req = new qx.bom.Request();
        req.timeout = 1000 * 60 * 60;
        req.open("GET", "http://127.0.0.1:8000?post=" + msg);
        req.send();
      }, this);
     
      this.createRequest();            
    },
    
    
    createRequest: function() {
      var self = this;
      var req = new qx.bom.Request();
      req.timeout = 1000 * 60 * 60;
      req.onload = function() {
        self.__chat.setHtml((self.__chat.getHtml() || "") + req.responseText + "<br>");
        self.createRequest();
      };
      req.open("GET", "http://127.0.0.1:8000?connect=true");
      req.send();
    }
  }
});
