# jest-snapshot-serializer-class-name-to-string
Jest snapshot serializer that call `.toString` on className react props.


## Background
React by default call `.toString` method on not string values given to className props, default jest serializer - don't.

You can use this package to add this functionality to jest.

## Installation

* Add the package to your project using npm or yarn
```sh
$ npm install --save-dev jest-snapshot-serializer-class-name-to-string
# OR
$ yarn add --dev jest-snapshot-serializer-class-name-to-string
```

* Edit the `snapshotSerializers` section of your jest configuration:
```json
// package.json
{
  ...
  "jest": {
    "snapshotSerializers": ["jest-snapshot-serializer-class-name-to-string"]
  }
}
```

* Run `jest -u` to update your snapshots

## Contributing

Pull requests and issues welcome.
