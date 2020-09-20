function copyPhoneNumber() {
  var phoneData = document.querySelector("#phone-data");
  navigator.clipboard.writeText(phoneData.dataset.phoneNumber);
}

function request(path, callback) {
  var req = new XMLHttpRequest();
  req.addEventListener("load", function() {
    callback(JSON.parse(this.responseText));
  });
  req.open("GET", path);
  req.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
  req.send();
}

function fetchPhoneData() {
  request('/phone-number', function(phoneData) {
    var flagEmoji = phoneData.countryCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0)+127397));
    var phoneTag = document.querySelector("#phone-data");
    phoneTag.dataset.phoneNumber = phoneData.phoneNumber;
    phoneTag.innerHTML = flagEmoji + ' ' + phoneData.nationalFormat;
  });
}

fetchPhoneData();
