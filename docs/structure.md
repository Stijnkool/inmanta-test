# Structure

The `/src` folder has 3 folders: `Core`, `Infrastructure`, `UserInterface`.

The application starts with `/src/index.tsx` .
Here we mount our react application and dispatch the initial action.

## Core

`Core/Language` contains a few "language extensions".
These are datatypes and logic that we assume to always have at our disposal.

`Core` also contains some domain types and interfaces for repositories in `Infrastructure`.

## Infrastructure

`Infrastructure` contains implementations of repository classes.
Basically a layer on top of the `API`.

## UserInterface

`UserInterface/components` contains all our react components.  
`UserInterface/setup` contains setup for the Redux Store and setup for the RouterRepositoryContext.  
We use this context to provide components with an injected RouterRepository.  
This allows us to easily change the implementation of the RouterRepository for tests.  
`UserInterface/slices` contains all the redux stuff: initial state, reducers, action & thunks.  
`UserInterface/styles` contains a config of colors & global css.
