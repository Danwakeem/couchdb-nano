// Licensed under the Apache License, Version 2.0 (the 'License'); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

'use strict';


module.exports = function promiseWrapper(fn, args) {
  if (typeof args[args.length - 1] === 'function') {
    return fn.apply(null, args);
  } else {
    return new Promise(function (resolve, reject) {
      var newArgs = [];
      for (var i = 0; i < args.length; i++) {
        newArgs.push(args[i]);
      }
      newArgs.push(function (err, data) {
        if (err) reject(err);
        else resolve(data);
      })
      fn.apply(null, newArgs);
    });
  }
};
