/**
 * Routes are defined here. They are loaded asynchronously.
 * Paths are relative to the "components" directory.
 */
export default ROUTES = [
  { name: 'Home',
    pattern: '/',
    load: requireAsync('Home'),
  },
  { name: 'Browse',
    pattern: '/browse',
    load: requireAsync('Browse'),
  },
  { name: 'About',
    pattern: '/about',
    load: requireAsync('About'),
  }
]

/**
 * Asynchronously load a file
 * @param main {String} - Main component
 * @returns {Function}
 */
function requireAsync(main) {
    return function(location, next) {
        next(null, require('./pages/' + main + '.jsx'))
    }
}