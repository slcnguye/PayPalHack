/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var buyButton = document.getElementById("buyButton");
buyButton.onclick = function(e) {
  alert("ARGGGGG!");

  try {
  // See PayPalMobilePGPlugin.js for full documentation
  // set environment you want to use
  window.plugins.PayPalMobile.setEnvironment("PayPalEnvironmentSandbox");

  // create a PayPalPayment object, usually you would pass parameters dynamically
  var payment = new PayPalPayment("1.99", "USD", "Awesome saws");

  // define a callback when payment has been completed
  var completionCallback = function(proofOfPayment) {
    // TODO: Send this result to the server for verification;
    // see https://developer.paypal.com/webapps/developer/docs/integration/mobile/verify-mobile-payment/ for details.
    alert("Proof of payment: " + JSON.stringify(proofOfPayment));
    console.log("Proof of payment: " + JSON.stringify(proofOfPayment));
  }

  // define a callback if payment has been canceled
  var cancelCallback = function(reason) {
    alert("Payment cancelled: " + reason);
    console.log("Payment cancelled: " + reason);
  }

  // launch UI, the PayPal UI will be present on screen until user cancels it or payment completed
  window.plugins.PayPalMobile.prepareForPayment("AVGMWBDcyX9Tq0kAhaQjDbXAv3U_xhS5Sc1IO2N-Vv7aLmR4kNVnF0Urdkmf");
  window.plugins.PayPalMobile.presentPaymentUI("AVGMWBDcyX9Tq0kAhaQjDbXAv3U_xhS5Sc1IO2N-Vv7aLmR4kNVnF0Urdkmf", "rr3lin+paypal-facilitator@gmail.com", "amy@twiggy.com", payment, completionCallback, cancelCallback);

  alert("done");

  } catch (err) {
    alert(err.message);
  }
}
