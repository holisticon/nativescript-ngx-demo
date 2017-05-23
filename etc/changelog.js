// Adds simple release notes for fastlane
//  e.g. changelog.js 42 -> uses 42 as build number
var args = process.argv.slice(2),
  fs = require('fs'),
  mkdirp = require('mkdirp'),
  exec = require('child_process').exec,
  buildNo = args[0] || process.env.BUILD_NUMBER || 1;

const ANDROID_CHANGELOGS = __dirname + '/../fastlane/metadata/android/de-DE/changelogs/';
const IOS_CHANGELOGS = __dirname + '/../fastlane/metadata/de-DE';

console.log('buildNo: ' + buildNo);
exec('git describe --tags --abbrev=0', function (err, tag) {
  // use complete changelog as base
  var gitLog = 'git log --oneline';
  if (!err) {
    // if no error during find tag, we use the last tag
    gitLog = 'git log ' + tag.replace(/\n$/, '') + '..HEAD --oneline';
  }
  exec(gitLog, function (err, releaseNotes) {
    if (err instanceof Error) {
      throw err;
    }
    // cut to long text
    var changes = releaseNotes.replace(/"/, '').replace(/[a-z0-9A-Z]+/, '-').substring(0, 494) + ' ...';

    // PlayStore (Android)
    mkdirp(ANDROID_CHANGELOGS, function (err) {
      if (err) {
        throw err;
      } else {
        fs.writeFile(ANDROID_CHANGELOGS + buildNo + '.txt', changes, function (err) {
          if (err) {
            throw err;
          }
        });
      }
    });
    // iTunes Connect (iOS)
    mkdirp(IOS_CHANGELOGS, function (err) {
      if (err) {
        throw err;
      } else {
        fs.writeFile(IOS_CHANGELOGS + '/release_notes.txt', changes, function (err) {
          if (err) {
            throw err;
          }
        });
      }
    });
  });
});
