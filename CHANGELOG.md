# Changelog

## 3.2.0

- Removed `_cid` after successful creation

## 3.1

- Added `replace` option to `fetchSucess` action.

## 3.0.3

- Fixed the List reducer adding a null client generated key when not needed.

## 3.0.2

- Fix broken `Map.fetch.success reducer`

## 3.0

- Added Map Store
- Switch from lodash to ramda https://github.com/Versent/redux-crud/issues/39

## 2.0

- Remove Seamless-Immutable and Immutable.js stores. These stores are not really necessary, as operations can be done with plain lodash without mutating the original collections. These libs were also adding a huge amount of weight to the library.

You can wrap the collections with Seamless or Immutable.js after getting them from the store.

- Remove dependency on the whole Lodash lib. This library now uses individual lodash functions as needed e.g. `lodash.assign`.

## **1.0**

Added Immutable.js store

**0.10.1** upgrade `action-names` dep, remove left over ES6

**0.10.0** `.reducersFor` does not mutate the config object

**0.9.0** Added mutable store (config.store: reduxCrud.STORE_MUTABLE)

**0.8.0** Add `data` attribute to actions payload.

**0.7.0** Replaced `unsaved` in createStart and updateStart with `pendingCreate` and `pendingUpdate`.
