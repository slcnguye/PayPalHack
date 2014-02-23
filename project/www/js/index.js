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

function encodeParams(place, price, desc, success_url, fail_url) {
  localStorage.place = place;
  localStorage.price = price;
  localStorage.desc = desc;
  localStorage.success_url = success_url;
  localStorage.fail_url = fail_url;
  // window.name = [place,price,desc,success_url,fail_url].join(";");
}

function decodeParams() {
  /*
  var params = window.name.split(";");
  return {
    place: params[0],
    price: params[1],
    desc: params[2],
    success_url: params[3],
    fail_url: params[4]
  };
  */
  localStorage.success_url = "success.html";
  localStorage.fail_url = "index.html";
  localStorage.price = Number(localStorage.price).toFixed(2);

  return {
    place: localStorage.place,
    price: localStorage.price,
    desc: localStorage.desc,
    success_url: localStorage.success_url,
    fail_url: localStorage.fail_url
  };
}

function showConfirmationPage(place, price, desc, success_url, fail_url) {
  encodeParams(place, price, desc, success_url, fail_url);

  // See PayPalMobilePGPlugin.js for full documentation
  try {
  window.plugins.PayPalMobile.setEnvironment("PayPalEnvironmentSandbox");
  window.plugins.PayPalMobile.prepareForPayment("AVGMWBDcyX9Tq0kAhaQjDbXAv3U_xhS5Sc1IO2N-Vv7aLmR4kNVnF0Urdkmf");
  } catch (err) {
    alert(err.message);
  }

  window.location.href = "confirm.html"
}

function on_confirm_load() {
  var params = decodeParams();
  document.getElementById("place").value = params.place;
  document.getElementById("price").value = params.price;
  document.getElementById("desc").value = params.desc;
  on_keyup();
}

function on_pay() {
  var params = decodeParams();
  params.price = Number(document.getElementById("total").innerHTML);
  var price = Number(document.getElementById("price").value).toFixed(2);
  var payment = new PayPalPayment(price, "USD", document.getElementById("place").value + ": " + document.getElementById("desc").value);

  var completionCallback = function(proofOfPayment) {
    // TODO: Send this result to the server for verification;
    // see https://developer.paypal.com/webapps/developer/docs/integration/mobile/verify-mobile-payment/ for details.
    alert("Proof of payment: " + JSON.stringify(proofOfPayment));
    console.log("Proof of payment: " + JSON.stringify(proofOfPayment));
    window.location.href = params.success_url;
  }

  var cancelCallback = function(reason) {
    alert("Payment cancelled: " + reason);
    console.log("Payment cancelled: " + reason);
    window.location.href = params.fail_url;
  }

  // launch UI, the PayPal UI will be present on screen until user cancels it or payment completed
  try {
    window.plugins.PayPalMobile.presentPaymentUI("AVGMWBDcyX9Tq0kAhaQjDbXAv3U_xhS5Sc1IO2N-Vv7aLmR4kNVnF0Urdkmf", "rr3lin+paypal-facilitator@gmail.com", "amy@twiggy.com", payment, completionCallback, cancelCallback);
  } catch (err) {
    alert(err.message);
  }
}

function on_cancel() {
  var params = decodeParams();
  window.location.href = params.fail_url;
}

function on_keyup() {
        var tip = Number(Number(document.getElementById("tip").value).toFixed(2));
        // causes problems with user editting
        // document.getElementById("tip").value = tip;
        var tot = Number(localStorage.price);
        tot += tip;

        tot = tot.toFixed(2);

        document.getElementById("total").innerHTML = tot;
      }


var buyButton = document.getElementById("buyButton");
buyButton.onclick = function(e) {
  showConfirmationPage("Hey", "20", "nice description bit long but good test yolo swag", "success.html", "index.html");
}
