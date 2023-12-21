
var ua = navigator.userAgent.toLowerCase(); 
if (ua.indexOf('safari') != -1) { 
  if (ua.indexOf('chrome') > -1) {
    // Chrome
  } else {
    // Safari
    var version = navigator.appVersion;
    var safariVersionMatch = version.match(/version\/([\d\.]+)/i);
    if(safariVersionMatch && safariVersionMatch[1] && parseInt(safariVersionMatch[1]) < 11) {
     window.location.replace('/outdated.html');
    }
  }
}