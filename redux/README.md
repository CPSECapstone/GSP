# How to use Redux

## File Structure

- [store.ts](store.ts): The store is the heart of Redux data. All reducers must be exported to the store. [More Info.](<(store.ts)>)
- [initialize.ts](initialize.ts): Where all data initialization goes. Should primarily consist of calling functions from the thunks folder
- [hooks.ts](hooks.ts): Hooks to be used in place of useDispatch and useSelector for TypeScript compatability. [More Info.](https://redux.js.org/tutorials/typescript-quick-start#define-typed-hooks)
- [/selectors](./selectors/) Where functions called by useAppSelector sould go. [More Info.](https://react-redux.js.org/tutorials/quick-start#use-redux-state-and-actions-in-react-components)
- [/slices](./slices/): Each data structure is given one slice. [More Info.](https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-state-slice)
- [/thunks](./thunks/): Where all async dispatch calls should go. [More Info.](https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-state-slice)

## Adding a new Data Type

1. Create new slice in redux/slices including name, initial state, and reducers
2. Create a new DataType to match the query you will be performing in [../src/APITypes.ts](../src/APITypes.ts). [More Info.](https://dev.to/applification/how-to-use-amplify-appsync-graphql-types-in-a-react-typescript-app-of)
3. Export all reducers and the actions (make sure all names are unique)
4. Add the reducer to redux/store.ts
5. Create a thunk for initializing data and add it to the function in intialize.ts

Inspired by https://react-redux.js.org/tutorials/quick-start

## Adding a new Reducer

A reducer is a function used to modify data

1. Find the data's slice in redux/slices
2. In the reducers object, add a new function. To modify the data's value, you can modify the state passed into the function (you don't need to return anything)
3. Export the function near the bottom in the line that exports \_\_slice.actions
