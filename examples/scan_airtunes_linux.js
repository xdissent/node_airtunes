var util = require('util'),
    os = require('os'),
    exec = require('child_process').exec;

if(os.platform() !== 'linux') {
  console.error('Sorry, this utility only works with linux.');
  process.exit(1);
}

exec('avahi-browse -tar', {
  timeout: 5000
}, function(error, stdout) {
  if (error !== null) {
    console.log('Sorry, this utility requires the avahi-utils package: ' + error);
    process.exit(1);
  }

  var re = /=\s+\w+\s+IPv4\s+\S+@(\S+)\s+AirTunes Remote Audio\s+\S+\n\s+hostname = \[([^\]]+)\]\n.*\n\s+port = \[([^\]]+)\]/g;
  var res;
  while ((res = re.exec(stdout)) !== null) {
    console.log(res[1] + ' ' + res[2] + ':' + res[3]);
  }
});