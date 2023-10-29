# Redux toolkit
1. Store
2. Slice 

# Async thunk:
**THUNK**: In programming *a thunk is a piece of code that does some delayed work*
 
 Redux was completely unaware that asynchrony could exist. `middleware perhaps`
 - Habia librerias al respecto: 
 1. Redux Thunk => default way to do things nowadays
 2. Redux Promise => forgotten I guess
 3. Redux Observable => *Rx Js*
 4. Redux Saga

 - **Redux Toolkit - async thunk** => good from *Redux thunk* + good from *createAction* => initial/legacy Redux

 - The thunk function happens outside from this object:
 ```javascript
 const transactionsSlice = createSlice({
    name: 'transactions',
    initialState, 
    reducers: {
        setLoading: (state, action:PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        addTransactionToRedux: (state, action: PayloadAction<Transaction>) => {
            state.entities.push(action.payload);
        },
        removeTransactionFromRedux: (state, action: PayloadAction<string>) => {
            const index = state.entities.findIndex(transaction => transaction.id === action.payload);
            if (index !== -1) {
                state.entities.splice(index, 1);
            }
        }        
    }
});
 ```
 Pero afortunadamente puede ser manejado en **extrareducers**:
  A partir de 3 states => 
  1. builder.addCase(case.pending)
  2. builder.addCase(case.fullfiled)
  3. builder.addCase(case.rejected)

  
# RTK Query
- It's built on top of Redux => **everything is an action**
 1. API Calls 
 2. Caching

folder structure => *src/services*